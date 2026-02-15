# 🎯 Kanban Roadmap Update - Feb 16, 2026

## ✨ What's New

### 1. BACKLOG Column Added
- **Purpose:** Community suggestions chờ admin review hoặc đạt 10+ votes
- **Icon:** 💡
- **Color:** Gray (rgba(128,128,128,0.15))
- **Workflow:** User đề xuất → **BACKLOG** → (approved) → TODO → IN PROGRESS → IN REVIEW → DONE

### 2. Real Features from Changelog
Sample data đã được **thay thế hoàn toàn** bằng features THỰC TẾ từ changelog:

**✅ DONE Column (6 features):**
- `FW_V3.2.1` - Mobile Asset Price Updates (Jan 16, 2026)
- `FW_V3.2.0` - Core Infrastructure (Constants, Logger, ErrorHandler) (Jan 15, 2026)
- `FW_V3.1.0` - Cache System & 6 Jars Improvements (Jan 15, 2026)
- `FW_V3.0.0` - Major Modules (Assets, Investments, Debts, Jars, Dashboard) (Nov 1, 2025)
- `FW_V2.0.0` - Transactions CRUD (Aug 1, 2025)
- `FW_BOT_V1` - Telegram Bot v1.0 (Jan 10, 2026)

**💡 BACKLOG Column (7 features):**
- `FW004` - Kết nối ngân hàng tự động (15 votes)
- `FW005` - Scan hóa đơn AI (8 votes)
- `FW006` - Mobile App iOS/Android (23 votes) ⭐ Highest votes
- `FW007` - Dự báo chi tiêu AI (12 votes)
- `FW008` - Quản lý tài chính gia đình (18 votes)
- `FW009` - Export báo cáo PDF/Excel (6 votes)
- `FW010` - Dark mode (9 votes)

### 3. Unified Changelog
Created **CHANGELOG_MASTER.md** combining:
- FreedomWallet (Webapp) versions
- FreedomWalletBot (Telegram Bot) versions
- Landing Page updates
- Community suggestions từ BACKLOG

### 4. Bot Changelog
Created **FreedomWalletBot/CHANGELOG.md** documenting bot v1.0 features:
- 24/7 support
- GPT-4 integration
- Knowledge base
- Tutorial system
- Support tickets

---

## 📝 Files Updated

### Frontend (index.html)
1. **Kanban Board Structure:**
   - Added BACKLOG column (5 columns total)
   - Updated grid layout: `repeat(auto-fit, minmax(250px, 1fr))`
   - New counter: `#backlog-count`

2. **Workflow Info Box:**
   - Updated text: "Đề xuất → **BACKLOG** → (Admin/10+ votes) → TODO → ..."
   - Clear explanation workflow

3. **JavaScript Functions:**
   - `renderKanbanBoard()`: Added BACKLOG to columns object
   - `handleFeatureRequest()`: New submissions go to `status: 'BACKLOG'`
   - `showKanbanError()`: Include backlog-cards in error handling
   - Updated counters to show all 5 columns

### Backend (google_apps_script_kanban_addon.gs)
1. **KANBAN_CONFIG:**
   - Added `BACKLOG: 'BACKLOG'` to STATUSES

2. **addSampleFeatures():**
   - Replaced 10 fake features with **6 DONE (from changelog) + 7 BACKLOG (community)**
   - Real dates matching changelog.md
   - Real descriptions từ actual releases

3. **addFeature() Handler:**
   - Default status: `BACKLOG` (instead of TODO)
   - Comment: "User submissions go to BACKLOG first"

### Documentation
1. **CHANGELOG_MASTER.md (NEW):**
   - Combined history: Webapp v3.2.1 → v2.0.0, Bot v1.0, Landing Page v1.0
   - Ecosystem statistics
   - BACKLOG community suggestions
   - Next sprint planning

2. **FreedomWalletBot/CHANGELOG.md (NEW):**
   - Bot v1.0 full documentation
   - Architecture decisions
   - Performance metrics
   - Known issues & roadmap v1.1.0

3. **KANBAN_SETUP_GUIDE.md:**
   - Updated board structure (5 columns)
   - Workflow explanation
   - Last updated: 2026-02-16

---

## 🚀 Deployment Steps

### 1. Update Google Apps Script
```javascript
// File: google_apps_script_kanban_addon.gs
// Changes:
// - STATUSES.BACKLOG added
// - addSampleFeatures() updated with real features
// - Default status for new features = BACKLOG
```

