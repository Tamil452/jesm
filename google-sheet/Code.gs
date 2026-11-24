// Paste into Extensions > Apps Script of your Google Sheet, then Deploy > New deployment
// > Web app > Execute as: Me, Who has access: Anyone. Copy the /exec URL into script.js.
var SHEET_NAME = 'Enquiries';

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Interested in', 'Message']);
  }
  var p = e.parameter;
  sheet.appendRow([new Date(), p.name || '', p.email || '', p.interest || '', p.message || '']);
  return ContentService.createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
