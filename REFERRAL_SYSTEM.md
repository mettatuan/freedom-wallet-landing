# 🎁 Hệ Thống Giới Thiệu - Freedom Wallet

## 📋 Tổng Quan

Hệ thống giới thiệu được thiết kế để **viral growth** - khi user giới thiệu thành công 2 bạn bè, họ sẽ được nâng cấp lên **FREE trọn đời**.

---

## 🎯 Cơ Chế Hoạt Động

### 1. Đăng Ký FREE
Khi user đăng ký gói FREE:
- ✅ Nhận ngay link giới thiệu cá nhân
- ✅ Có thể chia sẻ lên: Facebook, Telegram, Zalo, X (Twitter)
- ✅ Mỗi người đăng ký qua link = +1 count

### 2. Tracking System
```
User A đăng ký
  ↓
Nhận referral code: ABC12345
  ↓
Chia sẻ link: freedomwallet.app?ref=ABC12345
  ↓
User B click và đăng ký → Count A = 1
  ↓
User C click và đăng ký → Count A = 2
  ↓
🎉 User A tự động nâng cấp FREE trọn đời!
```

### 3. Auto-Upgrade
- Khi đạt **2 người giới thiệu thành công**
- Google Sheets tự động update status → `"Nâng cấp FREE (Giới thiệu)"`
- Row highlight màu xanh (#E6F9F0)
- FreedomWalletBot thông báo + gửi link cài đặt app

---

## 📊 Google Sheets Structure

| Column | Dữ liệu | Mục đích |
|--------|---------|----------|
| A | 📅 Ngày đăng ký | Timestamp |
| B | Họ & Tên | Info |
| C | 📧 Email | Contact |
| D | 👤 Điện thoại | Contact |
| E | 💎 Gói | FREE/Premium |
| F | 🔗 Link giới thiệu | Referral code (unique) |
| G | 👥 Số người đã giới thiệu | Counter (0 → 2) |
| H | 📍 Nguồn | Landing Page |
| I | 📊 Trạng thái | Status tracking |
| J | 👤 Người giới thiệu | Referrer code |

---

## 🔐 Referral Code Generation

**Algorithm**: Simple hash từ email
```javascript
function generateReferralCode(email) {
    const hash = email.split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    return Math.abs(hash).toString(36).toUpperCase().substring(0, 8);
}
```

**Example**:
- Email: `user@example.com`
- Code: `2K8J3HL9`
- Link: `freedomwallet.app?ref=2K8J3HL9`

---

## 🎨 User Flow

### FREE User Flow:
1. **Đăng ký** → Điền form + chọn FREE
2. **Success Modal** hiện:
   - ✅ Referral link box
   - ✅ Social share buttons
   - ✅ Copy link button
3. **Chia sẻ** lên mạng xã hội
4. Khi **2 người đăng ký** → Nhận notification từ Bot
5. **Cài đặt app** theo link hướng dẫn

### Premium User Flow:
1. **Đăng ký** → Điền form + chọn Premium
2. **Payment Modal** hiện:
   - QR code OCB bank
   - Thông tin chuyển khoản
3. **Chuyển khoản** 999K
4. Click "Tôi đã chuyển khoản"
5. **Success Modal** hiện:
   - ✅ Link hướng dẫn cài đặt: https://eliroxbot.notion.site/freedomwallet
   - ✅ Link FreedomWalletBot support
   - ✅ Link group Telegram
6. **Cài đặt app** ngay lập tức

---

## 💬 Social Share Integration

### Facebook
```javascript
const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${referralLink}&quote=${shareText}`;
```

### Telegram
```javascript
const shareUrl = `https://t.me/share/url?url=${referralLink}&text=${shareText}`;
```

### Zalo
```javascript
const shareUrl = `https://zalo.me/share?url=${referralLink}`;
```

### X (Twitter)
```javascript
const shareUrl = `https://twitter.com/intent/tweet?url=${referralLink}&text=${shareText}`;
```

---

## 🤖 Bot Integration (Future)

### FreedomWalletBot Workflow:

**1. Welcome Message**
```
👋 Xin chào! Cảm ơn bạn đã đăng ký Freedom Wallet.

Bạn quan tâm đến khóa học nào của WIT?
(Có thể chọn nhiều)

1️⃣ Thấu hiểu nội tâm
2️⃣ Thấu hiểu tài chính
3️⃣ Thấu hiểu sức khỏe
4️⃣ Mentor WIT
5️⃣ Master WIT
6️⃣ Doanh chủ WIT
```

**2. Referral Notification** (When count = 2)
```
🎉 CHÚC MỪNG!

Bạn đã giới thiệu thành công 2 người đăng ký!

✅ Tài khoản của bạn đã được nâng cấp lên FREE trọn đời
✅ Bạn sẽ nhận tất cả update tính năng mới miễn phí

📱 Tải app tại: https://eliroxbot.notion.site/freedomwallet

💬 Cần hỗ trợ? Nhắn /help
```

**3. Premium Confirmation** (After payment)
```
💎 XÁC NHẬN THANH TOÁN THÀNH CÔNG

Cảm ơn bạn đã nâng cấp lên Premium!

📱 Hướng dẫn cài đặt: https://eliroxbot.notion.site/freedomwallet
👥 Group VIP: https://t.me/freedomwalletapp
🤝 Hỗ trợ 1-1: Nhắn trực tiếp cho tôi

Bắt đầu hành trình tự do tài chính nào! 🚀
```

---

## 📈 Analytics Tracking

### Key Metrics:
- **Conversion Rate**: % người đăng ký qua referral link
- **Viral Coefficient**: Trung bình mỗi user giới thiệu được bao nhiêu người
- **Time to 2 Referrals**: Thời gian trung bình để đạt 2 giới thiệu
- **Best Performers**: User có referral count cao nhất

### Dashboard View:
```sql
-- Top referrers
SELECT 
  "Họ & Tên",
  "Link giới thiệu",
  "Số người đã giới thiệu"
FROM FreedomWallet_Registrations
WHERE "Số người đã giới thiệu" > 0
ORDER BY "Số người đã giới thiệu" DESC
LIMIT 10
```

---

## 🎯 Growth Projections

### Scenario 1: Conservative (30% share rate)
```
Day 1: 100 users → 30 share
Day 3: 30 share → 9 signups → 3 upgraded
Day 7: Pattern repeats...
Month 1: ~800 users
```

### Scenario 2: Optimistic (60% share rate)
```
Day 1: 100 users → 60 share
Day 3: 60 share → 36 signups → 18 upgraded
Day 7: Viral loop accelerates...
Month 1: ~2,500 users
```

### Scenario 3: Viral (80% share rate)
```
Day 1: 100 users → 80 share
Day 2: 80 share → 64 signups → 32 upgraded
Day 5: Exponential growth...
Month 1: ~5,000+ users 🚀
```

---

## 🔧 Admin Management

### Check Referral Stats (Apps Script)
```javascript
function getRegistrationStats() {
  // Returns:
  // {
  //   free: 150,
  //   premium: 42,
  //   total: 192,
  //   upgraded: 15,
  //   remaining: 850
  // }
}
```

### Manual Upgrade User
```javascript
updateStatusByEmail('user@email.com', 'Nâng cấp FREE (Giới thiệu)');
```

### Find Top Referrers
```javascript
function getTopReferrers(limit = 10) {
  // Returns sorted list of users by referral count
}
```

---

## 🎨 UI/UX Best Practices

### Success Modal Design:
✅ Bright colors (yellow/green) for excitement
✅ Clear call-to-action buttons
✅ One-click social sharing
✅ Copy button with visual feedback
✅ Progress indicator (0/2 referrals)

### Share Message Template:
```
🎁 Freedom Wallet MIỄN PHÍ!

✅ Quản lý 6 Hũ Tiền
✅ Theo dõi 5 Cấp Bậc Tài Chính
✅ Dashboard chuyên nghiệp
✅ 100% an toàn

Đăng ký ngay tại: [LINK]
```

---

## 🐛 Troubleshooting

### Referral không tăng count:
1. Check column J (Người giới thiệu) có giá trị
2. Verify referral code khớp với column F
3. Check Apps Script logs

### Auto-upgrade không hoạt động:
1. Verify `incrementReferralCount()` function
2. Check if count === 2
3. Verify status update logic

### Social share không work:
1. Test từng platform riêng
2. Check URL encoding
3. Verify referral link format

---

## 🚀 Future Enhancements

- [ ] Dashboard tracking realtime cho user
- [ ] Leaderboard top referrers
- [ ] Bonus rewards cho 5, 10, 20 referrals
- [ ] Email automation khi reach milestones
- [ ] A/B testing share messages
- [ ] Deep linking cho mobile app

---

**Version**: 1.0.0  
**Created**: 2026-02-06  
**Author**: Freedom Wallet Team
