/**
 * ============================================
 * FREEDOM WALLET - KANBAN ROADMAP BACKEND
 * Google Apps Script - Addon for Features Management
 * ============================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Mở Google Sheet đang dùng cho registrations
 * 2. Extensions → Apps Script
 * 3. Copy toàn bộ code này vào file mới hoặc thêm vào cuối file google_apps_script.gs hiện tại
 * 4. Tạo sheet mới tên "Roadmap_Features" với cấu trúc sau:
 *    | ID | Timestamp | Email | Title | Description | Type | Status | Votes |
 * 5. Tạo sheet mới tên "Feature_Votes" với cấu trúc sau:
 *    | Timestamp | FeatureID | Email |
 * 6. Deploy lại Apps Script
 * 
 * Created: 2026-02-16
 */

// ============================================
// KANBAN CONFIGURATION
// ============================================

const KANBAN_CONFIG = {
  FEATURES_SHEET: 'Roadmap_Features',
  VOTES_SHEET: 'Feature_Votes',
  
  // Features sheet columns (0-based)
  FEATURES_COLUMNS: {
    ID: 0,           // A: ID (unique)
    TIMESTAMP: 1,    // B: Timestamp
    EMAIL: 2,        // C: Email người đề xuất
    TITLE: 3,        // D: Tên tính năng
    DESCRIPTION: 4,  // E: Mô tả
    TYPE: 5,         // F: Loại (FEATURE/IMPROVEMENT/BUGFIX)
    STATUS: 6,       // G: Trạng thái (TODO/IN PROGRESS/IN REVIEW/DONE)
    VOTES: 7         // H: Số vote
  },
  
  FEATURES_HEADERS: [
    'ID',
    'Timestamp',
    'Email',
    'Title',
    'Description',
    'Type',
    'Status',
    'Votes'
  ],
  
  // Votes sheet columns
  VOTES_COLUMNS: {
    TIMESTAMP: 0,    // A: Timestamp
    FEATURE_ID: 1,   // B: Feature ID
    EMAIL: 2         // C: Email người vote
  },
  
  VOTES_HEADERS: [
    'Timestamp',
    'Feature ID',
    'Email'
  ],
  
  TYPES: {
    FEATURE: 'FEATURE',
    IMPROVEMENT: 'IMPROVEMENT',
    BUGFIX: 'BUGFIX'
  },
  
  STATUSES: {
    BACKLOG: 'BACKLOG',
    TODO: 'TODO',
    IN_PROGRESS: 'IN PROGRESS',
    IN_REVIEW: 'IN REVIEW',
    DONE: 'DONE'
  }
};

// ============================================
// SHEET HELPERS FOR KANBAN
// ============================================

/**
 * Get or create Features sheet
 */
function getOrCreateFeaturesSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(KANBAN_CONFIG.FEATURES_SHEET);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(KANBAN_CONFIG.FEATURES_SHEET);
    
    // Set headers
    const headerRange = sheet.getRange(1, 1, 1, KANBAN_CONFIG.FEATURES_HEADERS.length);
    headerRange.setValues([KANBAN_CONFIG.FEATURES_HEADERS]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
    
    // Format columns
    sheet.setColumnWidth(1, 120);  // ID
    sheet.setColumnWidth(2, 150);  // Timestamp
    sheet.setColumnWidth(3, 200);  // Email
    sheet.setColumnWidth(4, 250);  // Title
    sheet.setColumnWidth(5, 400);  // Description
    sheet.setColumnWidth(6, 120);  // Type
    sheet.setColumnWidth(7, 120);  // Status
    sheet.setColumnWidth(8, 80);   // Votes
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    Logger.log('✅ Created Features sheet');
    
    // Add sample features
    addSampleFeatures(sheet);
  }
  
  return sheet;
}

/**
 * Get or create Votes sheet
 */
function getOrCreateVotesSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(KANBAN_CONFIG.VOTES_SHEET);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(KANBAN_CONFIG.VOTES_SHEET);
    
    // Set headers
    const headerRange = sheet.getRange(1, 1, 1, KANBAN_CONFIG.VOTES_HEADERS.length);
    headerRange.setValues([KANBAN_CONFIG.VOTES_HEADERS]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#34A853');
    headerRange.setFontColor('#FFFFFF');
    
    // Format columns
    sheet.setColumnWidth(1, 150);  // Timestamp
    sheet.setColumnWidth(2, 120);  // Feature ID
    sheet.setColumnWidth(3, 200);  // Email
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    Logger.log('✅ Created Votes sheet');
  }
  
  return sheet;
}

/**
 * Add sample features for demo
 * Updated 2026-02-16: Now using REAL features from changelog.md
 */
