# 🚀 Hướng Dẫn Deploy Google Apps Script - Freedom Wallet

## 📋 Bước 1: Mở Google Sheets

1. Truy cập: https://docs.google.com/spreadsheets/d/1Xj2sH_LuJtFS0zQX-C2VkNtF52f5sOBGa6-0bSUIvGw/edit
2. Hoặc tạo Google Sheet mới tại: https://sheets.google.com

---

## ⚙️ Bước 2: Tạo Apps Script Project

1. Trong Google Sheets, vào menu: **Extensions** → **Apps Script**
2. Một tab mới sẽ mở với file `Code.gs` mặc định
3. **Xóa hết** code mặc định trong `Code.gs`

---

## 📝 Bước 3: Copy Code

1. Mở file: `google_apps_script.gs` (trong thư mục này)
2. **Copy toàn bộ** nội dung file
3. **Paste** vào `Code.gs` trong Apps Script Editor
4. Đổi tên project (góc trên bên trái): **Freedom Wallet Backend**
5. Click **💾 Save** (Ctrl + S)

---

## 🔐 Bước 4: Deploy Web App

1. Click nút **Deploy** (góc trên bên phải) → **New deployment**

2. Trong màn hình Deploy:
   - Click biểu tượng ⚙️ (Settings) bên cạnh "Select type"
   - Chọn: **Web app**

3. Cấu hình Deploy:
   ```
   Description: Freedom Wallet Registration v1.0
   
   Execute as: Me (your-email@gmail.com)
   
   Who has access: Anyone  ← QUAN TRỌNG: Phải chọn "Anyone"
   ```

4. Click **Deploy**

5. Lần đầu tiên, Google sẽ yêu cầu authorize:
   - Click **Authorize access**
   - Chọn tài khoản Google của bạn
   - Click **Advanced** (nếu có cảnh báo)
   - Click **Go to [Project Name] (unsafe)** ← Đừng lo, đây là app của bạn
   - Click **Allow**

6. Sau khi authorize xong, bạn sẽ thấy màn hình:
   ```
   ✅ Deployment successfully created
   
   Web app URL: https://script.google.com/macros/s/ABC123XYZ.../exec
   ```

7. **COPY URL này** (toàn bộ, từ https đến /exec)

---

## 🔗 Bước 5: Update Landing Page

1. Mở file: `index.html`
2. Tìm dòng (khoảng line 776):
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```

3. Thay `YOUR_DEPLOYMENT_ID` bằng URL vừa copy ở Bước 4:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/ABC123XYZ.../exec';
   ```

4. Save file (`Ctrl + S`)

---

## ✅ Bước 6: Test

### Test 1: Kiểm tra API hoạt động

Mở trình duyệt và truy cập:
```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?test=1
```

Kết quả mong đợi:
```json
{
  "success": true,
  "message": "Freedom Wallet API is working!",
  "timestamp": "2026-02-06T...",
  "data": {
    "version": "1.0.0",
    "sheetName": "FreedomWallet_Registrations"
  }
}
```

### Test 2: Đăng ký thử từ Landing Page

1. Mở file `index.html` bằng trình duyệt
2. Click **ĐĂNG KÝ NGAY**
3. Điền thông tin:
   - Họ tên: Test User
   - Email: test@example.com
   - Số điện thoại: 0901234567
   - Chọn gói: FREE
4. Click **Hoàn Tất Đăng Ký**

### Test 3: Kiểm tra Google Sheets

1. Quay lại Google Sheets
2. Bạn sẽ thấy sheet mới: **FreedomWallet_Registrations**
3. Có dòng test vừa đăng ký với đầy đủ thông tin

✅ **Nếu thấy dữ liệu → THÀNH CÔNG!**

---

## 📊 Cấu Trúc Google Sheets

| Cột | Tên | Mô tả |
|-----|-----|-------|
| A | 📅 Ngày đăng ký | Thời gian đăng ký (tự động) |
| B | Họ & Tên | Tên người đăng ký |
| C | 📧 Email | Email liên hệ |
| D | 📞 Điện thoại | Số điện thoại |
| E | 💎 Gói | FREE hoặc Premium |
| F | 📍 Nguồn | Landing Page |
| G | 📊 Trạng thái | Đã đăng ký / Chờ thanh toán / Đã thanh toán |
| H | 👥 Người giới thiệu | (Dùng cho referral system) |

---

## 🎨 Tính Năng Tự Động

### ✅ Validation
- Kiểm tra email format
- Kiểm tra số điện thoại (10-11 số)
- Kiểm tra họ tên (tối thiểu 2 ký tự)

### ✅ Duplicate Detection
- Không cho phép email trùng
- Không cho phép số điện thoại trùng

### ✅ Auto-formatting
- FREE: màu trắng
- Premium: background vàng, highlight

### ✅ Status Management
- FREE: "Đã đăng ký"
- Premium: "Chờ thanh toán" → "Đã thanh toán" (sau khi confirm)

---

## 🔧 Update Apps Script (Nếu Cần)

Khi bạn sửa code trong `google_apps_script.gs`:

1. Mở Apps Script Editor
2. Sửa code
3. **Save** (Ctrl + S)
4. Click **Deploy** → **Manage deployments**
5. Click ✏️ **Edit** (pencil icon) ở deployment hiện tại
6. Thay đổi **Version**: New version
7. Click **Deploy**

**Lưu ý**: URL deployment không đổi, không cần update lại `index.html`

---

## 🛠️ Utility Functions (Chạy Thủ Công)

### Xem thống kê đăng ký:

1. Trong Apps Script Editor
2. Chọn function: `getRegistrationStats`
3. Click **Run**
4. Xem kết quả trong **Execution log** (Ctrl + Enter)

Output:
```json
{
  "free": 150,
  "premium": 42,
  "total": 192,
  "limit": 1000,
  "remaining": 850
}
```

### Update trạng thái cho 1 user:

1. Trong Apps Script Editor
2. Sửa function `updateStatusByEmail`:
   ```javascript
   updateStatusByEmail('user@email.com', 'Đã thanh toán')
   ```
3. Click **Run**

---

## 🐛 Troubleshooting

### Lỗi: "Script function not found: doPost"
**Nguyên nhân**: Chưa save code  
**Giải pháp**: Click Save (Ctrl + S)

### Lỗi: "Authorization required"
**Nguyên nhân**: Chưa authorize hoặc hết hạn  
**Giải pháp**: Deploy lại và authorize lại

### Lỗi: "Access denied"
**Nguyên nhân**: Deploy setting sai  
**Giải pháp**: Đảm bảo chọn "Who has access: **Anyone**"

### Form submit không có phản hồi
**Nguyên nhân**: URL trong index.html sai  
**Giải pháp**: Kiểm tra lại GOOGLE_SHEETS_URL

### Data không vào Sheets
**Nguyên nhân**: CORS hoặc network error  
**Giải pháp**: 
- Kiểm tra Console (F12)
- Đảm bảo deploy "Who has access: Anyone"
- Test API endpoint trực tiếp trên browser

---

## 📞 Hỗ Trợ

Nếu gặp lỗi, hãy:
1. Mở Console (F12) → Tab Console
2. Copy error message
3. Liên hệ hỹ trợ qua Telegram

---

## ✨ Next Steps

Sau khi deploy thành công:

✅ Tích hợp Telegram Bot (@FreedomWalletbot)  
✅ Thiết lập auto-email confirmation  
✅ Thêm referral tracking system  
✅ Tích hợp payment gateway  

---

**Created**: 2026-02-06  
**Version**: 1.0.0  
**Author**: Freedom Wallet Team
