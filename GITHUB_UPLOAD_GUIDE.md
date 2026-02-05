# 🚀 Upload Freedom Wallet Landing Page to GitHub

## Repository: https://github.com/mettatuan/freedom-wallet-landing

---

## ⚠️ Git Chưa Được Cài Đặt

Git chưa được cài đặt trên máy bạn. Bạn có 3 options để upload:

---

## 📦 OPTION 1: GitHub Desktop (RECOMMENDED - Dễ Nhất)

### Bước 1: Download & Install GitHub Desktop
1. Tải: https://desktop.github.com/
2. Cài đặt và đăng nhập GitHub account

### Bước 2: Clone Repository
1. Mở GitHub Desktop
2. Click **File** > **Clone Repository**
3. Chọn tab **URL**
4. Paste: `https://github.com/mettatuan/freedom-wallet-landing`
5. Choose local path: `D:\Projects\freedom-wallet-landing-github`
6. Click **Clone**

### Bước 3: Copy Files
```powershell
# Chạy trong PowerShell:
Copy-Item -Path "D:\Projects\landingpage\freedom-wallet-registration\*" -Destination "D:\Projects\freedom-wallet-landing-github\" -Recurse -Force
```

### Bước 4: Commit & Push
1. Quay lại GitHub Desktop
2. Sẽ thấy danh sách files changed
3. Viết commit message: "Initial commit - Freedom Wallet Landing Page"
4. Click **Commit to main**
5. Click **Push origin**

✅ **Done!** Check: https://github.com/mettatuan/freedom-wallet-landing

---

## 💻 OPTION 2: Install Git & Use Command Line

### Bước 1: Install Git
1. Tải Git for Windows: https://git-scm.com/download/win
2. Chạy installer với settings mặc định
3. Restart PowerShell sau khi cài

### Bước 2: Configure Git (first time only)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"
```

### Bước 3: Clone & Upload
```powershell
# Navigate to Projects folder
cd D:\Projects

# Clone repository
git clone https://github.com/mettatuan/freedom-wallet-landing.git

# Copy files
Copy-Item -Path ".\landingpage\freedom-wallet-registration\*" -Destination ".\freedom-wallet-landing\" -Recurse -Force

# Navigate to repo
cd freedom-wallet-landing

# Add all files
git add .

# Commit
git commit -m "Initial commit - Freedom Wallet Landing Page"

# Push to GitHub
git push origin main
```

---

## 🌐 OPTION 3: Upload Via GitHub Web Interface (Manual)

### Bước 1: Prepare ZIP File
```powershell
# Tạo ZIP file
Compress-Archive -Path "D:\Projects\landingpage\freedom-wallet-registration\*" -DestinationPath "D:\Projects\freedom-wallet-landing.zip" -Force
```

### Bước 2: Upload to GitHub
1. Mở: https://github.com/mettatuan/freedom-wallet-landing
2. Click **Add file** > **Upload files**
3. Drag & drop file ZIP hoặc chọn files
4. Scroll down, viết commit message
5. Click **Commit changes**

### Bước 3: Extract on GitHub (if uploaded ZIP)
Note: GitHub không tự động extract ZIP. Bạn cần:
1. Extract ZIP locally
2. Upload từng file/folder
3. Hoặc dùng Option 1 hoặc 2

---

## 📁 Files Cần Upload

```
freedom-wallet-landing/
├── index.html                          # Landing page
├── README.md                           # Quick start
├── .gitignore                          # Git config
│
├── backend/
│   └── registration-handler.gs         # Backend API
│
├── docs/
│   ├── README.md                       # Full documentation
│   ├── FLOW.md                         # Flow diagram
│   └── DEPLOYMENT.md                   # Deploy guide
│
└── assets/                             # Assets folder
```

---

## ✅ Verification Steps

Sau khi upload, kiểm tra:

1. **Repository page**: https://github.com/mettatuan/freedom-wallet-landing
2. **Files uploaded**: Tất cả files có trong repo
3. **README visible**: README.md hiển thị trên homepage
4. **GitHub Pages** (optional):
   - Go to: Settings > Pages
   - Source: Deploy from branch
   - Branch: main / root
   - Save
   - URL sẽ là: `https://mettatuan.github.io/freedom-wallet-landing/`

---

## 🎯 Recommended: Option 1 (GitHub Desktop)

Lý do:
- ✅ Dễ sử dụng, giao diện trực quan
- ✅ Không cần command line
- ✅ Tự động sync
- ✅ Visual diff tool
- ✅ Easy branch management

---

## 🆘 Troubleshooting

### Nếu repo chưa tồn tại
1. Vào: https://github.com/new
2. Repository name: `freedom-wallet-landing`
3. Description: "Freedom Wallet Landing Page - Registration System"
4. Public
5. ✅ Add README
6. Create repository
7. Follow steps above

### Nếu gặp lỗi authentication
1. GitHub Desktop: Đăng nhập lại
2. Git CLI: Dùng Personal Access Token (PAT)
   - Generate PAT: https://github.com/settings/tokens
   - Use PAT as password khi push

### Nếu có conflict
```powershell
git pull origin main --rebase
# Resolve conflicts nếu có
git push origin main
```

---

## 📞 Need Help?

- 📖 GitHub Desktop Guide: https://docs.github.com/en/desktop
- 📖 Git Guide: https://git-scm.com/book/en/v2
- 💬 Telegram Support: https://t.me/freedomwalletapp

---

## ⚡ Quick Commands Reference

```powershell
# Check Git version
git --version

# Clone repo
git clone https://github.com/mettatuan/freedom-wallet-landing.git

# Check status
git status

# Add files
git add .
git add specific-file.html

# Commit
git commit -m "Your message"

# Push
git push origin main

# Pull latest
git pull origin main

# View history
git log --oneline
```

---

**🎯 Recommended Next Step**: Install GitHub Desktop (Option 1) - Easiest way!

**📥 Download**: https://desktop.github.com/