function addSampleFeatures(sheet) {
  const samples = [
    // ============================================
    // DONE - Completed features from changelog.md
    // ============================================
    ['FW_V3.2.1', '2026-01-16T00:00:00Z', 'admin@freedomwallet.app', 'v3.2.1: Mobile Asset Price Updates', 'Sửa lỗi cập nhật giá tài sản trên mobile, validation ngày mua format DD/MM/YYYY', 'BUGFIX', 'DONE', 0],
    ['FW_V3.2.0', '2026-01-15T00:00:00Z', 'admin@freedomwallet.app', 'v3.2.0: Core Infrastructure', 'Constants, Logger, ErrorHandler modules + API caching + 12 module updates', 'FEATURE', 'DONE', 0],
    ['FW_V3.1.0', '2026-01-15T00:00:00Z', 'admin@freedomwallet.app', 'v3.1.0: Cache System & 6 Jars', 'Multi-level cache (Script/User/Doc), Jars popup, DebtsSyncOptimizer, account filters', 'FEATURE', 'DONE', 0],
    ['FW_V3.0.0', '2025-11-01T00:00:00Z', 'admin@freedomwallet.app', 'v3.0.0: Major Modules', 'Assets, Investments, Debts, 6 Jars, Dashboard - các module chính hoàn chỉnh', 'FEATURE', 'DONE', 0],
    ['FW_V2.0.0', '2025-08-01T00:00:00Z', 'admin@freedomwallet.app', 'v2.0.0: Transactions CRUD', 'Module giao dịch cơ bản với CRUD operations đầy đủ', 'FEATURE', 'DONE', 0],
    ['FW_BOT_V1', '2026-01-10T00:00:00Z', 'admin@freedomwallet.app', 'Telegram Bot v1.0', 'Bot hỗ trợ 24/7 với GPT-4, knowledge base, tutorials, troubleshooting, 6 Jars tips', 'FEATURE', 'DONE', 0],
    
    // ============================================
    // BACKLOG - Community suggestions waiting for review
    // ============================================
    ['FW004', new Date().toISOString(), 'user@example.com', 'Kết nối ngân hàng tự động', 'Tự động sync giao dịch từ tài khoản ngân hàng qua API', 'FEATURE', 'BACKLOG', 15],
    ['FW005', new Date().toISOString(), 'user@example.com', 'Scan hóa đơn bằng AI', 'Chụp ảnh hóa đơn → AI OCR tự động thêm giao dịch', 'FEATURE', 'BACKLOG', 8],
    ['FW006', new Date().toISOString(), 'user@example.com', 'Mobile App iOS/Android', 'Ứng dụng mobile native cho iOS và Android', 'FEATURE', 'BACKLOG', 23],
    ['FW007', new Date().toISOString(), 'user@example.com', 'Dự báo chi tiêu AI', 'AI phân tích và dự đoán xu hướng chi tiêu, cảnh báo budget', 'FEATURE', 'BACKLOG', 12],
    ['FW008', new Date().toISOString(), 'user@example.com', 'Quản lý tài chính gia đình', 'Chia sẻ và quản lý ngân sách chung với nhiều thành viên', 'FEATURE', 'BACKLOG', 18],
    ['FW009', new Date().toISOString(), 'user@example.com', 'Export báo cáo PDF/Excel', 'Xuất báo cáo tài chính chi tiết dạng PDF/Excel', 'IMPROVEMENT', 'BACKLOG', 6],
    ['FW010', new Date().toISOString(), 'user@example.com', 'Dark mode cho webapp', 'Chế độ tối để bảo vệ mắt khi dùng ban đêm', 'IMPROVEMENT', 'BACKLOG', 9]
  ];
  
  sheet.getRange(2, 1, samples.length, samples[0].length).setValues(samples);
  Logger.log(`✅ Added ${samples.length} features (6 DONE from changelog + 7 BACKLOG community suggestions)`);
}

// ============================================
// UPDATED HANDLERS (Thêm vào doGet/doPost hiện tại)
// ============================================

/**
 * THÊM VÀO FUNCTION doGet() HIỆN TẠI
 * Đặt code này TRƯỚC return statement cuối cùng trong doGet()
 */
function handleKanbanGetRequests(params) {
  // Get all features
  if (params.action === 'getFeatures') {
    try {
      const sheet = getOrCreateFeaturesSheet();
      const lastRow = sheet.getLastRow();
      
      if (lastRow <= 1) {
        return createJsonResponse(true, 'No features found', []);
      }
      
      const data = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
      
      const features = data.map(row => ({
        id: row[0],
        timestamp: row[1],
        email: row[2],
        title: row[3],
        description: row[4],
        type: row[5],
        status: row[6],
        votes: row[7]
      }));
      
      return createJsonResponse(true, 'Features loaded', features);
      
    } catch (error) {
      logError('getFeatures', error);
      return createJsonResponse(false, 'Error loading features: ' + error.message);
    }
  }
}

/**
 * THÊM VÀO FUNCTION doPost() HIỆN TẠI
 * Đặt code này SAU parseRequestData() nhưng TRƯỚC validation
 */
