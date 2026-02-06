# 🔥 FIX LỖI: CONFIG HAS ALREADY BEEN DECLARED

## ❌ LỖI BẠN ĐANG GẶP:

```
SyntaxError: Identifier 'CONFIG' has already been declared (line 1, file "freedom")
```

## 💡 NGUYÊN NHÂN:

Google Apps Script project của bạn có **NHIỀU FILE .gs** và code bị duplicate giữa các file!

**Ví dụ:**
```
📁 Apps Script Project
  ├── 📄 Code.gs       → có code CONFIG
  ├── 📄 freedom.gs    → có code CONFIG (DUPLICATE!)
  └── 📄 (file khác)   → có thể cũng có code
```

→ Apps Script load TẤT CẢ các file → bị duplicate variable!

---

## ✅ GIẢI PHÁP (CHI TIẾT TỪNG BƯỚC):

### BƯỚC 1: Mở Apps Script Editor

1. Vào: https://docs.google.com/spreadsheets/d/1Xj2sH_LuJtFS0zQX-C2VkNtF52f5sOBGa6-0bSUIvGw/edit
2. Menu: **Extensions** → **Apps Script**

---

### BƯỚC 2: KIỂM TRA CÓ BAO NHIÊU FILE

Nhìn vào **sidebar bên TRÁI** của Apps Script Editor.

Bạn sẽ thấy:
```
📁 Files
  📄 Code.gs
  📄 freedom.gs      ← File này đang gây lỗi!
  📄 (có thể có thêm...)
```

**Nếu thấy NHIỀU HỠN 1 FILE** → Đây là nguyên nhân!

---

### BƯỚC 3: XÓA TẤT CẢ CÁC FILE CŨ

**Cách xóa 1 file:**

1. Hover chuột vào tên file bên trái (ví dụ: `freedom.gs`)
2. Click vào icon **⋮** (3 chấm dọc) hoặc **Click chuột phải**
3. Chọn **Remove** hoặc **Delete**
4. Confirm xóa

**Lặp lại** cho TẤT CẢ các file cho đến khi chỉ còn **1 FILE DUY NHẤT**.

---

### BƯỚC 4: XÓA CODE TRONG FILE CUỐI CÙNG

Giờ bạn còn 1 file duy nhất (ví dụ: `Code.gs`).

1. Click vào file đó
2. `Ctrl+A` (select all code)
3. `Delete` (xóa hết)
4. Nhìn thấy:
   ```
   function myFunction() {
   
   }
   ```
   hoặc màn hình hoàn toàn trống → OK!

---

### BƯỚC 5: ĐỔI TÊN FILE (TÙY CHỌN)

1. Click vào tên file hiện tại (ví dụ: `Code`)
2. Đổi tên thành: `FreedomWallet`
3. Enter

---

### BƯỚC 6: PASTE CODE MỚI (SẠCH SẼ)

1. Mở file `google_apps_script.gs` trong VS Code
2. `Ctrl+A` → `Ctrl+C` (copy toàn bộ code)
3. Quay lại Apps Script Editor
4. `Ctrl+V` (paste vào file trống)
5. `Ctrl+S` (save)

**Kiểm tra:** 
- Chỉ có **1 FILE** duy nhất bên sidebar trái
- Code trong file đó là code từ `google_apps_script.gs`
- Không còn icon lỗi đỏ nào

---

### BƯỚC 7: DEPLOY

1. Click **Deploy** (góc trên phải) → **New deployment**
2. Click ⚙️ → chọn **Web app**
3. Điền:
   - **Description**: `FreedomWallet v1.0`
   - **Execute as**: **Me** (email của bạn)
   - **Who has access**: **Anyone** ⚠️
4. Click **Deploy**
5. **Authorize access** → chọn tài khoản → **Advanced** → **Go to... (unsafe)** → **Allow**

---

### BƯỚC 8: COPY URL MỚI

1. Sau deploy thành công, copy **Web app URL**
2. Mở `index.html` trong VS Code
3. Tìm dòng 1444:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. Thay bằng URL mới vừa copy
5. `Ctrl+S` (save)

