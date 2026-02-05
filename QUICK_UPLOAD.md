# 🚀 Quick Upload Guide

## Git Chưa Được Cài Đặt!

Bạn có 3 cách để upload:

---

## ✅ OPTION 1: GitHub Desktop (EASIEST)

1. **Download**: https://desktop.github.com/
2. **Install** và đăng nhập
3. **Clone repo**:
   - File > Clone Repository
   - URL: `https://github.com/mettatuan/freedom-wallet-landing`
   - Path: `D:\Projects\freedom-wallet-landing-github`
4. **Copy files**:
   ```powershell
   Copy-Item "D:\Projects\landingpage\freedom-wallet-registration\*" "D:\Projects\freedom-wallet-landing-github\" -Recurse -Force
   ```
5. **Commit & Push** trong GitHub Desktop

---

## 📤 OPTION 2: Upload Manual (Web)

**✅ ZIP file đã sẵn sàng!**

📦 Location: `D:\Projects\freedom-wallet-landing-upload.zip`

### Steps:
1. Open: https://github.com/mettatuan/freedom-wallet-landing
2. Click **"Add file"** > **"Upload files"**
3. **Drag & drop** các files (không nên upload ZIP, upload từng file)
4. Hoặc extract ZIP và upload từng folder

### Files cần upload:
- ✅ index.html
- ✅ README.md
- ✅ .gitignore
- ✅ backend/ (folder)
- ✅ docs/ (folder)
- ✅ assets/ (folder)

---

## 💻 OPTION 3: Install Git & Use Script

1. **Install Git**: https://git-scm.com/download/win
2. **Restart PowerShell**
3. **Run script**: Double-click `upload-to-github.bat`

---

## 🌐 Verify Upload

After upload, check:
- https://github.com/mettatuan/freedom-wallet-landing

Enable GitHub Pages:
1. Repository > Settings > Pages
2. Source: main branch
3. URL: https://mettatuan.github.io/freedom-wallet-landing/

---

## 📖 Full Guide

See: [GITHUB_UPLOAD_GUIDE.md](GITHUB_UPLOAD_GUIDE.md)

---

**Recommended**: Option 1 (GitHub Desktop) - Easiest and most reliable!
