// ======= Date JS =======

// ======= API Initialization =======
gapi.load("client:auth2", function () {});

function _loadClient() {
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
    .then(function () {},
      function (err) {
        _logger(ERROR, "Error trying to load client from Google Sheets API " + err);
      });
}

// ======= Dados =======
function _getSheetDataSingle() {
  return gapi.client.sheets.spreadsheets.values.get({
      "spreadsheetId": DATA_SHEET_ID,
      "range": DATA_SHEET_RANGE,
      "dateTimeRenderOption": "SERIAL_NUMBER",
      "majorDimension": "DIMENSION_UNSPECIFIED",
      "valueRenderOption": "FORMATTED_VALUE"
    })
    .then(function (response) {
        SHEET_DATA = response.result.values;
      },
      function (err) {
        _logSheetsApiError(err, "SHEET_DATA");
      });
}

function _getSheetDataBatch() {
  return gapi.client.sheets.spreadsheets.values.batchGet({
    "spreadsheetId": SHEET_ID,
    "dateTimeRenderOption": "SERIAL_NUMBER",
    "majorDimension": "ROWS",
    "ranges": MAIN_RANGES_ARRAY,
    "valueRenderOption": "FORMATTED_VALUE"
  })
  .then(function (response) {
      SHEET_DATA = response.result.valueRanges;
    },
    function (err) {
      _logSheetsApiError(err,"SHEET_DATA");
    });
}

function _getSheetPlaces() {
  if (IS_PLACES_ACTIVE) {
    return gapi.client.sheets.spreadsheets.values.batchGet({
        "spreadsheetId": PLACES_SHEET_ID,
        "dateTimeRenderOption": "SERIAL_NUMBER",
        "majorDimension": "COLUMNS",
        "ranges": PLACES_RANGES_ARRAY,
        "valueRenderOption": "FORMATTED_VALUE"
      })
      .then(function (response) {
          P_DATA = response.result.valueRanges;
        },
        function (err) {
          _logSheetsApiError(err, "P_DATA");
        });
  }
}

// ======= Hyperlinks =======
function _getSheetHyperlinks() {
  if (IS_PLACES_ACTIVE) {
    return gapi.client.sheets.spreadsheets.get({
        "spreadsheetId": PLACES_SHEET_ID,
        "includeGridData": true,
        "ranges": HYPERLINK_RANGES_ARRAY,
        "fields": "sheets/data/rowData/values/hyperlink"
      })
      .then(function (response) {
          HYPERLINK = response.result.sheets[0].data;
          _getPResult();
        },
        function (err) {
          _logSheetsApiError(err, "P_HYPERLINK");
        });
  }
}