---

### BƯỚC 9: TEST

**Test 1: Kiểm tra API**

Mở browser, paste URL + `?test=1`:
```
https://script.google.com/macros/s/YOUR_NEW_URL/exec?test=1
```

**Kết quả mong đợi** (JSON, KHÔNG PHẢI HTML):
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

✅ **Thấy JSON như trên** → THÀNH CÔNG!
❌ **Vẫn thấy HTML lỗi** → Quay lại Bước 2, kiểm tra lại có file nào khác không!

**Test 2: Đăng ký từ Landing Page**

1. Refresh `index.html` (`F5`)
2. Mở Console (`F12`)
3. Đăng ký với email test
4. Xem console logs:
   ```
   ========================================
   📝 SENDING TO GOOGLE SHEETS
   ========================================
   Data: {...}
   ✅ Response status: 200
   ✅ Response OK: true
   📄 Response preview: {"success":true,...
   ✅ Server response: {success: true, ...}
   ========================================
   ```

5. Kiểm tra Google Sheet → **THẤY DÒNG MỚI!** 🎉

---

## 🔍 TROUBLESHOOTING

### Vẫn báo lỗi "CONFIG has already been declared"

→ Có thể bạn chưa xóa hết tất cả các file!

**Check lại:**
1. Vào Apps Script Editor
2. Đếm số file bên sidebar trái
3. **PHẢI CHỈ CÓ 1 FILE DUY NHẤT!**
4. Nếu còn nhiều file → xóa hết trừ 1

### Không thấy icon "⋮" để xóa file

→ Click chuột phải vào tên file → chọn **Remove**

### Không thể xóa file cuối cùng

→ Không sao! Chỉ cần:
1. Xóa toàn bộ code bên trong
2. Paste code mới vào
3. Save và Deploy

### Test API vẫn trả về HTML lỗi

Check lại:
- [ ] Chỉ có 1 file trong Apps Script
- [ ] Code không có lỗi syntax (không có dấu đỏ)
- [ ] Deploy với "Execute as: Me"
- [ ] Deploy với "Who has access: Anyone"
- [ ] Đã authorize permissions

---

## 📸 MẸO DEBUG

Sau khi paste code mới, trước khi deploy:

1. Click vào menu **Run** (▶️) → chọn `doGet`
2. Nếu có lỗi → Apps Script sẽ báo ngay
3. Nếu không lỗi → Click **View** → **Logs** để xem output
4. Thấy log thành công → OK, có thể deploy!

---

## ✅ CHECKLIST ĐẦY ĐỦ

- [ ] Đã xóa TẤT CẢ file cũ, chỉ còn 1 file
- [ ] File cuối cùng đã xóa hết code cũ
- [ ] Paste code từ `google_apps_script.gs`
- [ ] Save (`Ctrl+S`)
- [ ] Không còn icon lỗi đỏ nào
- [ ] Run function `doGet` để test → không lỗi
- [ ] Deploy với "Anyone" access
- [ ] Authorize permissions
- [ ] Copy URL mới
- [ ] Update vào `index.html` dòng 1444
- [ ] Save `index.html`
- [ ] Test API với `?test=1` → thấy JSON
- [ ] Refresh landing page và test đăng ký
- [ ] Check Google Sheet → thấy data mới!

---

## 🎯 KẾT QUẢ MONG ĐỢI

Sau khi hoàn tất:
- ✅ Apps Script chỉ có **1 file** duy nhất
- ✅ Test API trả về **JSON**, không phải HTML
- ✅ Đăng ký từ landing page → data lưu vào Google Sheets
- ✅ Console logs hiển thị đầy đủ thông tin
- ✅ Không còn lỗi "CONFIG has already been declared"

---

**Làm theo đúng 9 bước trên và báo kết quả cho tôi!** 🚀

Nếu vẫn lỗi, chụp màn hình:
1. Sidebar bên trái Apps Script (danh sách files)
2. Console error khi test đăng ký
3. Gửi cho tôi để debug tiếp!
