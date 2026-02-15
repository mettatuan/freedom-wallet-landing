# 🗺️ Kanban Roadmap - Hướng Dẫn Triển Khai

**Last Updated:** 2026-02-16

## 📋 Tổng Quan

Hệ thống Kanban Roadmap cho phép:
- ✅ Hiển thị roadmap theo dạng Kanban board (BACKLOG → TO DO → IN PROGRESS → IN REVIEW → DONE)
- ✅ User đăng nhập email để đề xuất tính năng mới (tự động vào **BACKLOG**)
- ✅ Admin review hoặc 10+ votes → chuyển từ BACKLOG sang TODO
- ✅ Community vote cho tính năng mong muốn
- ✅ Auto-sync với Google Sheets backend
- ✅ Tích hợp REAL features từ changelog.md (FreedomWallet + FreedomWalletBot)

## 🎯 Cấu Trúc Kanban Board

```
┌───────────┬──────────┬─────────────┬────────────┬──────────┐
│  BACKLOG  │  TO DO   │ IN PROGRESS │ IN REVIEW  │   DONE   │
│   💡      │   📋     │     🔨      │    🔍      │    ✅    │
├───────────┼──────────┼─────────────┼────────────┼──────────┤
│ Card 1    │ Card 5   │ Card 9      │ Card 11    │ Card 13  │
│ Card 2    │ Card 6   │ Card 10     │ Card 12    │ Card 14  │
│ Card 3    │ Card 7   │             │            │ Card 15  │
│ Card 4    │ Card 8   │             │            │ Card 16  │
└───────────┴──────────┴─────────────┴────────────┴──────────┘
```

### Workflow

```
User Đề Xuất → BACKLOG (💡) → (Admin review OR 10+ votes) → TODO (📋) → IN PROGRESS (🔨) → IN REVIEW (🔍) → DONE (✅)
```

- **BACKLOG:** Community suggestions chờ admin xem xét
- **TODO:** Features được approve, sẵn sàng develop
- **IN PROGRESS:** Đang code
- **IN REVIEW:** Đang testing/QA
- **DONE:** Đã release (tham khảo từ changelog.md)

### Card Structure
```
┌──────────────────────────────────────┐
│ 🔗 Kết nối ngân hàng      [✨ FEATURE]│
├──────────────────────────────────────┤
│ Tự động sync giao dịch từ ngân hàng  │
├──────────────────────────────────────┤
│ [👍 Vote (15)]          #FW004       │
└──────────────────────────────────────┘
```

## 🚀 Setup Backend (Google Apps Script)

### Bước 1: Open Google Apps Script

1. Mở Google Sheet đang dùng cho registrations
2. Go to: **Extensions → Apps Script**
3. Tìm file `google_apps_script.gs` hiện tại

### Bước 2: Add Kanban Functions

Copy toàn bộ code từ file `google_apps_script_kanban_addon.gs` và thêm vào **cuối file** `google_apps_script.gs`.

### Bước 3: Update doGet() Function

Tìm function `doGet(e)` và thêm code sau **NGAY SAU** dòng `const params = e.parameter || {};`:

```javascript
// Handle Kanban requests
if (params.action === 'getFeatures') {
  return handleKanbanGetRequests(params);
}
```

**VÍ DỤ:**
```javascript
function doGet(e) {
  try {
    const params = e.parameter || {};
    
    // ✅ THÊM PHẦN NÀY
    if (params.action === 'getFeatures') {
      return handleKanbanGetRequests(params);
    }
    // ✅ KẾT THÚC
    
    // Test endpoint
    if (params.test) {
      return createJsonResponse(true, 'Freedom Wallet API is working!', {
        // ...existing code
      });
    }
    // ...rest of code
  }
}
```

### Bước 4: Update doPost() Function

Tìm function `doPost(e)` và thêm code sau **NGAY SAU** dòng `const data = parseRequestData(e);`:

```javascript
// Handle Kanban requests
if (data.action === 'addFeature' || data.action === 'voteFeature') {
  return handleKanbanPostRequests(data);
}
```

**VÍ DỤ:**
```javascript
function doPost(e) {
  try {
    const data = parseRequestData(e);
    
    // ✅ THÊM PHẦN NÀY
    if (data.action === 'addFeature' || data.action === 'voteFeature') {
      return handleKanbanPostRequests(data);
    }
    // ✅ KẾT THÚC
    
    logInfo('doPost', `Received registration: ${JSON.stringify(data)}`);
    
    // ...rest of code
  }
}
```

### Bước 5: Create Sheets

1. Click **Run** → Select function **`testCreateSheets`**
2. Authorize the script (first time only)
3. Check logs: Should see "✅ Sheets created successfully!"
4. Verify 2 new sheets created:
   - `Roadmap_Features` (with 10 sample features)
   - `Feature_Votes` (empty, for tracking votes)

### Bước 6: Deploy Script

1. Click **Deploy** → **Manage deployments**
2. Click ⚙️ icon next to "Active deployment"
3. Select **"New version"**
4. Add description: "Added Kanban Roadmap features"
5. Click **Deploy**
6. ✅ Done! URL vẫn giữ nguyên

## 🧪 Testing

### Test 1: Get Features
```javascript
// Run function testGetFeatures()
// Should return JSON with 10 sample features
```

### Test 2: Add Feature
```javascript
// Run function testAddFeature()
// Should add a new feature to sheet
```

