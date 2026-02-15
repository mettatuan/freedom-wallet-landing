# 📋 CHANGELOG MASTER - Freedom Wallet Ecosystem

> **Lịch sử phát triển tổng hợp** của hệ sinh thái Freedom Wallet bao gồm:
> - **FreedomWallet** (Google Sheets Template)
> - **FreedomWalletBot** (Telegram Support Bot)
> - **Landing Page** (freedomwallet.app)

---

## 🎯 Roadmap Workflow

```
User Đề Xuất → BACKLOG (💡) → (Admin review/10+ votes) → TODO (📋) → IN PROGRESS (🔨) → IN REVIEW (🔍) → DONE (✅)
```

---

## [Webapp v3.2.1] - 2026-01-16

**Platform:** Google Sheets Template  
**Status:** ✅ DONE

### Fixed

- **Mobile Asset Price Update:**
  - Sửa lỗi `CRUD.update is not a function` trong form "Cập nhật giá hiện tại" trên mobile
  - Thay bằng `CRUD.save()` để hỗ trợ cả create và update
  - Form đóng và refresh dữ liệu ngay sau khi cập nhật thành công

- **Purchase Date Display:**
  - Sửa lỗi hiển thị "Ngày mua" khi ngày không hợp lệ
  - Thêm hàm validation `isValidPurchaseDate()` kiểm tra format DD/MM/YYYY
  - Validate range và date existence (ví dụ: không có 31/02/2024)

### Improved

- **Date Validation:**
  - Validation đầy đủ cho purchaseDate: regex, range, date existence
  - Đảm bảo format nhất quán DD/MM/YYYY

---

## [Webapp v3.2.0] - 2026-01-15

**Platform:** Google Sheets Template  
**Status:** ✅ DONE

### Added

- **Core Infrastructure Modules:**
  - `Constants.html` - Tập trung tất cả constants (events, modules, config, sync, performance, storage, API, cache, date presets)
  - `Logger.html` - Structured logging (DEBUG, INFO, WARN, ERROR, SUCCESS) với log history, export logs
  - `ErrorHandler.html` - Centralized error handling với auto-detect type, user-friendly messages, error statistics

- **API Module Improvements:**
  - API response caching với TTL 5 phút
  - Methods: `clearCache()`, `_getCachedResponse()`, `_cacheResponse()`
  - Debouncing cho `getAllData()` giảm server load

- **Documentation:**
  - `docs/ARCHITECTURE.md` - Bản đồ hướng dẫn cấu trúc app, module loading order, data flow
  - `docs/HUONG_DAN_SU_DUNG_CORE_MODULES.md` - Hướng dẫn sử dụng Constants, Logger, ErrorHandler
  - `docs/TONG_KET_TRIEN_KHAI.md` + `docs/TONG_KET_HOAN_TAT.md` - Tổng kết cải tiến

### Improved

- **12 Module Updates:**
  - `ModuleLoader.html`, `EventBus.html`, `DataSyncManager.html`, `App.html`, `API.html`, `CRUD.html`
  - `Utils.html`, `Button.html`, `SummaryCards.html`, `TimeFilter.html`, `UI.html`
  - Consistent logging (Logger thay console.log), better error handling (ErrorHandler)

- **Code Quality:**
  - Centralized configuration (Constants thay hardcoded strings)
  - Reduced code duplication
  - Better error recovery với automatic retry

### Fixed

- Inconsistent logging → Tất cả modules dùng Logger
- Poor error handling → ErrorHandler xử lý tập trung
- Hardcoded strings → Constants
- Duplicate CSS trong `TimeFilter.html`
- Commented code trong `Index.html`

---

## [Webapp v3.1.0] - 2026-01-15

**Platform:** Google Sheets Template  
**Status:** ✅ DONE

### Added

- **Cache System:**
  - Multi-level cache: Script Cache (100KB/5min), User Cache (10min), Document Cache (1h)
  - Cache versioning với fingerprint để đảm bảo consistency

- **Debts Module:**
  - `DebtsSyncOptimizer` - Tối ưu đồng bộ (giảm latency 2000ms → ~500ms)

- **6 Jars Features:**
  - Popup chi tiết từng hũ (số dư, mô tả, tỷ lệ phân bổ, thu/chi)
  - Chọn "Tài khoản nguồn" khi chi tiêu
  - Bộ lọc nhanh: Tháng này (default), Quý này, Năm này, Tùy chỉnh
  - Chuyển tiền giữa các hũ
  - Lịch sử giao dịch theo hũ
  - Nút "Cài đặt" chỉnh tỷ lệ phân bổ, số dư, mục tiêu

### Improved

- Tăng chiều cao pie chart trang 6 Hũ
- Tốc độ load Dashboard: giảm 80% số lần đọc sheet (cache)
- Tốc độ frontend: nhanh hơn 38% (Lighthouse)
- UI popup với thông tin đầy đủ (thu, chi, số dư, mô tả)
- Logic tính số dư hũ: incremental updates thay vì full recalculation

### Fixed

