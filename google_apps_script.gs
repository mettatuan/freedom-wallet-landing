/**
 * ============================================
 * FREEDOM WALLET - REGISTRATION BACKEND
 * Google Apps Script - Production Version
 * ============================================
 * 
 * Xử lý đăng ký từ Landing Page: freedom-wallet-landing
 * 
 * Features:
 * - Thu thập đăng ký FREE và Premium
 * - Lưu vào Google Sheets
 * - Kiểm tra duplicate
 * - Hỗ trợ referral tracking
 * 
 * Created: 2026-02-06
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  SHEET_NAME: 'FreedomWallet_Registrations',
  DEFAULT_STATUS: 'Đã đăng ký',
  TIMEZONE: 'Asia/Ho_Chi_Minh',
  
  // Column mapping (0-based index)
  COLUMNS: {
    DATE: 0,        // A: 📅 Ngày đăng ký
    NAME: 1,        // B: Họ & Tên
    EMAIL: 2,       // C: 📧 Email
    PHONE: 3,       // D: 📞 Điện thoại
    PLAN: 4,        // E: 💎 Gói
    SOURCE: 5,      // F: 📍 Nguồn
    STATUS: 6,      // G: 📊 Trạng thái
    REFERRER: 7     // H: 👥 Người giới thiệu
  },
  
  // Column headers
  HEADERS: [
    '📅 Ngày đăng ký',
    'Họ & Tên',
    '📧 Email',
    '📞 Điện thoại',
    '💎 Gói',
    '📍 Nguồn',
    '📊 Trạng thái',
    '👥 Người giới thiệu'
  ],
  
  // Plan types
  PLANS: {
    FREE: 'FREE',
    PREMIUM: 'Premium'
  },
  
  // Status types
  STATUS: {
    REGISTERED: 'Đã đăng ký',
    PENDING_PAYMENT: 'Chờ thanh toán',
    PAID: 'Đã thanh toán',
    CONFIRMED: 'Đã xác nhận',
    UPGRADED_REFERRAL: 'Nâng cấp FREE (Giới thiệu)'
  }
};

// ============================================
// MAIN HANDLERS
// ============================================

/**
 * Handle GET requests - Test endpoint
 */
function doGet(e) {
  try {
    const params = e.parameter || {};
    
    // Test endpoint
    if (params.test) {
      return createJsonResponse(true, 'Freedom Wallet API is working!', {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        sheetName: CONFIG.SHEET_NAME
      });
    }
    
    // Get registrations count
    const sheet = getOrCreateSheet();
    const totalRegistrations = sheet.getLastRow() - 1; // Exclude header
    
    return createJsonResponse(true, 'Sheet info retrieved', {
      totalRegistrations: totalRegistrations,
      sheetName: sheet.getName(),
      spreadsheetId: SpreadsheetApp.getActiveSpreadsheet().getId()
    });
    
  } catch (error) {
    logError('doGet', error);
    return createJsonResponse(false, 'Server error: ' + error.message);
  }
}

/**
 * Handle POST requests - Add new registration
 */
function doPost(e) {
  try {
    // Parse request data
    const data = parseRequestData(e);
    
    logInfo('doPost', `Received registration: ${JSON.stringify(data)}`);
    
    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      return createJsonResponse(false, validation.message);
    }
    
    // Check for duplicates
    const duplicate = checkDuplicate(data.email, data.phone);
    if (duplicate.exists) {
      return createJsonResponse(false, duplicate.message, {
        duplicate: true,
        existingRow: duplicate.row
      });
    }
    
    // Add to sheet
    const result = addRegistration(data);
    
    if (result.success) {
      const sheet = getOrCreateSheet();
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      
      return createJsonResponse(true, 'Đăng ký thành công! 🎉', {
        rowNumber: result.rowNumber,
        plan: data.plan,
        message: data.plan === CONFIG.PLANS.PREMIUM 
          ? 'Vui lòng chuyển khoản để hoàn tất đăng ký.' 
          : 'Chào mừng bạn đến với Freedom Wallet!',
        spreadsheetUrl: spreadsheet.getUrl()
      });
    } else {
      return createJsonResponse(false, 'Không thể lưu dữ liệu: ' + result.error);
    }
    
  } catch (error) {
    logError('doPost', error);
    return createJsonResponse(false, 'Lỗi hệ thống: ' + error.message);
  }
}

// ============================================
// CORE FUNCTIONS
// ============================================

