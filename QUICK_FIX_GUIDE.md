# ⚡ CÁCH FIX NGAY - 5 PHÚT!

## 🔴 VẤN ĐỀ HIỆN TẠI:

1. ✅ **Zalo share** → Đã fix! Bấm Zalo sẽ copy link
2. ❌ **Google Sheets không nhận data** → Lỗi: `SyntaxError: Identifier 'CONFIG' has already been declared (line 1, file "freedom")`

**Nguyên nhân**: Có nhiều file .gs trong Apps Script project và code bị duplicate!

---

## ✅ GIẢI PHÁP (LÀM ĐÚNG THỨ TỰ!)

### BƯỚC 1: Vào Google Apps Script

1. Mở link này: https://docs.google.com/spreadsheets/d/1Xj2sH_LuJtFS0zQX-C2VkNtF52f5sOBGa6-0bSUIvGw/edit
2. Click **Extensions** → **Apps Script**

### BƯỚC 2: XÓA TẤT CẢ CÁC FILE CŨ

**⚠️ QUAN TRỌNG: Phải xóa TẤT CẢ các file, không chỉ xóa code!**

Trong Apps Script Editor, bên trái bạn sẽ thấy danh sách các file:
- `Code.gs` (hoặc tên khác)
- `freedom.gs` (file này đang gây lỗi!)
- Có thể có thêm file khác...

**Cách xóa file:**

1. Hover chuột vào **MỖI FILE** trong danh sách bên trái
2. Click vào icon **3 chấm (⋮)** hoặc click chuột phải
3. Chọn **Remove** (Xóa)
4. Lặp lại cho **TẤT CẢ** các file cho đến khi chỉ còn 1 file

**Sau đó:**

5. Với file cuối cùng còn lại, `Ctrl+A` (select all)
6. `Delete` (xóa toàn bộ code bên trong)
7. Nhìn thấy file trống hoàn toàn → OK!
8. Đổi tên file này thành `Code` (click vào tên file → rename)

### BƯỚC 3: PASTE CODE MỚI

1. Mở file `google_apps_script.gs` trong VS Code
2. `Ctrl+A` → `Ctrl+C` (copy all)
3. Quay lại Apps Script Editor
4. `Ctrl+V` (paste)
5. `Ctrl+S` (save)

### BƯỚC 4: DEPLOY

1. Click **Deploy** → **New deployment**
2. Click ⚙️ → chọn **Web app**
3. Điền:
   - Description: `v1`
   - Execute as: **Me**
   - Who has access: **Anyone** ⚠️ (QUAN TRỌNG!)
4. Click **Deploy**
5. Click **Authorize access** → Allow

### BƯỚC 5: COPY URL

1. Thấy **Web app URL** → Copy
2. Mở `index.html` trong VS Code
3. Tìm dòng 1444: `const GOOGLE_SHEETS_URL = '...'`
4. Replace URL cũ bằng URL mới
5. `Ctrl+S` (save)

### BƯỚC 6: TEST

1. Refresh browser (`F5`)
2. Đăng ký với email test
3. Kiểm tra Google Sheet → Thấy dòng mới!

---

## 🧪 KIỂM TRA NHANH

Test API trước khi dùng:

Mở browser, paste URL deployment + `?test=1`:
```
https://script.google.com/macros/s/YOUR_URL/exec?test=1
```

**Thấy JSON** → ✅ OK!
```json
{"success": true, "message": "Freedom Wallet API is working!", ...}
```

**Thấy HTML lỗi** → ❌ Quay lại Bước 2 (xóa code cũ)

---

## 📝 CHECKLIST

- [ ] Xóa hết code cũ trong Apps Script
- [ ] Paste code từ google_apps_script.gs
- [ ] Save
- [ ] Deploy với "Anyone" access
- [ ] Copy URL mới
- [ ] Paste vào index.html dòng 1444
- [ ] Save index.html
- [ ] Test với ?test=1 → thấy JSON
- [ ] Refresh page và đăng ký test
- [ ] Check Google Sheet → thấy data!

---

## 🎯 KẾT QUẢ

Sau khi làm xong:
- ✅ Đăng ký hoàn tất → data lưu vào Google Sheets
- ✅ Zalo button → copy link
- ✅ Facebook/Telegram/X → mở popup share
- ✅ Console hiển thị debug logs rõ ràng

---

**Bất kỳ vấn đề gì, check file chi tiết hơn**: [GOOGLE_APPS_SCRIPT_DEPLOYMENT_GUIDE.md](GOOGLE_APPS_SCRIPT_DEPLOYMENT_GUIDE.md)
