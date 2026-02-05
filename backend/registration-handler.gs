// Google Apps Script - Freedom Wallet Registration Handler
// File: registration-handler.gs
// Deploy as Web App để nhận POST requests từ landing page

// ==================== CONFIGURATION ====================
const CONFIG = {
  // Google Sheet ID - Thay bằng ID của sheet bạn
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',
  SHEET_NAME: 'Registrations',
  
  // Telegram Bot Configuration
  TELEGRAM_BOT_TOKEN: 'YOUR_BOT_TOKEN_HERE',
  TELEGRAM_CHAT_ID: 'YOUR_CHAT_ID_HERE',
  
  // Email Configuration (optional)
  ADMIN_EMAIL: 'admin@example.com',
  
  // App URLs
  FREEDOM_WALLET_URL: 'YOUR_FREEDOM_WALLET_APP_URL',
  TELEGRAM_GROUP: 'https://t.me/freedomwalletapp',
  ELIROX_URL: 'https://eliroxbot.com/'
};

// ==================== MAIN HANDLER ====================

/**
 * Handle POST requests from registration form
 */
function doPost(e) {
  try {
    // Parse incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate data
    const validation = validateRegistrationData(data);
    if (!validation.valid) {
      return createResponse(false, validation.message);
    }
    
    // Save to Google Sheet
    const rowNumber = saveToSheet(data);
    
    // Send Telegram notification to admin
    sendTelegramNotification(data, rowNumber);
    
    // Send confirmation email to user
    sendConfirmationEmail(data);
    
    // Log the registration
    Logger.log(`New registration: ${data.fullName} (${data.email})`);
    
    return createResponse(true, 'Đăng ký thành công!', {
      rowNumber: rowNumber,
      telegramGroup: CONFIG.TELEGRAM_GROUP
    });
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Có lỗi xảy ra. Vui lòng thử lại sau.');
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'Freedom Wallet Registration API is running',
    version: '1.0.0'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ==================== DATA VALIDATION ====================

/**
 * Validate registration data
 */
function validateRegistrationData(data) {
  // Check required fields
  const requiredFields = ['fullName', 'phone', 'email', 'telegram', 'witStatus'];
  for (const field of requiredFields) {
    if (!data[field]) {
      return { valid: false, message: `Thiếu thông tin: ${field}` };
    }
  }
  
  // Validate phone number (10-11 digits)
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(data.phone)) {
    return { valid: false, message: 'Số điện thoại không hợp lệ' };
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, message: 'Email không hợp lệ' };
  }
  
  // Validate telegram username
  if (!data.telegram.startsWith('@')) {
    return { valid: false, message: 'Username Telegram phải bắt đầu bằng @' };
  }
  
  // Validate WIT status
  if (!['yes', 'no'].includes(data.witStatus)) {
    return { valid: false, message: 'Trạng thái WIT không hợp lệ' };
  }
  
  return { valid: true };
}

// ==================== GOOGLE SHEET OPERATIONS ====================

/**
 * Save registration data to Google Sheet
 */
function saveToSheet(data) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    // Create sheet if not exists
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'Họ và Tên',
        'Số Điện Thoại',
        'Email',
        'Telegram Username',
        'Loại Gói',
        'Giá',
        'Trạng thái Thanh toán',
        'Source',
        'Ngày Đăng Ký',
        'Link App Đã Gửi',
        'Ghi Chú'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#667eea');
      headerRange.setFontColor('#ffffff');
    }
    
    // Prepare row data
    const isWitMember = data.witStatus === 'yes';
    const price = isWitMember ? 0 : 999000;
    const packageType = isWitMember ? 'Học viên WIT (FREE)' : 'User thường (999K)';
    const paymentStatus = isWitMember ? 'Miễn phí - Đã xác nhận' : 'Chưa thanh toán';
    
    const rowData = [
      new Date(),                           // Timestamp
      data.fullName,                        // Họ và Tên
      data.phone,                           // Số Điện Thoại
      data.email,                           // Email
      data.telegram,                        // Telegram Username
      packageType,                          // Loại Gói
      price,                                // Giá
      paymentStatus,                        // Trạng thái Thanh toán
      data.source || 'freedom-wallet-landing', // Source
      Utilities.formatDate(new Date(), 'GMT+7', 'dd/MM/yyyy'), // Ngày Đăng Ký
      'Chưa gửi',                          // Link App Đã Gửi
      ''                                    // Ghi Chú
    ];
    
    // Append row
    sheet.appendRow(rowData);
    
    // Get row number
    const lastRow = sheet.getLastRow();
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 12);
    
    // Color code based on package type
    const newRowRange = sheet.getRange(lastRow, 1, 1, 12);
    if (isWitMember) {
      newRowRange.setBackground('#d4edda'); // Light green for WIT members
    } else {
      newRowRange.setBackground('#fff3cd'); // Light yellow for regular users
    }
    
    return lastRow;
    
  } catch (error) {
    Logger.log('Error in saveToSheet: ' + error.toString());
    throw error;
  }
}