function handleKanbanPostRequests(data) {
  // Add new feature
  if (data.action === 'addFeature') {
    try {
      const sheet = getOrCreateFeaturesSheet();
      
      // Generate unique ID
      const lastRow = sheet.getLastRow();
      const nextId = `FW${String(lastRow).padStart(3, '0')}`;
      
      // Validate input
      if (!data.email || !data.title || !data.description || !data.type) {
        return createJsonResponse(false, 'Missing required fields');
      }
      
      // Add to sheet
      const newRow = [
        nextId,
        data.timestamp || new Date().toISOString(),
        data.email,
        data.title,
        data.description,
        data.type,
        data.status || KANBAN_CONFIG.STATUSES.BACKLOG,  // User submissions go to BACKLOG first
        0  // Initial votes
      ];
      
      sheet.appendRow(newRow);
      
      logInfo('addFeature', `Added feature: ${data.title} by ${data.email}`);
      
      return createJsonResponse(true, 'Feature added successfully', {
        id: nextId,
        title: data.title
      });
      
    } catch (error) {
      logError('addFeature', error);
      return createJsonResponse(false, 'Error adding feature: ' + error.message);
    }
  }
  
  // Vote for feature
  if (data.action === 'voteFeature') {
    try {
      const featureSheet = getOrCreateFeaturesSheet();
      const voteSheet = getOrCreateVotesSheet();
      
      // Validate input
      if (!data.featureId || !data.email) {
        return createJsonResponse(false, 'Missing feature ID or email');
      }
      
      // Check if user already voted
      const voteData = voteSheet.getRange(2, 1, voteSheet.getLastRow() - 1, 3).getValues();
      const alreadyVoted = voteData.some(row => 
        row[1] === data.featureId && row[2] === data.email
      );
      
      if (alreadyVoted) {
        return createJsonResponse(false, 'You have already voted for this feature');
      }
      
      // Find feature and increment vote count
      const featureData = featureSheet.getRange(2, 1, featureSheet.getLastRow() - 1, 8).getValues();
      let featureRowIndex = -1;
      
      for (let i = 0; i < featureData.length; i++) {
        if (featureData[i][0] === data.featureId) {
          featureRowIndex = i + 2; // +2 because of header and 1-based indexing
          break;
        }
      }
      
      if (featureRowIndex === -1) {
        return createJsonResponse(false, 'Feature not found');
      }
      
      // Increment vote count
      const currentVotes = featureSheet.getRange(featureRowIndex, KANBAN_CONFIG.FEATURES_COLUMNS.VOTES + 1).getValue();
      featureSheet.getRange(featureRowIndex, KANBAN_CONFIG.FEATURES_COLUMNS.VOTES + 1).setValue(currentVotes + 1);
      
      // Record vote
      voteSheet.appendRow([
        data.timestamp || new Date().toISOString(),
        data.featureId,
        data.email
      ]);
      
      logInfo('voteFeature', `Vote recorded: ${data.email} voted for ${data.featureId}`);
      
      return createJsonResponse(true, 'Vote recorded successfully', {
        featureId: data.featureId,
        newVoteCount: currentVotes + 1
      });
      
    } catch (error) {
      logError('voteFeature', error);
      return createJsonResponse(false, 'Error recording vote: ' + error.message);
    }
  }
}

// ============================================
// HƯỚNG DẪN TÍCH HỢP
// ============================================

/**
 * BƯỚC 1: Sửa function doGet() hiện tại
 * 
 * Tìm dòng:
 *   const params = e.parameter || {};
 * 
 * Thêm NGAY SAU dòng đó:
 *   // Handle Kanban requests
 *   if (params.action === 'getFeatures') {
 *     return handleKanbanGetRequests(params);
 *   }
 */

/**
 * BƯỚC 2: Sửa function doPost() hiện tại
 * 
 * Tìm dòng:
 *   const data = parseRequestData(e);
 * 
 * Thêm NGAY SAU dòng đó:
 *   // Handle Kanban requests
 *   if (data.action === 'addFeature' || data.action === 'voteFeature') {
 *     return handleKanbanPostRequests(data);
 *   }
 */

/**
 * BƯỚC 3: Deploy lại Apps Script
 * 1. Click "Deploy" → "Manage deployments"
 * 2. Click icon ⚙️ bên cạnh "Active deployment"
 * 3. Chọn "New version"
 * 4. Click "Deploy"
 * 5. Copy URL mới (hoặc giữ URL cũ)
 */

/**
 * TEST FUNCTIONS (Chạy thủ công để test)
 */

function testCreateSheets() {
  getOrCreateFeaturesSheet();
  getOrCreateVotesSheet();
  Logger.log('✅ Sheets created successfully!');
}

function testGetFeatures() {
  const result = handleKanbanGetRequests({ action: 'getFeatures' });
  Logger.log(result.getContent());
}

function testAddFeature() {
  const result = handleKanbanPostRequests({
    action: 'addFeature',
    email: 'test@example.com',
    title: 'Test Feature',
    description: 'This is a test feature',
    type: 'FEATURE',
    status: 'TODO',
    timestamp: new Date().toISOString()
  });
  Logger.log(result.getContent());
}

function testVoteFeature() {
  const result = handleKanbanPostRequests({
    action: 'voteFeature',
    featureId: 'FW004',
    email: 'voter@example.com',
    timestamp: new Date().toISOString()
  });
  Logger.log(result.getContent());
}