/**
 * Get or create sheet with proper headers
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  
  // Create sheet if not exists
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    
    // Set headers
    const headerRange = sheet.getRange(1, 1, 1, CONFIG.HEADERS.length);
    headerRange.setValues([CONFIG.HEADERS]);
    
    // Format headers
    headerRange
      .setFontWeight('bold')
      .setBackground('#0F50AD')
      .setFontColor('#ffffff')
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');
    
    // Set header height
    sheet.setRowHeight(1, 40);
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Set column widths
    sheet.setColumnWidth(1, 150);  // Date
    sheet.setColumnWidth(2, 200);  // Name
    sheet.setColumnWidth(3, 220);  // Email
    sheet.setColumnWidth(4, 120);  // Phone
    sheet.setColumnWidth(5, 100);  // Plan
    sheet.setColumnWidth(6, 150);  // Source
    sheet.setColumnWidth(7, 150);  // Status
    sheet.setColumnWidth(8, 150);  // Referrer
    
    logInfo('getOrCreateSheet', `Created new sheet: ${CONFIG.SHEET_NAME}`);
  }
  
  return sheet;
}

/**
 * Parse request data from POST
 */
function parseRequestData(e) {
  try {
    if (!e || !e.postData) {
      throw new Error('No POST data received');
    }
    
    const contentType = e.postData.type;
    const rawContent = e.postData.contents;
    let data;
    
    logInfo('parseRequestData', `Content-Type: ${contentType}`);
    
    // Try to parse as JSON first
    try {
      data = JSON.parse(rawContent);
      logInfo('parseRequestData', 'Parsed as JSON');
    } catch (parseError) {
      // If JSON parsing fails, try form data
      if (e.parameter) {
        data = e.parameter;
        logInfo('parseRequestData', 'Parsed as FormData');
      } else {
        throw new Error('Unable to parse request data');
      }
    }
    
    // Normalize and return data
    return {
      fullName: (data.fullName || data.name || '').trim(),
      email: (data.email || '').trim().toLowerCase(),
      phone: (data.phone || '').trim(),
      plan: (data.plan || CONFIG.PLANS.FREE).trim().toLowerCase(),
      source: (data.source || 'Landing Page').trim(),
      referrer: (data.referrer || data.ref || '').trim()
    };
    
  } catch (error) {
    logError('parseRequestData', error);
    throw new Error('Failed to parse request: ' + error.message);
  }
}

/**
 * Validate input data
 */
function validateInput(data) {
  // Check full name
  if (!data.fullName || data.fullName.length < 2) {
    return { valid: false, message: 'Vui lòng nhập họ tên (tối thiểu 2 ký tự)' };
  }
  
  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, message: 'Email không hợp lệ' };
  }
  
  // Check phone format (Vietnamese phone numbers)
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  if (!data.phone || !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
    return { valid: false, message: 'Số điện thoại không hợp lệ (VD: 0901234567)' };
  }
  
  // Check plan
  const planNormalized = data.plan.toLowerCase();
  if (planNormalized !== 'free' && planNormalized !== 'premium') {
    return { valid: false, message: 'Gói không hợp lệ. Vui lòng chọn FREE hoặc Premium' };
  }
  
  return { valid: true };
}

/**
 * Check for duplicate registrations
 */
function checkDuplicate(email, phone) {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return { exists: false };
    }
    
    // Get all data
    const dataRange = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.length);
    const data = dataRange.getValues();
    
    // Check for duplicate email or phone
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowEmail = row[CONFIG.COLUMNS.EMAIL];
      const rowPhone = row[CONFIG.COLUMNS.PHONE];
      
      if (rowEmail === email) {
        return {
          exists: true,
          message: 'Email này đã được đăng ký. Vui lòng kiểm tra email hoặc liên hệ hỗ trợ.',
          row: i + 2
        };
      }
      
      if (rowPhone === phone) {
        return {
          exists: true,
          message: 'Số điện thoại này đã được đăng ký. Vui lòng kiểm tra lại.',
          row: i + 2
        };
      }
    }
    
    return { exists: false };
    
  } catch (error) {
    logError('checkDuplicate', error);
    return { exists: false }; // Allow registration if check fails
  }
}

/**
 * Add registration to sheet
 */
