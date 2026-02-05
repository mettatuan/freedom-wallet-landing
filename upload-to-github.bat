@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   UPLOAD TO GITHUB - Freedom Wallet
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git chưa được cài đặt!
    echo.
    echo 📥 Vui lòng cài đặt Git:
    echo    https://git-scm.com/download/win
    echo.
    echo 📥 Hoặc dùng GitHub Desktop:
    echo    https://desktop.github.com/
    echo.
    echo 📖 Xem hướng dẫn đầy đủ:
    echo    GITHUB_UPLOAD_GUIDE.md
    echo.
    pause
    exit /b 1
)

echo ✅ Git detected!
echo.

REM Check if repo directory exists
if exist "D:\Projects\freedom-wallet-landing" (
    echo 📁 Repository đã tồn tại. Updating...
    cd /d "D:\Projects\freedom-wallet-landing"
    git pull origin main
) else (
    echo 📥 Cloning repository...
    cd /d "D:\Projects"
    git clone https://github.com/mettatuan/freedom-wallet-landing.git
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Clone failed! Kiểm tra:
        echo    1. Repository URL đúng chưa?
        echo    2. Đã đăng nhập GitHub chưa?
        echo    3. Repository đã được tạo chưa?
        echo.
        pause
        exit /b 1
    )
)

echo.
echo 📋 Copying files...
cd /d "D:\Projects"
xcopy /E /I /Y "landingpage\freedom-wallet-registration\*" "freedom-wallet-landing\"

echo.
echo 📦 Staging files...
cd /d "freedom-wallet-landing"
git add .

echo.
echo 💾 Committing...
git commit -m "Update: Freedom Wallet Landing Page - %date% %time%"

echo.
echo 📤 Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ UPLOAD SUCCESSFUL!
    echo ========================================
    echo.
    echo 🌐 View on GitHub:
    echo    https://github.com/mettatuan/freedom-wallet-landing
    echo.
    echo 🚀 GitHub Pages (if enabled):
    echo    https://mettatuan.github.io/freedom-wallet-landing/
    echo.
) else (
    echo.
    echo ❌ Push failed! Possible reasons:
    echo    1. Authentication required
    echo    2. No changes to commit
    echo    3. Network error
    echo.
    echo 💡 Try:
    echo    - Run: git push origin main
    echo    - Check your GitHub credentials
    echo.
)

echo.
pause
