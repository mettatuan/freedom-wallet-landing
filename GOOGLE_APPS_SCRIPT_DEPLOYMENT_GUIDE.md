# 🚀 HƯỚNG DẪN DEPLOY GOOGLE APPS SCRIPT

## ⚠️ QUAN TRỌNG: Đây là lý do Google Sheets không nhận được data!

Google Apps Script phải được deploy với **đúng permissions** thì landing page mới gửi data được.

---

## 📋 CÁC BƯỚC DEPLOY

### Bước 1: Mở Google Apps Script Editor

1. Vào Google Sheet của bạn: https://docs.google.com/spreadsheets/d/1Xj2sH_LuJtFS0zQX-C2VkNtF52f5sOBGa6-0bSUIvGw/edit
2. Click **Extensions** → **Apps Script**
3. Xóa toàn bộ code mặc định
4. Copy toàn bộ nội dung từ file `google_apps_script.gs` và paste vào

### Bước 2: Save Project

1. Click vào icon đĩa (Save) hoặc `Ctrl + S`
2. Đặt tên project: `FreedomWallet_Backend`

### Bước 3: Deploy Web App (QUAN TRỌNG NHẤT!)

1. Click nút **Deploy** (góc trên bên phải) → **New deployment**
2. Click vào icon bánh răng ⚙️ → chọn **Web app**
3. Điền thông tin:
   - **Description**: `FreedomWallet Landing Page API v1`
   - **Execute as**: Chọn **Me** (email của bạn)
   - **Who has access**: ⚠️ **PHẢI CHỌN "Anyone"** ⚠️
     - ❌ KHÔNG chọn "Only myself" (sẽ bị lỗi authentication!)
     - ✅ PHẢI chọn "Anyone" để landing page có thể gửi data
4. Click **Deploy**

### Bước 4: Xác nhận Permissions

1. Click **Authorize access**
2. Chọn tài khoản Google của bạn
3. Click **Advanced** → **Go to FreedomWallet_Backend (unsafe)**
4. Click **Allow**

### Bước 5: Copy URL

1. Sau khi deploy thành công, bạn sẽ thấy **Web app URL**
2. Copy URL này (dạng: `https://script.google.com/macros/s/AKfycb.../exec`)
3. Paste vào file `index.html` tại dòng **1440**:

```javascript
const GOOGLE_SHEETS_URL = 'PASTE_URL_VÀO_ĐÂY';
```

---

## 🧪 KIỂM TRA DEPLOYMENT

### Test 1: Kiểm tra API hoạt động

Mở trình duyệt và truy cập URL vừa copy, thêm `?test=1` vào cuối:

```
https://script.google.com/macros/s/AKfycb.../exec?test=1
```

Nếu thấy response dạng này là **THÀNH CÔNG**:

```json
{
  "success": true,
  "message": "Freedom Wallet API is working!",
  "data": {
    "timestamp": "2024-02-06T...",
    "version": "1.0.0",
    "sheetName": "FreedomWallet_Registrations"
  }
}
```

### Test 2: Kiểm tra từ Landing Page

1. Mở [index.html](index.html) trong trình duyệt
2. Mở **Developer Console** (`F12`)
3. Đăng ký với thông tin test
4. Xem console logs:
   - ✅ `📝 Form data: {...}` 
   - ✅ `📤 Sending to Google Sheets: {...}`
   - ✅ `🔗 URL: https://script...`
   - ✅ `✅ Response status: 200`
   - ✅ `✅ Server response: {success: true, ...}`

5. Kiểm tra Google Sheet → phải thấy dòng mới xuất hiện!

---

## ❌ CÁC LỖI THƯỜNG GẶP

### Lỗi 1: CORS Policy Error
```
Access to fetch at 'https://script.google.com/...' from origin 'http://localhost:8000' 
has been blocked by CORS policy
```

**Nguyên nhân**: Deploy với "Only myself" thay vì "Anyone"

**Giải pháp**: 
1. Deploy lại với **"Who has access" = "Anyone"**
2. Copy URL mới và update vào [index.html](index.html)

### Lỗi 2: Authorization Required
```
Authorization is required to perform that action
```

**Nguyên nhân**: Chưa authorize hoặc deploy sai cấu hình

**Giải pháp**:
1. Vào Apps Script Editor
2. Run hàm `doGet` một lần để trigger authorization
3. Deploy lại

### Lỗi 3: Response Status 302 (Redirect)

**Nguyên nhân**: URL bị redirect vì permissions chưa đúng

**Giải pháp**: 
1. Kiểm tra lại **"Execute as" = Me**
2. Kiểm tra lại **"Who has access" = Anyone**
3. Deploy lại và lấy URL mới

### Lỗi 4: Không thấy data trong Google Sheet

**Nguyên nhân**: URL trong [index.html](index.html) không khớp với deployment hiện tại

**Giải pháp**:
1. Vào Apps Script Editor → **Deploy** → **Manage deployments**
2. Copy lại **Web app URL** từ deployment mới nhất
3. Update vào [index.html](index.html) dòng 1440

---

## 🔍 DEBUG CHECKLIST

Khi data không được gửi đến Google Sheets, check từng bước:

- [ ] Apps Script đã deploy với **"Who has access" = Anyone**
- [ ] URL trong [index.html](index.html) khớp với deployment URL
- [ ] Test endpoint `?test=1` trả về JSON success
- [ ] Console log không có lỗi CORS
- [ ] Console log hiển thị `Response status: 200`
- [ ] Google Sheet có tab tên `FreedomWallet_Registrations`
- [ ] Header row đã tồn tại (row 1)

---

## 📞 HỖ TRỢ

Nếu vẫn gặp vấn đề:

1. Mở trình duyệt, bật Console (`F12`)
2. Đăng ký thử trên landing page
3. Copy toàn bộ console logs
4. Gửi cho tôi kèm theo:
   - Screenshot lỗi (nếu có)
   - Deployment URL hiện tại
   - Screenshot Apps Script deployment settings

---

## ✅ HOÀN TẤT!

Sau khi deploy đúng:
- ✅ Landing page gửi data thành công
- ✅ Google Sheets nhận được registrations
- ✅ Referral tracking hoạt động
- ✅ Social share buttons có thể click
- ✅ Console logs hiển thị debug info

**Lưu ý**: Mỗi lần thay đổi code Apps Script, phải **deploy lại** (New deployment) để có URL mới!
