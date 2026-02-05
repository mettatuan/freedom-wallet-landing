# 🏦 Freedom Wallet - Landing Page & Registration System

> Hệ thống đăng ký hoàn chỉnh cho Freedom Wallet với backend tự động hóa

## 📁 Cấu Trúc Thư Mục

```
freedom-wallet-registration/
├── index.html                          # Landing page chính
├── README.md                           # File này
│
├── backend/
│   └── registration-handler.gs         # Google Apps Script API
│
├── docs/
│   ├── README.md                       # Tổng quan chi tiết hệ thống
│   ├── FLOW.md                         # Mô tả flow đầy đủ
│   └── DEPLOYMENT.md                   # Hướng dẫn deploy từng bước
│
└── assets/
    └── (images, css, js nếu tách riêng)
```

## 🚀 Quick Start

### 1. Xem Landing Page
Mở file `index.html` trong trình duyệt để xem trước.

### 2. Deploy
Đọc hướng dẫn chi tiết tại: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

**Các bước chính:**
1. Setup Google Sheet
2. Deploy Google Apps Script (`backend/registration-handler.gs`)
3. Update API URL trong `index.html`
4. Deploy landing page lên hosting
5. Test và go live!

### 3. Tìm Hiểu Flow
Xem flow diagram và mô tả chi tiết tại: [`docs/FLOW.md`](docs/FLOW.md)

## 📖 Documentation

### 📄 Chi Tiết Files

| File | Mô tả |
|------|-------|
| **index.html** | Landing page với form đăng ký, pricing cards, features |
| **backend/registration-handler.gs** | Google Apps Script xử lý submissions, gửi email & Telegram |
| **docs/README.md** | Tài liệu tổng quan hệ thống |
| **docs/FLOW.md** | Flow diagram: WIT → Freedom Wallet → EliroxBot → Phụng Sự |
| **docs/DEPLOYMENT.md** | Hướng dẫn deploy chi tiết từng bước |

### 🎯 Tính Năng Chính

#### Landing Page (index.html)
- ✅ Hero section với flow visualization
- ✅ Pricing: 999K vs FREE (WIT members)
- ✅ Form đăng ký với validation
- ✅ Features showcase
- ✅ Responsive design
- ✅ Success modal

#### Backend (registration-handler.gs)
- ✅ Save to Google Sheet
- ✅ Telegram bot notifications
- ✅ Email confirmations (2 templates)
- ✅ Data validation
- ✅ Analytics functions

## 🎨 Customization

### Thay Đổi Màu Sắc
Trong `index.html`, tìm section `:root`:
```css
:root {
    --primary-blue: #0066FF;
    --primary-purple: #667eea;
    --gold: #FFD700;
}
```

### Thay Đổi Giá
Tìm và sửa trong `index.html`:
```html
<div class="price">
    999K <small>VNĐ</small>
</div>
```

### Cập Nhật Links
- Telegram groups
- EliroxBot URL
- Payment information

## 🔗 Resources

### Telegram Groups
- 🎓 **WIT**: https://t.me/giautoandien
- 💰 **Freedom Wallet**: https://t.me/freedomwalletapp
- 🤖 **EliroxBot**: https://t.me/eliroxvip

### Websites
- 🤖 **EliroxBot**: https://eliroxbot.com/

## 🧪 Testing

```bash
# 1. Test landing page locally
# Mở index.html trong browser

# 2. Test Google Apps Script
# Run function `testRegistration()` trong Apps Script Editor

# 3. Test full flow
# Submit form với data thật và verify:
# - Google Sheet có data mới
# - Telegram notification gửi thành công
# - Email confirmation được gửi
```

## 📊 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Google Apps Script
- **Database**: Google Sheets
- **Notifications**: Telegram Bot API, Gmail API
- **Hosting**: GitHub Pages / Netlify / Vercel (recommended)

## 🔐 Security

- ✅ Input validation (client & server)
- ✅ Rate limiting
- ✅ CORS handling
- ✅ HTTPS only
- ⚠️ Khuyến nghị thêm: CAPTCHA, email verification

## 📈 Analytics

Xem thống kê trong Google Apps Script:
```javascript
// Run function này
getRegistrationStats()
```

Hoặc gửi qua Telegram:
```javascript
sendStatsToTelegram()
```

## 🐛 Troubleshooting

Các vấn đề thường gặp và cách giải quyết:

1. **Form không submit** → Check Console (F12), verify API URL
2. **Telegram không nhận notification** → Check Bot Token & Chat ID
3. **Email không gửi** → Check Gmail daily limit (100 emails/day)

Xem thêm tại: [`docs/DEPLOYMENT.md#troubleshooting`](docs/DEPLOYMENT.md#troubleshooting)

## 🛣️ Roadmap

- [ ] Payment gateway integration
- [ ] Auto-send app links
- [ ] Admin dashboard
- [ ] Email marketing automation
- [ ] A/B testing

## 📞 Support

- 💬 Telegram: https://t.me/freedomwalletapp
- 📧 Email: support@freedomwallet.com
- 📖 Docs: Xem thư mục `docs/`

## 📜 License

© 2026 Freedom Wallet by WIT - Giàu Toàn Diện

---

**🚀 Ready to deploy?** Start with [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

**❓ Need help?** Check [`docs/README.md`](docs/README.md) for detailed documentation
