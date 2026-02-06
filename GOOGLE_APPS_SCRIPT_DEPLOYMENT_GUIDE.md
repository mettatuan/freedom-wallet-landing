# 🚀 HƯỚNG DẪN DEPLOY GOOGLE APPS SCRIPT - CỰC KỲ QUAN TRỌNG!

## ⚠️ CẢNH BÁO: Đây là lý do Google Sheets không nhận được data!

**Current Error**: `SyntaxError: Identifier 'CONFIG' has already been declared`

**Root Cause**: Bạn paste code mới vào Apps Script mà chưa xóa code cũ → bị duplicate!

---

## 🔥 BƯỚC 1: XÓA CODE CŨ (QUAN TRỌNG NHẤT!)

1. Vào Google Sheet: https://docs.google.com/spreadsheets/d/1Xj2sH_LuJtFS0zQX-C2VkNtF52f5sOBGa6-0bSUIvGw/edit
2. Click **Extensions** → **Apps Script**
3. ⚠️ **XÓA TOÀN BỘ** code hiện có (Ctrl+A → Delete)
4. Nhìn thấy file trống hoàn toàn → OK!

---

## 📋 BƯỚC 2: PASTE CODE MỚI

1. Mở file [google_apps_script.gs](google_apps_script.gs) trong VS Code
2. Copy **TOÀN BỘ** code (Ctrl+A → Ctrl+C)
3. Paste vào Apps Script Editor (Ctrl+V)
4. Click **Save** (Ctrl+S)
5. Đổi tên project: `FreedomWallet_Backend`

---

## 🚀 BƯỚC 3: DEPLOY (ĐÚNG CÁCH!)

1. Click nút **Deploy** (góc trên phải) → **New deployment**
2. Click icon ⚙️ → chọn **Web app**
3. Điền thông tin:
   - **Description**: `FreedomWallet v1`
   - **Execute as**: ✅ **Me** (email của bạn)
   - **Who has access**: ⚠️ **PHẢI CHỌN "Anyone"** ⚠️
     - ❌ KHÔNG chọn "Only myself" (sẽ bị CORS error!)
     - ✅ PHẢI chọn "Anyone"
4. Click **Deploy**

---

## 🔐 BƯỚC 4: AUTHORIZE (QUAN TRỌNG!)

1. Click **Authorize access**
2. Chọn tài khoản Google
3. Click **Advanced**
4. Click **Go to FreedomWallet_Backend (unsafe)**
5. Click **Allow**

---

## 📝 BƯỚC 5: COPY URL MỚI

1. Sau deploy thành công, thấy **Web app URL**
2. Copy URL (dạng: `https://script.google.com/macros/s/AKfycb.../exec`)
3. Mở [index.html](index.html) trong VS Code
4. Tìm dòng 1444 (search: `GOOGLE_SHEETS_URL`)
5. Replace URL cũ bằng URL mới:

```javascript
const GOOGLE_SHEETS_URL = 'PASTE_URL_MỚI_VÀO_ĐÂY';
```

6. **Save file** (Ctrl+S)

---

## 🧪 BƯỚC 6: TEST (KIỂM TRA THÀNH CÔNG!)

### Test 1: Kiểm tra API

Mở trình duyệt, paste URL + `?test=1`:
```
https://script.google.com/macros/s/YOUR_NEW_URL/exec?test=1
```

**Expected Success Response**:
```json
{
  "success": true,
  "message": "Freedom Wallet API is working!",
  "data": {
    "timestamp": "2026-02-06T...",
    "version": "1.0.0",
    "sheetName": "FreedomWallet_Registrations"
  }
}
```

❌ **If you see HTML error page** → Code có lỗi, quay lại Bước 1!

### Test 2: Kiểm tra từ Landing Page

1. Refresh [index.html](index.html) trong browser (`F5`)
2. Mở **Console** (`F12`)
3. Đăng ký với email test
4. Xem console logs:

```
========================================
📝 SENDING TO GOOGLE SHEETS
========================================
Data: {
  "timestamp": "...",
  "fullName": "Test",
  ...
}
URL: https://script.google.com/...
✅ Response status: 200
✅ Response OK: true
📄 Response preview: {"success":true,...
✅ Server response: {success: true, ...}
========================================
```

5. ✅ Kiểm tra Google Sheet → thấy dòng mới!

---

## ❌ TROUBLESHOOTING - CÁC LỖI THƯỜNG GẶP

### Lỗi 1: SyntaxError (CODE DUPLICATE)
```
SyntaxError: Identifier 'CONFIG' has already been declared
```

**FIX**: 
1. Vào Apps Script Editor
2. **XÓA TOÀN BỘ code** (Ctrl+A → Delete)
3. Paste code từ [google_apps_script.gs](google_apps_script.gs)
4. Save → Deploy lại

### Lỗi 2: CORS Policy Error
```
Access to fetch has been blocked by CORS policy
```

**FIX**: Deploy với **"Who has access" = "Anyone"**, không phải "Only myself"!

### Lỗi 3: HTML Error Page thay vì JSON

Console hiển thị:
```
❌ Google Apps Script returned HTML error page!
⚠️ This usually means:
1. Script has syntax errors
2. Script not deployed with "Anyone" access
3. Duplicate code in Apps Script editor

🔧 FIX: Open Apps Script, DELETE ALL code, paste fresh code, then Deploy
```

**FIX**: Làm theo hướng dẫn từ Bước 1!

### Lỗi 4: Authorization Required
```
Authorization is required to perform that action
```

**FIX**: 
1. Vào Apps Script Editor
2. Click **Run** → chọn function `doGet`
3. Authorize lại
4. Deploy mới

---

## 📞 NẾU VẪN LỖI:

1. Open browser Console (`F12`)
2. Đăng ký test
3. Screenshot toàn bộ console logs
4. Gửi cho tôi kèm:
   - Deployment URL
   - Apps Script deployment settings screenshot
   - Console errors

---

## ✅ CHECKLIST HOÀN TẤT

- [ ] ✅ Xóa toàn bộ code cũ trong Apps Script
- [ ] ✅ Paste code mới từ google_apps_script.gs
- [ ] ✅ Save project
- [ ] ✅ Deploy với "Execute as: Me" và "Anyone" access
- [ ] ✅ Authorize permissions
- [ ] ✅ Copy URL mới vào index.html dòng 1444
- [ ] ✅ Save index.html
- [ ] ✅ Test endpoint với ?test=1 → thấy JSON success
- [ ] ✅ Test registration → thấy console logs OK
- [ ] ✅ Check Google Sheet → thấy dòng mới xuất hiện!

---

## 🎉 HOÀN TẤT