### Test 3: Vote Feature
```javascript
// Run function testVoteFeature()
// Should increment vote count for feature FW004
```

### Test 4: Via Browser
```
# Get features
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getFeatures

# Should return JSON with all features
```

## 📊 Google Sheets Structure

### Sheet: Roadmap_Features
| Cột | Tên | Mô tả | Ví dụ |
|-----|-----|-------|-------|
| A | ID | Unique ID | FW001, FW002,... |
| B | Timestamp | Thời gian tạo | 2026-02-16T10:30:00Z |
| C | Email | Email người đề xuất | user@example.com |
| D | Title | Tên tính năng | Kết nối ngân hàng |
| E | Description | Mô tả chi tiết | Tự động sync... |
| F | Type | Loại | FEATURE/IMPROVEMENT/BUGFIX |
| G | Status | Trạng thái | TODO/IN PROGRESS/IN REVIEW/DONE |
| H | Votes | Số vote | 0, 15, 23,... |

### Sheet: Feature_Votes
| Cột | Tên | Mô tả | Ví dụ |
|-----|-----|-------|-------|
| A | Timestamp | Thời gian vote | 2026-02-16T11:00:00Z |
| B | Feature ID | ID tính năng | FW004 |
| C | Email | Email người vote | voter@example.com |

## 🎨 Frontend Features

### 1. Kanban Board Display
- Auto-load features từ Google Sheets
- Hiển thị theo 4 columns: TODO, IN PROGRESS, IN REVIEW, DONE
- Card shows: Title, Description, Type label, Vote count, ID
- Real-time vote count update

### 2. Feature Request Modal
- User nhập email, title, description, type
- Submit → Gửi lên Google Sheets
- Auto-refresh Kanban board sau 2s

### 3. Voting System
- Click "Vote" button → Prompt email
- Check duplicate vote (1 email = 1 vote per feature)
- Store vote in Google Sheets
- Update vote count locally + on server
- Gray out voted features

### 4. Local Storage
- Lưu user votes trong localStorage
- Prevent multi-vote từ cùng 1 browser
- Persist qua page reloads

## 🔧 Customization

### Update Card Colors
Edit CSS in `index.html`:
```css
.label-feature {
  background: #e3f2fd;
  color: #1976d2;
}
```

### Add More Statuses
1. Update `KANBAN_CONFIG.STATUSES` in Apps Script
2. Add new column in HTML Kanban board
3. Update `renderKanbanBoard()` function

### Change Sample Features
Edit `addSampleFeatures()` function in Apps Script:
```javascript
const samples = [
  ['FW001', new Date().toISOString(), 'admin@...', 'Your Feature', 'Description', 'FEATURE', 'TODO', 0],
  // Add more...
];
```

## 🐛 Troubleshooting

### Problem: "Không thể tải dữ liệu"
**Giải pháp:**
1. Check Apps Script deployed correctly
2. Verify `GOOGLE_SHEETS_URL` in `index.html` matches deployed URL
3. Check browser console for errors (`F12`)
4. Test endpoint: `YOUR_URL?action=getFeatures` in browser

### Problem: Vote không hoạt động
**Giải pháp:**
1. Check `Feature_Votes` sheet exists
2. Clear localStorage: `localStorage.clear()`
3. Check Apps Script logs for errors

### Problem: Card không hiển thị
**Giải pháp:**
1. Check `Roadmap_Features` sheet có data
2. Verify column structure matches config
3. Run `testGetFeatures()` in Apps Script
4. Check network tab in browser dev tools

## 📱 Mobile Responsive

Kanban board tự động adapt:
- Desktop: 4 columns side-by-side
- Tablet: 2 columns
- Mobile: 1 column (scroll vertical)

CSS Grid với `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`

## 🔐 Security

### Email Validation
- Vote requires email
- Feature request requires email
- Email stored for tracking only

### XSS Prevention
- All user input escaped via `escapeHtml()` function
- Prevents code injection in titles/descriptions

### Rate Limiting
- Consider adding in Apps Script:
```javascript
// Check if same email submitted > 5 features today
if (countRecentSubmissions(email) > 5) {
  return createJsonResponse(false, 'Too many submissions today');
}
```

## 📈 Analytics

Track trong Google Sheets:
- Tính năng được vote nhiều nhất
- User đóng góp nhiều tính năng nhất
- Xu hướng vote theo thời gian

**Query Example:**
```
=QUERY(Roadmap_Features!A:H, "SELECT D, H ORDER BY H DESC LIMIT 5", 1)
```

## 🎯 Next Steps

1. ✅ Setup backend (Apps Script)
2. ✅ Test all functions
3. ✅ Deploy to production
4. 📢 Announce to community
5. 📊 Monitor feedback
6. 🔄 Update roadmap regularly

## 💡 Tips

- **Tính năng nào priority?** → Sort by votes DESC
- **Cập nhật status** → Edit trực tiếp trong Google Sheet → Auto-sync
- **Thêm comment?** → Tạo sheet `Feature_Comments` (tương tự votes)
- **Email notifications?** → Add trigger in Apps Script

## 🤝 Contributing

Community-driven! Mọi người đều có thể:
- Đề xuất tính năng
- Vote cho tính năng
- Comment feedback (coming soon)
- Track progress real-time

---

**Author:** Freedom Wallet Team  
**Version:** 1.0.0  
**Date:** February 16, 2026  
**Contact:** t.me/freedomwalletapp