/**
 * Get registration statistics
 */
function getRegistrationStats() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) return null;
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  let witMembers = 0;
  let regularUsers = 0;
  let totalRevenue = 0;
  
  rows.forEach(row => {
    const packageType = row[5]; // Loại Gói column
    const price = row[6];       // Giá column
    
    if (packageType.includes('WIT')) {
      witMembers++;
    } else {
      regularUsers++;
      totalRevenue += price;
    }
  });
  
  return {
    total: rows.length,
    witMembers: witMembers,
    regularUsers: regularUsers,
    totalRevenue: totalRevenue
  };
}

// ==================== TELEGRAM NOTIFICATIONS ====================

/**
 * Send Telegram notification to admin
 */
function sendTelegramNotification(data, rowNumber) {
  try {
    const botToken = CONFIG.TELEGRAM_BOT_TOKEN;
    const chatId = CONFIG.TELEGRAM_CHAT_ID;
    
    if (!botToken || botToken === 'YOUR_BOT_TOKEN_HERE') {
      Logger.log('Telegram bot token not configured');
      return;
    }
    
    const isWitMember = data.witStatus === 'yes';
    const packageEmoji = isWitMember ? '🎓' : '💳';
    const packageType = isWitMember ? 'Học viên WIT (FREE)' : 'User thường (999K)';
    
    const message = `
${packageEmoji} *ĐĂNG KÝ MỚI - FREEDOM WALLET*

📋 *Thông tin đăng ký:*
━━━━━━━━━━━━━━━━━━━━
👤 *Họ tên:* ${data.fullName}
📱 *SĐT:* ${data.phone}
📧 *Email:* ${data.email}
💬 *Telegram:* ${data.telegram}

🎯 *Gói đăng ký:* ${packageType}
💰 *Số tiền:* ${isWitMember ? 'MIỄN PHÍ' : '999.000 VNĐ'}
📊 *Row:* #${rowNumber}

📅 *Thời gian:* ${Utilities.formatDate(new Date(), 'GMT+7', 'dd/MM/yyyy HH:mm:ss')}

${!isWitMember ? '⚠️ *Cần xử lý:* Gửi thông tin thanh toán' : '✅ *Học viên WIT:* Gửi link app ngay'}

━━━━━━━━━━━━━━━━━━━━
📊 *Thống kê:* /stats
    `;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    Logger.log('Telegram notification sent: ' + response.getContentText());
    
  } catch (error) {
    Logger.log('Error sending Telegram notification: ' + error.toString());
  }
}

/**
 * Send registration statistics to Telegram
 */