function addRegistration(data) {
  try {
    const sheet = getOrCreateSheet();
    
    // Normalize plan name
    const planDisplay = data.plan.toLowerCase() === 'premium' 
      ? CONFIG.PLANS.PREMIUM 
      : CONFIG.PLANS.FREE;
    
    // Determine status based on plan
    const status = planDisplay === CONFIG.PLANS.PREMIUM 
      ? CONFIG.STATUS.PENDING_PAYMENT 
      : CONFIG.STATUS.REGISTERED;
    
    // Format date
    const timestamp = Utilities.formatDate(
      new Date(), 
      CONFIG.TIMEZONE, 
      'dd/MM/yyyy HH:mm:ss'
    );
    
    // Prepare row data
    const rowData = [
      timestamp,           // Date
      data.fullName,       // Name
      data.email,          // Email
      data.phone,          // Phone
      planDisplay,         // Plan
      data.source,         // Source
      status,              // Status
      data.referrer || ''  // Referrer
    ];
    
    // Append to sheet
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Format the new row
    formatNewRow(sheet, newRow, planDisplay);
    
    logInfo('addRegistration', `Added row ${newRow}: ${data.fullName} - ${planDisplay}`);
    
    return {
      success: true,
      rowNumber: newRow
    };
    
  } catch (error) {
    logError('addRegistration', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Format new row based on plan
 */
function formatNewRow(sheet, rowNumber, plan) {
  try {
    const range = sheet.getRange(rowNumber, 1, 1, CONFIG.HEADERS.length);
    
    // Alternating row colors for readability
    const bgColor = rowNumber % 2 === 0 ? '#f8f9fa' : '#ffffff';
    range.setBackground(bgColor);
    
    // Highlight Premium plans
    if (plan === CONFIG.PLANS.PREMIUM) {
      const planCell = sheet.getRange(rowNumber, CONFIG.COLUMNS.PLAN + 1);
      planCell
        .setBackground('#FFF9E6')
        .setFontWeight('bold')
        .setFontColor('#E5A21B');
    }
    
    // Bold name column
    const nameCell = sheet.getRange(rowNumber, CONFIG.COLUMNS.NAME + 1);
    nameCell.setFontWeight('bold');
    
    // Align columns
    range.setVerticalAlignment('middle');
    sheet.getRange(rowNumber, CONFIG.COLUMNS.DATE + 1).setHorizontalAlignment('center');
    sheet.getRange(rowNumber, CONFIG.COLUMNS.PLAN + 1).setHorizontalAlignment('center');
    sheet.getRange(rowNumber, CONFIG.COLUMNS.STATUS + 1).setHorizontalAlignment('center');
    
  } catch (error) {
    logError('formatNewRow', error);
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create JSON response
 */
function createJsonResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Log info message
 */
function logInfo(functionName, message) {
  console.log(`[INFO][${functionName}] ${message}`);
}

/**
 * Log error message
 */
function logError(functionName, error) {
  console.error(`[ERROR][${functionName}] ${error.message || error}`);
  console.error(error.stack);
}

// ============================================
// UTILITY FUNCTIONS FOR MANUAL MANAGEMENT
// ============================================

/**
 * Update status of a registration by email
 * Can be called manually from Apps Script editor
 */
function updateStatusByEmail(email, newStatus) {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return { success: false, message: 'No registrations found' };
    }
    
    const dataRange = sheet.getRange(2, 1, lastRow - 1, CONFIG.HEADERS.length);
    const data = dataRange.getValues();
    
    for (let i = 0; i < data.length; i++) {
      if (data[i][CONFIG.COLUMNS.EMAIL] === email.toLowerCase()) {
        const rowNumber = i + 2;
        sheet.getRange(rowNumber, CONFIG.COLUMNS.STATUS + 1).setValue(newStatus);
        
        logInfo('updateStatusByEmail', `Updated row ${rowNumber}: ${email} -> ${newStatus}`);
        return { 
          success: true, 
          message: `Updated status for ${email}`,
          row: rowNumber 
        };
      }
    }
    
    return { success: false, message: `Email ${email} not found` };
    
  } catch (error) {
    logError('updateStatusByEmail', error);
    return { success: false, message: error.message };
  }
}

/**
 * Count registrations by plan
 * Can be called manually from Apps Script editor
 */
function getRegistrationStats() {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return { free: 0, premium: 0, total: 0 };
    }
    
    const planColumn = sheet.getRange(2, CONFIG.COLUMNS.PLAN + 1, lastRow - 1, 1).getValues();
    
    let freeCount = 0;
    let premiumCount = 0;
    
    for (let i = 0; i < planColumn.length; i++) {
      const plan = planColumn[i][0];
      if (plan === CONFIG.PLANS.FREE) {
        freeCount++;
      } else if (plan === CONFIG.PLANS.PREMIUM) {
        premiumCount++;
      }
    }
    
    const stats = {
      free: freeCount,
      premium: premiumCount,
      total: freeCount + premiumCount,
      limit: 1000,
      remaining: Math.max(0, 1000 - freeCount)
    };
    
    Logger.log(JSON.stringify(stats, null, 2));
    return stats;
    
  } catch (error) {
    logError('getRegistrationStats', error);
    return null;
  }
}

/**
 * Initialize or reset sheet (CAREFUL - deletes data!)
 * Uncomment and run manually if needed
 */
// function resetSheet() {
//   const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//   const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
//   
//   if (sheet) {
//     spreadsheet.deleteSheet(sheet);
//   }
//   
//   getOrCreateSheet();
//   Logger.log('Sheet reset complete');
// }
