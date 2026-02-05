# Freedom Wallet Registration Landing Page

## Tổng Quan
Landing page đăng ký sử dụng Freedom Wallet với flow đầy đủ từ WIT (Giàu Toàn Diện) -> Freedom Wallet -> EliroxBot -> Phụng sự & Từ thiện.

## Cấu Trúc Flow

```
┌─────────────────────────────────────────────────────────────┐
│  1. WIT - GIÀU TOÀN DIỆN (7 Sư Giáo)                       │
│     https://t.me/giautoandien                               │
│     - Nội tâm, Tài chính, Sức khỏe, Gia đình hòa hợp       │
└─────────────────────────────────────────────────────────────┘
                            ⬇️
┌─────────────────────────────────────────────────────────────┐
│  2. FREEDOM WALLET (Landing Page này)                       │
│     - Giá: 999K (user thường) / FREE (học viên WIT)        │
│     - Quản lý tài chính theo 6 Hũ Tiền                     │
│     - Sau đăng ký → https://t.me/freedomwalletapp          │
└─────────────────────────────────────────────────────────────┘
                            ⬇️
┌─────────────────────────────────────────────────────────────┐
│  3. ELIROX BOT                                              │
│     https://eliroxbot.com/                                  │
│     - Đầu tư 10-20% từ Hũ Tự Do Tài Chính                 │
│     - Sau đăng ký → https://t.me/eliroxvip                 │
└─────────────────────────────────────────────────────────────┘
                            ⬇️
┌─────────────────────────────────────────────────────────────┐
│  4. PHỤNG SỰ & TỪ THIỆN                                    │
│     - 10% lợi nhuận → Quỹ 10 Triệu Trẻ Em                  │
│     - Nuôi dưỡng thế hệ tương lai tự do & giàu toàn diện   │
└─────────────────────────────────────────────────────────────┘
```

## Tính Năng Landing Page

### 1. Hero Section
- Hiển thị flow đầy đủ với 4 bước
- Badge nổi bật "HỆ SINH THÁI TÀI CHÍNH TOÀN DIỆN"
- Animation và hover effects

### 2. Pricing Section
Hai gói đăng ký:
- **Gói Cơ Bản**: 999.000 VNĐ (user chưa tham gia WIT)
- **Gói Học Viên WIT**: MIỄN PHÍ (100% cho học viên WIT)

### 3. Form Đăng Ký
Thu thập thông tin:
- Họ và tên
- Số điện thoại (10-11 số)
- Email
- Username Telegram (@username)
- Trạng thái WIT (đã/chưa tham gia)

### 4. Features Section
Giới thiệu 6 tính năng chính:
- 6 Hũ Tiền
- Báo cáo chi tiết
- Quản lý tài sản
- Mục tiêu tài chính
- Bảo mật cao
- Dễ sử dụng

### 5. Next Steps Section
Hướng dẫn các bước tiếp theo sau khi đăng ký

## Cài Đặt & Triển Khai

### Bước 1: Mở File HTML
File: `freedom-wallet-registration.html`

Mở trực tiếp trong trình duyệt hoặc host trên web server.

### Bước 2: Tích Hợp Google Apps Script

Tạo Google Apps Script để nhận data từ form:

```javascript
// Google Apps Script code
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('Registrations');
    
    // Thêm dòng mới vào sheet
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.phone,
      data.email,
      data.telegram,
      data.witStatus === 'yes' ? 'Học viên WIT (FREE)' : 'User thường (999K)',
      data.source
    ]);
    
    // Gửi thông báo Telegram (optional)
    sendTelegramNotification(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Đăng ký thành công'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendTelegramNotification(data) {
  const botToken = 'YOUR_BOT_TOKEN';
  const chatId = 'YOUR_CHAT_ID';
  
  const message = `
🎉 *ĐĂNG KÝ MỚI - FREEDOM WALLET*

👤 *Họ tên:* ${data.fullName}
📱 *SĐT:* ${data.phone}
📧 *Email:* ${data.email}
💬 *Telegram:* ${data.telegram}
🎓 *Trạng thái:* ${data.witStatus === 'yes' ? 'Học viên WIT (FREE)' : 'User thường (999K)'}
📅 *Thời gian:* ${new Date().toLocaleString('vi-VN')}
  `;
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown'
  };
  
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  });
}
```