- Logic phân bổ tự động: chỉ tính giao dịch "Thu" có `jarId=null` và `autoAllocate=true`
- Tính số dư hũ: thêm Assets và "Cho vay" vào công thức
- Biểu đồ thu/chi chỉ hiển thị thu
- Duplicate hiển thị bộ lọc ngày
- JS không load đúng dữ liệu 6 Hũ
- Format ngày: DD/MM/YYYY (set format Text trước khi ghi)
- Chọn tài khoản mặc định: luôn chọn số dư cao nhất
- "THU ĐƯỢC PHÂN BỔ" hiển thị sai

---

## [Webapp v3.0.0] - 2025-11-01

**Platform:** Google Sheets Template  
**Status:** ✅ DONE

### Added

- **Major Modules:**
  - `Assets.html` - Quản lý tài sản (bất động sản, xe, vàng, crypto)
  - `Investments.html` - Đầu tư (chứng khoán, quỹ, trái phiếu)
  - `Debts.html` - Quản lý nợ (vay, cho vay)
  - `Jars.html` - Phương pháp 6 Hũ tiền
  - `Dashboard.html` - Tổng quan tài chính

### Improved

- Navigation system với các modules mới
- Data schema mở rộng cho assets, investments, debts
- UI/UX cho dashboard tổng hợp

### Fixed

- Performance issues với dataset lớn
- Mobile responsiveness

---

## [Webapp v2.0.0] - 2025-08-01

**Platform:** Google Sheets Template  
**Status:** ✅ DONE

### Added

- **Transactions CRUD Module:**
  - Create, Read, Update, Delete giao dịch
  - Categories management
  - Account management
  - Basic reporting

### Improved

- Google Sheets integration
- Form validation
- Error handling

### Fixed

- Data consistency issues
- Date format bugs

---

## [Bot v1.0] - 2026-01-10

**Platform:** Telegram Bot (Python)  
**Status:** ✅ DONE

### Added

- **24/7 Customer Support:**
  - Vietnamese language support
  - GPT-4 powered conversations
  - Natural language understanding

- **Knowledge Base:**
  - Freedom Wallet documentation
  - 6 Jars method guides
  - Financial tips library

- **Interactive Features:**
  - Tutorial delivery system
  - Troubleshooting assistance
  - Support ticket system

- **Integration:**
  - Google Sheets API connection
  - OpenAI GPT-4 API
  - Telegram Bot API

### Tech Stack

- Python 3.9+
- python-telegram-bot
- OpenAI API
- Google Sheets API
- Railway/Google Cloud Run deployment

---

## [Landing Page v1.0] - 2026-02-16

**Platform:** Static Website (HTML/CSS/JS)  
**Status:** ✅ DONE

### Added

- **Pricing Model:**
  - FREE forever access
  - Donation-based Premium (pay what you want)
  - Transparent donation usage

- **Interactive Roadmap:**
  - Kanban board with 5 columns (BACKLOG → TODO → IN PROGRESS → IN REVIEW → DONE)
  - Feature request system
  - Community voting system
  - Real-time updates from Google Sheets

- **Registration Flow:**
  - Email + name capture
  - Automatic Google Sheet creation
  - Bot access registration
  - Payment modal for Premium

### Improved

- CORS fix for Google Apps Script
- Mobile responsive design
- FAQ section for donation model

---

## 💡 BACKLOG - Community Suggestions

> Features awaiting admin review or 10+ votes

### High Priority (15+ votes)

- **FW006:** Mobile App iOS/Android (23 votes)
- **FW008:** Quản lý tài chính gia đình (18 votes)
- **FW004:** Kết nối ngân hàng tự động (15 votes)

### Medium Priority (8-14 votes)

- **FW007:** Dự báo chi tiêu AI (12 votes)
- **FW010:** Dark mode cho webapp (9 votes)
- **FW005:** Scan hóa đơn bằng AI (8 votes)

### Low Priority (0-7 votes)

- **FW009:** Export báo cáo PDF/Excel (6 votes)

---

## 📊 Ecosystem Statistics

### FreedomWallet (Webapp)
- **Versions Released:** 5 major versions
- **Modules:** 15+ core modules
- **Features:** 50+ features implemented
- **Performance:** 80% faster load time (v3.1.0)

### FreedomWalletBot
- **Version:** 1.0 (Production)
- **Uptime:** 24/7
- **Languages:** Vietnamese
- **AI Model:** GPT-4

### Landing Page
- **Status:** Live at freedomwallet.app
- **Integrations:** Google Sheets, Telegram Bot
- **Community:** Feature voting system active

---

## 🔜 Next Sprint (Planned)

> Features moving from BACKLOG → TODO based on votes and admin review

1. **Mobile App Development** (FW006 - 23 votes)
   - React Native development
   - iOS + Android support
   - Offline mode

2. **Family Finance Management** (FW008 - 18 votes)
   - Multi-user support
   - Shared budgets
   - Permission system

3. **Bank Integration** (FW004 - 15 votes)
   - API partnerships with major banks
   - Auto transaction sync
   - Balance updates

---

## 📝 Notes

- **Changelog Location:** `FreedomWallet/changelog.md` (Webapp), `FreedomWalletBot/CHANGELOG.md` (Bot)
- **Roadmap Board:** Google Sheets "Roadmap_Features" sheet
- **Voting System:** localStorage + Google Sheets "Feature_Votes"
- **Update Frequency:** Monthly for major releases, weekly for patches

---

**Last Updated:** 2026-02-16  
**Maintainer:** Freedom Wallet Team
