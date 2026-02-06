# 💰 Freedom Wallet - Landing Page

Landing page quảng bá app **Freedom Wallet** với chiến lược viral marketing và hệ thống referral.

## 🎯 Mục Tiêu

- Thu hút **1000 người dùng đầu tiên** với gói FREE
- Chuyển đổi sang gói Premium 999K
- Viral growth qua hệ thống giới thiệu (2 bạn = FREE trọn đời)

---

## 📁 Cấu Trúc Files

```
freedom-wallet-landing/
├── index.html                    # Landing page chính
├── google_apps_script.gs         # Backend xử lý đăng ký
├── DEPLOYMENT_GUIDE.md           # Hướng dẫn deploy chi tiết
├── README.md                     # File này
└── images/
    ├── freedom-wallet.jpg        # Hero image
    ├── freedom-wallet (2).jpg    # Dashboard
    ├── freedom-wallet (3).jpg    # Giao dịch
    ├── freedom-wallet (4).jpg    # 6 Hũ tiền
    ├── freedom-wallet (5).jpg    # Tài sản
    └── freedom-wallet (6).jpg    # 5 Cấp bậc
```

---

## ✨ Tính Năng Landing Page

### 🎨 Hero Section
- Badge "FREE cho 1000 người đầu tiên" với animation
- 1 nút CTA: **ĐĂNG KÝ NGAY**
- 3 trust badges (tạo lòng tin)
- Hình ảnh app thật

### 💔 Pain Points
6 vấn đề tài chính khách hàng thường gặp

### 🚀 Features
5 tính năng chính với screenshot thật:
- Dashboard tài chính toàn diện
- Quản lý giao dịch thông minh
- Phương pháp 6 Hũ Tiền
- Quản lý tài sản toàn diện
- 5 Cấp bậc tài chính

### 💰 Pricing
2 gói rõ ràng:
- **FREE**: 1000 người đầu HOẶC giới thiệu 2 bạn
- **Premium 999K**: Trọn đời, được update tính năng mới

### ❓ FAQ
5 câu hỏi thường gặp

### 📱 3 Modals
1. **Registration Modal**: Chọn gói + điền thông tin
2. **Payment Modal**: QR code OCB bank (VietQR)
3. **Success Modal**: Redirect Telegram

---

## 🔧 Stack Công Nghệ

| Công nghệ | Mục đích |
|-----------|----------|
| HTML5 + CSS3 | Frontend |
| Vanilla JavaScript | Logic xử lý |
| Google Apps Script | Backend API |
| Google Sheets | Database |
| VietQR API | QR code thanh toán |
| Telegram Bot | Survey & support |

---

## 🚀 Deploy Checklist

### Bước 1: Setup Google Apps Script ✅
Xem chi tiết: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

1. ✅ Mở Google Sheets
2. ✅ Tạo Apps Script project
3. ✅ Copy code từ `google_apps_script.gs`
4. ✅ Deploy as Web App (Anyone can access)
5. ✅ Copy Deployment URL
6. ✅ Update `index.html`

### Bước 2: Test ✅

1. ✅ Test API endpoint: `?test=1`
2. ✅ Đăng ký thử từ landing page
3. ✅ Kiểm tra data trong Google Sheets

### Bước 3: Upload Landing Page 🚀

**Option A: GitHub Pages (Free)**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

**Option B: Netlify (Free)**
Drag & drop folder vào Netlify

---

## 💳 Payment Flow

### Gói FREE:
1. User chọn FREE → Điền form
2. Submit → Lưu vào Sheets (status: "Đã đăng ký")
3. Redirect Telegram → Bot survey

### Gói Premium:
1. User chọn Premium → Điền form
2. Hiển thị Payment Modal với QR code OCB
3. User click "Tôi đã chuyển khoản"
4. Admin xác nhận → Update status: "Đã thanh toán"

---

## 📊 Google Sheets Database

**Sheet**: `FreedomWallet_Registrations`

| Cột | Dữ liệu | Auto-fill |
|-----|---------|-----------|
| A | 📅 Ngày đăng ký | ✅ Timestamp |
| B | Họ & Tên | User input |
| C | 📧 Email | User input |
| D | 📞 Điện thoại | User input |
| E | 💎 Gói | User select |
| F | 📍 Nguồn | ✅ "Landing Page" |
| G | 📊 Trạng thái | ✅ Auto-set |
| H | 👥 Người giới thiệu | Referral link |

---

## 📞 Support

- 💬 Telegram Group: https://t.me/freedomwalletapp
- 🤖 Telegram Bot: @FreedomWalletbot

---

## 📝 Changelog

### v1.0.0 (2026-02-06)
- ✅ Landing page với 5 sections
- ✅ 2-tier pricing (FREE/Premium)
- ✅ Google Apps Script backend
- ✅ Payment flow với QR code
- ✅ Modal system
- ✅ Responsive design

---

**🚀 Let's achieve financial freedom together!**