### Bước 3: Cập Nhật URL trong HTML

Trong file `freedom-wallet-registration.html`, tìm dòng:

```javascript
const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
```

Thay `YOUR_GOOGLE_APPS_SCRIPT_URL` bằng URL của Google Apps Script Web App.

### Bước 4: Tạo Google Sheet

Tạo Google Sheet với các cột:
1. Timestamp
2. Họ và Tên
3. Số Điện Thoại
4. Email
5. Telegram Username
6. Loại Gói
7. Source

### Bước 5: Deploy Google Apps Script

1. Mở Google Apps Script
2. Click **Deploy** > **New deployment**
3. Chọn type: **Web app**
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Copy Web app URL
7. Paste vào HTML file

## Telegram Groups

### Freedom Wallet Support Group
- URL: https://t.me/freedomwalletapp
- Mục đích: Hỗ trợ user sử dụng app, hướng dẫn lập kế hoạch tài chính
- User được tự động redirect sau khi đăng ký thành công

### WIT - Giàu Toàn Diện
- URL: https://t.me/giautoandien
- Mục đích: Cộng đồng học viên WIT

### EliroxBot VIP
- URL: https://t.me/eliroxvip
- Mục đích: Hỗ trợ cài đặt chiến lược đầu tư với EliroxBot

## Workflow Sau Đăng Ký

### Đối với User Thường (999K)
1. ✅ Đăng ký thành công trên landing page
2. 📧 Nhận email xác nhận với thông tin thanh toán
3. 💳 Thanh toán 999.000 VNĐ
4. ✅ Xác nhận thanh toán từ admin
5. 🔗 Nhận link truy cập Freedom Wallet app
6. 💬 Tham gia group Telegram: https://t.me/freedomwalletapp
7. 📚 Nhận tài liệu hướng dẫn sử dụng
8. 🎯 Thiết lập 6 Hũ Tiền
9. 💰 Được hướng dẫn về EliroxBot (nếu muốn)

### Đối với Học Viên WIT (FREE)
1. ✅ Đăng ký thành công trên landing page
2. ✅ Xác minh tự động (hoặc thủ công) là học viên WIT
3. 🔗 Nhận link truy cập Freedom Wallet app ngay lập tức
4. 💬 Tham gia group Telegram VIP: https://t.me/freedomwalletapp
5. 👨‍🏫 Được tư vấn 1-1 về lập kế hoạch tài chính
6. 📚 Nhận khóa học nâng cao về tài chính
7. 🎯 Thiết lập 6 Hũ Tiền với mentor hỗ trợ
8. 💰 Ưu đãi đặc biệt khi đăng ký EliroxBot

## Customization

### Thay Đổi Màu Sắc
Trong phần `:root` của CSS:

```css
:root {
    --primary-blue: #0066FF;      /* Màu chính */
    --primary-purple: #667eea;    /* Màu gradient */
    --secondary-purple: #764ba2;  /* Màu gradient 2 */
    --gold: #FFD700;              /* Màu vàng nhấn */
}
```

### Thay Đổi Giá
Tìm và sửa trong HTML:

```html
<div class="price">
    999K <small>VNĐ</small>
</div>
```

### Thay Đổi Telegram Group URLs
Tìm và sửa các link:
- https://t.me/freedomwalletapp
- https://t.me/giautoandien
- https://t.me/eliroxvip

## Testing

### Test Form Submission
1. Mở file HTML trong trình duyệt
2. Điền và submit form
3. Kiểm tra Console (F12) xem có log data không
4. Kiểm tra Google Sheet có nhận data không
5. Kiểm tra Telegram có nhận thông báo không

### Test Responsive
Test trên các thiết bị:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## Analytics (Optional)

Thêm Google Analytics:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## SEO Optimization

File đã được tối ưu với:
- ✅ Meta description
- ✅ Semantic HTML
- ✅ Mobile responsive
- ✅ Fast loading
- ✅ Schema markup (có thể thêm)

## Support

Nếu cần hỗ trợ:
- 💬 Telegram: https://t.me/freedomwalletapp
- 📧 Email: support@freedomwallet.com (cập nhật email của bạn)

## License

© 2026 Freedom Wallet by WIT - Giàu Toàn Diện

---

**Note**: Nhớ cập nhật các URL và thông tin liên hệ thực tế trước khi deploy!