function sendStatsToTelegram() {
  try {
    const stats = getRegistrationStats();
    if (!stats) {
      return 'Chưa có dữ liệu đăng ký';
    }
    
    const message = `
📊 *THỐNG KÊ ĐĂNG KÝ FREEDOM WALLET*

━━━━━━━━━━━━━━━━━━━━
📝 *Tổng đăng ký:* ${stats.total}
🎓 *Học viên WIT:* ${stats.witMembers}
👤 *User thường:* ${stats.regularUsers}

💰 *Doanh thu:* ${formatCurrency(stats.totalRevenue)} VNĐ

━━━━━━━━━━━━━━━━━━━━
📅 *Cập nhật:* ${Utilities.formatDate(new Date(), 'GMT+7', 'dd/MM/yyyy HH:mm:ss')}
    `;
    
    const botToken = CONFIG.TELEGRAM_BOT_TOKEN;
    const chatId = CONFIG.TELEGRAM_CHAT_ID;
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
    
    return message;
    
  } catch (error) {
    Logger.log('Error sending stats: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}

// ==================== EMAIL NOTIFICATIONS ====================

/**
 * Send confirmation email to user
 */
function sendConfirmationEmail(data) {
  try {
    const isWitMember = data.witStatus === 'yes';
    const subject = isWitMember 
      ? '🎉 Chúc mừng! Bạn đã đăng ký thành công Freedom Wallet (MIỄN PHÍ)'
      : '📧 Đăng ký thành công - Thông tin thanh toán Freedom Wallet';
    
    const htmlBody = isWitMember ? getWitMemberEmailTemplate(data) : getRegularUserEmailTemplate(data);
    
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    Logger.log(`Confirmation email sent to: ${data.email}`);
    
  } catch (error) {
    Logger.log('Error sending confirmation email: ' + error.toString());
  }
}

/**
 * Email template for WIT members
 */
function getWitMemberEmailTemplate(data) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .btn { display: inline-block; padding: 15px 30px; background: #FFD700; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
    .highlight { background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Chúc mừng ${data.fullName}!</h1>
      <p>Bạn đã đăng ký thành công Freedom Wallet</p>
    </div>
    
    <div class="content">
      <div class="highlight">
        <strong>🎓 Đặc quyền Học viên WIT:</strong><br>
        Bạn được sử dụng MIỄN PHÍ 100% Freedom Wallet với đầy đủ tính năng!
      </div>
      
      <h2>📋 Thông tin đăng ký của bạn:</h2>
      <ul>
        <li><strong>Họ tên:</strong> ${data.fullName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Telegram:</strong> ${data.telegram}</li>
        <li><strong>Gói:</strong> Học viên WIT (FREE)</li>
      </ul>
      
      <h2>🚀 Các bước tiếp theo:</h2>
      <ol>
        <li><strong>Tham gia nhóm Telegram:</strong> Vào nhóm hỗ trợ để nhận hướng dẫn chi tiết
          <br><a href="${CONFIG.TELEGRAM_GROUP}" class="btn">Tham gia nhóm ngay</a>
        </li>
        <li><strong>Nhận link app:</strong> Chúng tôi sẽ gửi link truy cập app qua Telegram trong 24h</li>
        <li><strong>Hướng dẫn sử dụng:</strong> Mentor sẽ tư vấn 1-1 cách thiết lập 6 Hũ Tiền</li>
        <li><strong>Học nâng cao:</strong> Truy cập khóa học về quản lý tài chính nâng cao</li>
      </ol>
      
      <h2>💡 Lộ trình tiếp theo:</h2>
      <p>Sau khi làm chủ được tài chính với Freedom Wallet, bạn có thể:</p>
      <ul>
        <li>Dành 10-20% từ Hũ Tự Do Tài Chính</li>
        <li>Đăng ký EliroxBot để tiền sinh tiền tự động</li>
        <li>Tham gia đóng góp 10% lợi nhuận cho Quỹ 10 Triệu Trẻ Em</li>
      </ul>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="${CONFIG.TELEGRAM_GROUP}" class="btn">🚀 Bắt đầu ngay</a>
      </p>
    </div>
    
    <div class="footer">
      <p>© 2026 Freedom Wallet by WIT - Giàu Toàn Diện</p>
      <p>Cần hỗ trợ? Liên hệ qua <a href="${CONFIG.TELEGRAM_GROUP}">Telegram</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Email template for regular users
 */
function getRegularUserEmailTemplate(data) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .btn { display: inline-block; padding: 15px 30px; background: #0066FF; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
    .payment-info { background: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Đăng ký thành công!</h1>
      <p>Cảm ơn ${data.fullName} đã đăng ký Freedom Wallet</p>
    </div>
    
    <div class="content">
      <h2>📋 Thông tin đăng ký:</h2>
      <ul>
        <li><strong>Họ tên:</strong> ${data.fullName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Telegram:</strong> ${data.telegram}</li>
        <li><strong>Gói:</strong> Gói Cơ Bản</li>
        <li><strong>Giá:</strong> 999.000 VNĐ</li>
      </ul>
      
      <div class="payment-info">
        <h3>💳 Thông tin thanh toán:</h3>
        <p><strong>Số tiền:</strong> 999.000 VNĐ</p>
        <p><strong>Ngân hàng:</strong> [TÊN NGÂN HÀNG]</p>
        <p><strong>Số tài khoản:</strong> [SỐ TÀI KHOẢN]</p>
        <p><strong>Chủ tài khoản:</strong> [TÊN CHỦ TÀI KHOẢN]</p>
        <p><strong>Nội dung:</strong> FREEDOMWALLET ${data.phone}</p>
      </div>
      
      <h2>🚀 Sau khi thanh toán:</h2>
      <ol>
        <li>Gửi ảnh chụp chuyển khoản qua Telegram: ${CONFIG.TELEGRAM_GROUP}</li>
        <li>Chúng tôi xác nhận trong vòng 2-4 giờ</li>
        <li>Nhận link truy cập Freedom Wallet App</li>
        <li>Tham gia nhóm hỗ trợ và bắt đầu sử dụng</li>
      </ol>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="${CONFIG.TELEGRAM_GROUP}" class="btn">Tham gia nhóm Telegram</a>
      </p>
      
      <p><em>💡 Mẹo: Tham gia khóa học WIT để nhận ưu đãi FREE cho lần đăng ký tiếp theo!</em></p>
    </div>
    
    <div class="footer">
      <p>© 2026 Freedom Wallet by WIT - Giàu Toàn Diện</p>
      <p>Cần hỗ trợ? Liên hệ qua <a href="${CONFIG.TELEGRAM_GROUP}">Telegram</a></p>
    </div>
  </div>
</body>
</html>
  `;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Create API response
 */
function createResponse(success, message, data = {}) {
  const response = {
    status: success ? 'success' : 'error',
    message: message,
    data: data,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Format currency
 */
function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Test function
 */
function testRegistration() {
  const testData = {
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'test@example.com',
    telegram: '@testuser',
    witStatus: 'yes',
    source: 'test'
  };
  
  Logger.log('Testing registration...');
  const rowNumber = saveToSheet(testData);
  Logger.log('Saved to row: ' + rowNumber);
  
  sendTelegramNotification(testData, rowNumber);
  Logger.log('Test completed');
}

/**
 * Setup function - Run this first to create sheet structure
 */
function setupSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    Logger.log('Created new sheet: ' + CONFIG.SHEET_NAME);
  }
  
  // Clear existing content
  sheet.clear();
  
  // Add headers
  const headers = [
    'Timestamp',
    'Họ và Tên',
    'Số Điện Thoại',
    'Email',
    'Telegram Username',
    'Loại Gói',
    'Giá',
    'Trạng thái Thanh toán',
    'Source',
    'Ngày Đăng Ký',
    'Link App Đã Gửi',
    'Ghi Chú'
  ];
  
  sheet.appendRow(headers);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#667eea');
  headerRange.setFontColor('#ffffff');
  headerRange.setHorizontalAlignment('center');
  
  // Set column widths
  sheet.setColumnWidth(1, 150);  // Timestamp
  sheet.setColumnWidth(2, 150);  // Họ và Tên
  sheet.setColumnWidth(3, 120);  // Số Điện Thoại
  sheet.setColumnWidth(4, 200);  // Email
  sheet.setColumnWidth(5, 150);  // Telegram
  sheet.setColumnWidth(6, 180);  // Loại Gói
  sheet.setColumnWidth(7, 100);  // Giá
  sheet.setColumnWidth(8, 150);  // Trạng thái
  sheet.setColumnWidth(9, 120);  // Source
  sheet.setColumnWidth(10, 120); // Ngày
  sheet.setColumnWidth(11, 120); // Link
  sheet.setColumnWidth(12, 200); // Ghi Chú
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  Logger.log('Sheet setup completed!');
}