**Action Required:**
1. Open Google Apps Script
2. Find `addSampleFeatures()` function
3. Replace entire function with updated code from addon file
4. Find `STATUSES` config
5. Add `BACKLOG: 'BACKLOG',` line
6. **Deploy new version**

### 2. Update Landing Page
```html
<!-- File: index.html -->
<!-- Changes:
- Added BACKLOG column HTML
- Updated JavaScript renderKanbanBoard()
- Updated workflow info box
-->
```

**Action Required:**
1. Upload updated `index.html` to hosting
2. Clear browser cache
3. Test roadmap reload

### 3. Create Changelogs
```bash
# Already created:
✅ landingpage/freedom-wallet-landing/CHANGELOG_MASTER.md
✅ FreedomWalletBot/CHANGELOG.md

# Action Required:
- Commit to git
- Push to repo
```

---

## 📊 Before vs After

### Before (Fake Demo Data)
```javascript
// FW001-FW003: Vague "Template, Bot, AI" marked DONE
// FW004-FW010: Ideas mixed in TODO, IN PROGRESS, IN REVIEW
// No connection to actual changelog
```

### After (Real Production Data)
```javascript
// DONE: 6 real versions from changelog (dates, descriptions match)
// BACKLOG: 7 community suggestions awaiting approval
// Workflow: Clear separation BACKLOG → TODO (only after review)
```

---

## ✅ Testing Checklist

### Frontend
- [ ] BACKLOG column displays correctly
- [ ] 5 columns responsive on mobile
- [ ] Counter shows correct numbers for all columns
- [ ] Workflow info box shows updated text
- [ ] New feature requests go to BACKLOG

### Backend
- [ ] Google Apps Script deployed new version
- [ ] GET /exec?action=getFeatures returns 13 features
- [ ] 6 features have status="DONE" (versions)
- [ ] 7 features have status="BACKLOG" (community)
- [ ] POST addFeature creates with status="BACKLOG"

### Documentation
- [ ] CHANGELOG_MASTER.md comprehensive
- [ ] FreedomWalletBot/CHANGELOG.md detailed
- [ ] KANBAN_SETUP_GUIDE.md updated

---

## 🎓 Understanding the Changes

### Why BACKLOG?
**Problem:** User suggestions went directly to TODO, no filtering
**Solution:** BACKLOG acts as staging area cho community ideas

**Benefits:**
- Admin can review before committing to TODO
- Community voting helps prioritize (10+ votes = auto-approve)
- Transparent roadmap process
- Prevents spam features

### Why Real Changelog Data?
**Problem:** Sample data (FW001-FW003) was fake, misleading users
**Solution:** Parse actual changelog.md to populate DONE column

**Benefits:**
- Roadmap reflects ACTUAL progress
- Users see real versions completed
- Builds trust (transparency)
- Easy to maintain (update from changelog)

### Why Unified Changelog?
**Problem:** Webapp và Bot have separate changelogs, hard to see big picture
**Solution:** CHANGELOG_MASTER.md combines both + landing page

**Benefits:**
- Single source of truth
- Easy to see ecosystem progress
- Better planning (webapp + bot integration milestones)
- Community understands full roadmap

---

## 📅 Maintenance

### Weekly Tasks
1. Review BACKLOG features with 10+ votes → Move to TODO
2. Update IN PROGRESS/IN REVIEW as work progresses
3. Move completed features to DONE with version number

### Monthly Tasks
1. Update CHANGELOG_MASTER.md with new releases
2. Clean up old BACKLOG suggestions (no votes for 3 months)
3. Analyze voting patterns for roadmap planning

### On Each Release
1. Update FreedomWallet/changelog.md OR FreedomWalletBot/CHANGELOG.md
2. Add feature card to DONE column in Google Sheets
3. Update CHANGELOG_MASTER.md
4. Announce in landing page/newsletter

---

## 📞 Support

**Issues?**
- Frontend: Check browser console for errors
- Backend: Check Google Apps Script execution logs
- Data: Verify Google Sheets "Roadmap_Features" structure

**Questions?**
- Workflow unclear? → Read KANBAN_SETUP_GUIDE.md
- Integration issues? → Check google_apps_script_kanban_addon.gs comments
- Feature requests? → Use the roadmap board itself! 😉

---

**Updated by:** Freedom Wallet Team  
**Date:** 2026-02-16  
**Version:** Kanban v2.0 (BACKLOG update)
