# 🚀 HƯỚNG DẪN DEPLOY FREEDOM WALLET REGISTRATION SYSTEM

## 📋 Mục Lục
1. [Tổng Quan](#tổng-quan)
2. [Yêu Cầu](#yêu-cầu)
3. [Bước 1: Setup Google Sheet](#bước-1-setup-google-sheet)
4. [Bước 2: Deploy Google Apps Script](#bước-2-deploy-google-apps-script)
5. [Bước 3: Setup Telegram Bot](#bước-3-setup-telegram-bot)
6. [Bước 4: Deploy Landing Page](#bước-4-deploy-landing-page)
7. [Bước 5: Testing](#bước-5-testing)
8. [Troubleshooting](#troubleshooting)

---

## Tổng Quan

Hệ thống đăng ký Freedom Wallet bao gồm:
- **Landing Page** (`freedom-wallet-registration.html`) - Form đăng ký
- **Google Apps Script** (`registration-handler.gs`) - API backend
- **Google Sheet** - Database lưu trữ đăng ký
- **Telegram Bot** - Thông báo real-time

### Kiến trúc hệ thống

```
┌─────────────────┐
│  Landing Page   │
│   (HTML/JS)     │
└────────┬────────┘
         │ POST
         ↓
┌─────────────────┐
│ Google Apps     │
│    Script       │
│   (Backend)     │
└────┬───┬───┬────┘
     │   │   │
     ↓   ↓   ↓
  ┌───┐┌───┐┌──────┐
  │GS ││TG ││Email │
  │   ││Bot││      │
  └───┘└───┘└──────┘
```

---

## Yêu Cầu

- ✅ Tài khoản Google (Gmail)
- ✅ Tài khoản Telegram
- ✅ Web hosting (hoặc GitHub Pages) để host HTML
- ✅ Trình duyệt web hiện đại

---

## Bước 1: Setup Google Sheet

### 1.1. Tạo Google Sheet mới

1. Truy cập: https://sheets.google.com
2. Click **Blank** để tạo sheet mới
3. Đặt tên: `Freedom Wallet Registrations`
4. Copy **Spreadsheet ID** từ URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

### 1.2. Lưu Spreadsheet ID

```
Ví dụ URL:
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit

Spreadsheet ID là: 1a2b3c4d5e6f7g8h9i0j
```

**Lưu ID này**, bạn sẽ cần dùng ở bước sau.

---

## Bước 2: Deploy Google Apps Script

### 2.1. Mở Apps Script Editor

1. Trong Google Sheet, click **Extensions** > **Apps Script**
2. Xóa code mặc định trong file `Code.gs`

### 2.2. Copy Code

1. Mở file `registration-handler.gs`
2. Copy TOÀN BỘ code
3. Paste vào Apps Script Editor

### 2.3. Cấu hình CONFIG

Tìm phần `CONFIG` ở đầu file và điền thông tin:

```javascript
const CONFIG = {
  // Paste Spreadsheet ID từ bước 1
  SPREADSHEET_ID: '1a2b3c4d5e6f7g8h9i0j',
  SHEET_NAME: 'Registrations',
  
  // Telegram Bot - Sẽ setup ở bước 3
  TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
  TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID_HERE',
  
  // Email admin
  ADMIN_EMAIL: 'admin@example.com',
  
  // App URLs
  FREEDOM_WALLET_URL: 'YOUR_FREEDOM_WALLET_APP_URL',
  TELEGRAM_GROUP: 'https://t.me/freedomwalletapp',
  ELIROX_URL: 'https://eliroxbot.com/'
};
```

### 2.4. Chạy Setup Function

1. Chọn function `setupSheet` từ dropdown
2. Click **Run** (▶️)
3. Authorize app khi được yêu cầu:
   - Click **Review permissions**
   - Choose your Google account
   - Click **Advanced** > **Go to [Project name] (unsafe)**
   - Click **Allow**

4. Kiểm tra Google Sheet - sheet "Registrations" đã được tạo với headers

### 2.5. Deploy Web App

1. Click **Deploy** > **New deployment**
2. Click ⚙️ icon > **Web app**
3. Cấu hình:
   - **Description**: Freedom Wallet Registration API
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy **Web app URL** - giống như:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

**Lưu URL này**, bạn sẽ cần dùng ở bước 4.

---

## Bước 3: Setup Telegram Bot

### 3.1. Tạo Bot với BotFather

1. Mở Telegram, search `@BotFather`
2. Gửi command: `/newbot`
3. Đặt tên bot: `Freedom Wallet Notifications`
4. Đặt username: `freedomwallet_notif_bot` (hoặc tên khác)
5. **Copy Bot Token** - giống như:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

### 3.2. Lấy Chat ID

**Option 1: Dùng bot @userinfobot**
1. Search `@userinfobot` trong Telegram
2. Start bot
3. Copy **Id** number

**Option 2: Dùng API**
1. Gửi message bất kỳ cho bot của bạn
2. Truy cập URL (thay YOUR_BOT_TOKEN):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. Tìm `"chat":{"id":123456789}`
4. Copy số `123456789`

### 3.3. Cập nhật CONFIG

Quay lại Apps Script, update CONFIG:

```javascript
TELEGRAM_BOT_TOKEN: '123456789:ABCdefGHIjklMNOpqrsTUVwxyz',
TELEGRAM_CHAT_ID: '123456789',
```

### 3.4. Test Telegram

1. Chọn function `testRegistration` từ dropdown
2. Click **Run**
3. Kiểm tra:
   - Google Sheet có thêm 1 dòng test
   - Telegram nhận được notification

Nếu OK → Deploy lại:
1. Click **Deploy** > **Manage deployments**
2. Click ✏️ Edit
3. **Version**: New version
4. Click **Deploy**

---

## Bước 4: Deploy Landing Page

### 4.1. Cập nhật API URL

Mở file `freedom-wallet-registration.html`

Tìm dòng (khoảng line 900):

```javascript
const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
```

Thay `YOUR_GOOGLE_APPS_SCRIPT_URL` bằng Web app URL từ bước 2.5:

```javascript
const response = await fetch('https://script.google.com/macros/s/AKfycbx.../exec', {
```

### 4.2. Tùy chỉnh thông tin (Optional)

- Cập nhật thông tin thanh toán (nếu có)
- Thay đổi màu sắc theme
- Cập nhật các link Telegram groups

### 4.3. Deploy HTML

**Option A: GitHub Pages (Free)**

1. Tạo repo GitHub mới: `freedom-wallet-landing`
2. Upload file `freedom-wallet-registration.html`
3. Đổi tên thành `index.html`
4. Vào **Settings** > **Pages**
5. Source: **Deploy from branch**
6. Branch: **main** / **root**
7. Click **Save**
8. URL sẽ là: `https://[username].github.io/freedom-wallet-landing/`

**Option B: Netlify (Free)**

1. Truy cập: https://netlify.com
2. Drag & drop file HTML vào Netlify
3. Site được deploy ngay, URL: `https://[random].netlify.app`
4. (Optional) Custom domain

**Option C: Vercel (Free)**

1. Truy cập: https://vercel.com
2. Import project từ GitHub hoặc upload file
3. Deploy tự động

**Option D: Host riêng**

Upload file lên server/hosting của bạn qua FTP.

---

## Bước 5: Testing

### 5.1. Test Full Flow

1. Mở landing page trên trình duyệt
2. Điền form đăng ký với thông tin test
3. Click **Đăng Ký Ngay**

### 5.2. Kiểm tra kết quả

✅ **Phải thấy:**
- Modal "Đăng ký thành công" hiện lên
- Google Sheet có thêm 1 dòng mới
- Telegram nhận notification
- Email confirmation được gửi (nếu đã setup)

❌ **Nếu bị lỗi:**
- Mở Console (F12) xem error message
- Xem [Troubleshooting](#troubleshooting)

### 5.3. Test Cases

| Test Case | WIT Status | Expected Result |
|-----------|------------|-----------------|
| Test 1    | Đã tham gia WIT | Gói FREE, email WIT member |
| Test 2    | Chưa tham gia | Gói 999K, email thanh toán |
| Test 3    | Invalid phone | Error validation |
| Test 4    | Invalid email | Error validation |

---

## Troubleshooting

### ❌ Lỗi: "CORS error" hoặc "Network error"

**Nguyên nhân:** Google Apps Script chưa được deploy đúng hoặc URL sai

**Giải pháp:**
1. Kiểm tra Web app URL có đúng không
2. Đảm bảo "Who has access" = **Anyone**
3. Deploy lại Apps Script với version mới

---

### ❌ Lỗi: "Authorization required"

**Nguyên nhân:** Chưa authorize Apps Script

**Giải pháp:**
1. Vào Apps Script Editor
2. Run function `setupSheet` hoặc `testRegistration`
3. Authorize app khi được yêu cầu

---

### ❌ Không nhận được Telegram notification

**Nguyên nhân:** Bot Token hoặc Chat ID sai

**Giải pháp:**
1. Kiểm tra lại Bot Token và Chat ID
2. Đảm bảo đã gửi message cho bot (để có chat history)
3. Test bằng cách run function `testRegistration`

---

### ❌ Data không lưu vào Sheet

**Nguyên nhân:** Spreadsheet ID sai hoặc quyền truy cập

**Giải pháp:**
1. Kiểm tra Spreadsheet ID trong CONFIG
2. Đảm bảo tài khoản Google có quyền edit sheet
3. Run function `setupSheet` để tạo lại structure

---

### ❌ Email không được gửi

**Nguyên nhân:** Gmail daily sending limit hoặc email không valid

**Giải pháp:**
1. Kiểm tra email address có đúng format
2. Gmail free có limit 100 emails/day
3. Xem logs trong Apps Script: View > Executions

---

### ❌ Form submit nhưng không có phản hồi

**Nguyên nhân:** JavaScript error hoặc fetch failed

**Giải pháp:**
1. Mở Console (F12) xem error
2. Kiểm tra network tab xem request có đi không
3. Test Apps Script trực tiếp bằng Postman/curl

---

## 📊 Monitoring & Analytics

### Xem thống kê đăng ký

Trong Apps Script, run function:
```javascript
sendStatsToTelegram()
```

Sẽ nhận message với:
- Tổng số đăng ký
- Số học viên WIT
- Số user thường  
- Tổng doanh thu

### Google Sheet Reports

Tạo pivot table hoặc charts để phân tích:
- Số đăng ký theo ngày
- Tỷ lệ WIT vs Regular
- Conversion rate

---

## 🔐 Security Best Practices

1. **Không commit sensitive data** vào Git:
   - Bot tokens
   - Spreadsheet IDs
   - API keys

2. **Rate limiting**: Thêm rate limit để tránh spam
   ```javascript
   // Trong Apps Script
   const cache = CacheService.getScriptCache();
   const key = `register_${data.email}`;
   if (cache.get(key)) {
     return createResponse(false, 'Vui lòng đợi 5 phút trước khi đăng ký lại');
   }
   cache.put(key, 'true', 300); // 5 minutes
   ```

3. **Input validation**: Đã implement trong code
   - Phone: 10-11 digits
   - Email: valid format
   - Telegram: starts with @

4. **HTTPS only**: Luôn dùng HTTPS cho production

---

## 📱 Mobile Optimization

Landing page đã responsive cho mobile, test trên:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)

---

## 🎨 Customization Tips

### Thay đổi màu sắc
```css
:root {
    --primary-blue: #0066FF;
    --primary-purple: #667eea;
    --gold: #FFD700;
}
```

### Thêm Google Analytics
Thêm vào `<head>` section:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Thêm Facebook Pixel
```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

---

## 📞 Support

Nếu gặp vấn đề không giải quyết được:

1. Check [Troubleshooting](#troubleshooting) section
2. Xem logs trong Apps Script: **View** > **Executions**
3. Join Telegram support: https://t.me/freedomwalletapp

---

## ✅ Checklist Trước Khi Go Live

- [ ] Google Sheet đã được tạo và có headers
- [ ] Apps Script đã deploy thành công (Web app URL)
- [ ] Đã test function `testRegistration` - OK
- [ ] Telegram bot đã nhận notification - OK
- [ ] Landing page đã update API URL
- [ ] Landing page đã deploy lên hosting
- [ ] Test full flow end-to-end - OK
- [ ] Đã update thông tin thanh toán (nếu cần)
- [ ] Đã setup email template với logo/branding
- [ ] Đã chuẩn bị Telegram groups để add members
- [ ] Đã thông báo cho team về system mới

---

## 🚀 Next Steps

Sau khi system chạy ổn định:

1. **Tích hợp Payment Gateway** (Momo, ZaloPay, VNPay)
2. **Tự động gửi link app** sau khi thanh toán
3. **Auto-add user** vào Telegram group
4. **Dashboard analytics** với Google Data Studio
5. **A/B testing** các version landing page khác nhau
6. **Email marketing automation** với follow-up sequences

---

**🎉 Chúc bạn deploy thành công!**

Nếu có thắc mắc, hãy liên hệ qua Telegram: https://t.me/freedomwalletapp
