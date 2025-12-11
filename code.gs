/************************************************************
  CONFIG
*************************************************************/
const MASTER_SHEET_ID = "19y2iw63ZTVCu8XfRT0EA4sCxblBf1FhgIy70ZLypQkk";

const PARTICIPANT_SHEETS = ["Aigenix", "Cellestro", "Incepta", "Synkron"];

const FINAL_INDEX_SHEET = "Certificate Index";

const CERT_FOLDERS = {
  "Winner":      "1VV0_anPuAJHI8andOLYZGLn0bDvSY16I",
  "Competition": "1_ZzZWOcBbQzy5F7jS1fgUhAZl66zIT-f",
  "Workshop":    "1PbkarjRVCRWKezjPxl4Ot20ULcwjrKA5"
};


/************************************************************
  NORMALIZATION (CORE FIX)
*************************************************************/
function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[()]/g, "")
    .replace(/-\s+/g, "-")
    .trim();
}


/************************************************************
  STEP 1 — Scan All Certificates (Case-insensitive)
*************************************************************/
function scanCertificates() {
  let certMap = {}; 
  let errors = [];

  for (let category in CERT_FOLDERS) {
    try {
      const root = DriveApp.getFolderById(CERT_FOLDERS[category]);
      scanFolderRecursive(root, category, certMap);
    } catch (e) {
      errors.push(`Error scanning ${category}: ${e.message}`);
      Logger.log(errors[errors.length - 1]);
    }
  }

  Logger.log(`Scanned ${Object.keys(certMap).length} normalized certificate names`);
  return certMap;
}

function scanFolderRecursive(folder, category, certMap) {
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();

    // normalize file name
    const cleanName = normalizeName(
      file.getName().replace(/\.[^/.]+$/, "")
    );

    const url = `https://drive.google.com/uc?export=download&id=${file.getId()}`;

    if (!certMap[cleanName]) {
      certMap[cleanName] = { winner: null, competition: null, workshop: null };
    }

    certMap[cleanName][category.toLowerCase()] = url;
  }

  const subs = folder.getFolders();
  while (subs.hasNext()) {
    scanFolderRecursive(subs.next(), category, certMap);
  }
}


/************************************************************
  STEP 2 — Read All Participants (Exact name preserved)
*************************************************************/
function buildStudentBase() {
  const ss = SpreadsheetApp.openById(MASTER_SHEET_ID);
  let students = {};  
  let duplicates = [];

  PARTICIPANT_SHEETS.forEach(sheetName => {
    const sh = ss.getSheetByName(sheetName);
    if (!sh) {
      Logger.log(`Warning: Sheet "${sheetName}" not found`);
      return;
    }

    const data = sh.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      const rawName = (data[i][0] || "").trim();
      if (!rawName) continue;

      const key = normalizeName(rawName);

      if (students[key]) {
        duplicates.push(`${rawName} (in ${sheetName})`);
        continue;
      }

      students[key] = {
        displayName: rawName,
        phone: String(data[i][1] || "").trim(),
        email: String(data[i][2] || "").trim(),
        track: sheetName,
        ticketId: String(data[i][11] || "").trim(),
        winner: null,
        competition: null,
        workshop: null
      };
    }
  });

  Logger.log(`Loaded ${Object.keys(students).length} normalized students`);
  return students;
}


/************************************************************
  STEP 3 — Build Final Index Sheet (with reporting)
*************************************************************/
function buildFinalIndex() {
  const ss = SpreadsheetApp.openById(MASTER_SHEET_ID);
  let sh = ss.getSheetByName(FINAL_INDEX_SHEET);

  if (!sh) sh = ss.insertSheet(FINAL_INDEX_SHEET);

  sh.clear();

  const headerRange = sh.getRange(1, 1, 1, 8);
  headerRange.setValues([[
    "Name",
    "Phone",
    "Email",
    "Track",
    "Ticket ID",
    "Winner URL",
    "Competition URL",
    "Workshop URL"
  ]]);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#4285f4");
  headerRange.setFontColor("#ffffff");

  const students = buildStudentBase();
  const certs = scanCertificates();

  let matched = 0;
  let unmatchedStudents = [];

  Object.keys(students).forEach(key => {
    if (certs[key]) {
      students[key].winner      = certs[key].winner;
      students[key].competition = certs[key].competition;
      students[key].workshop    = certs[key].workshop;
      matched++;
    } else {
      unmatchedStudents.push(students[key].displayName);
    }
  });

  const rows = Object.keys(students).map(key => {
    const s = students[key];
    return [
      s.displayName,
      s.phone,
      s.email,
      s.track,
      s.ticketId,
      s.winner || "",
      s.competition || "",
      s.workshop || ""
    ];
  });

  if (rows.length > 0) {
    sh.getRange(2, 1, rows.length, 8).setValues(rows);

    for (let i = 1; i <= 8; i++) {
      sh.autoResizeColumn(i);
    }
  }

  const report = 
    `✅ Final Index Built Successfully\n\n` +
    `📊 Statistics:\n` +
    `• Total Students: ${rows.length}\n` +
    `• Certificates Matched: ${matched}\n` +
    `• Students Without Certificates: ${unmatchedStudents.length}\n`;

  Logger.log(report);
  return report;
}


/************************************************************
  STEP 4 — Public API (Search by phone/email/ticket)
*************************************************************/
function doGet(e) {
  try {
    const mode = e.parameter.mode || "";
    const q = normalizeName(e.parameter.q || "");

    if (mode === "reindex") {
      const msg = buildFinalIndex();
      return ContentService.createTextOutput(msg);
    }

    if (mode === "byTrack") {
      const track = (e.parameter.track || "").toLowerCase().trim();
      const ss = SpreadsheetApp.openById(MASTER_SHEET_ID);
      const sh = ss.getSheetByName(FINAL_INDEX_SHEET);
      if (!sh) return jsonError("Index not built.");

      const data = sh.getDataRange().getValues();
      let matches = [];

      for (let i = 1; i < data.length; i++) {
        // Col 3 (Index 3) is Track. Normalized comparison.
        const rowTrack = String(data[i][3]).toLowerCase().trim();
        
        if (rowTrack === track) {
          matches.push({
            name: data[i][0],
            ticketId: data[i][4]
          });
        }
      }

      // Sort alphabetically by name
      matches.sort((a, b) => a.name.localeCompare(b.name));

      return jsonSuccess({ participants: matches });
    }

    if (mode === "download") {
      try {
        const id = e.parameter.id;
        if (!id) return jsonError("Missing file ID");
        
        const file = DriveApp.getFileById(id);
        const blob = file.getBlob();
        const base64 = Utilities.base64Encode(blob.getBytes());
        
        return jsonSuccess({
          fileData: base64,
          mimeType: blob.getContentType(),
          fileName: file.getName()
        });
      } catch (err) {
        return jsonError("Download failed: " + err.toString());
      }
    }

    if (mode === "certs") {
      const ss = SpreadsheetApp.openById(MASTER_SHEET_ID);
      const sh = ss.getSheetByName(FINAL_INDEX_SHEET);
      if (!sh) {
        return jsonError("Index not built. Run reindex first.");
      }

      const data = sh.getDataRange().getValues();

      for (let i = 1; i < data.length; i++) {
        const phone    = normalizeName(data[i][1]);
        const email    = normalizeName(data[i][2]);
        const ticketId = normalizeName(data[i][4]);

        if (phone.includes(q) || email.includes(q) || ticketId.includes(q)) {
          return jsonSuccess({
            name: data[i][0],
            phone: data[i][1],
            email: data[i][2],
            track: data[i][3],
            ticketId: data[i][4],
            winner: data[i][5] || null,
            competition: data[i][6] || null,
            workshop: data[i][7] || null
          });
        }
      }

      return jsonError("No matching participant found");
    }

    return jsonError("Invalid 'mode' parameter");

  } catch (err) {
    Logger.log("API ERROR: " + err.message);
    return jsonError("Server error occurred");
  }
}

function jsonError(msg) {
  return ContentService.createTextOutput(JSON.stringify({ success: false, error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonSuccess(obj) {
  return ContentService.createTextOutput(JSON.stringify({ success: true, ...obj }))
    .setMimeType(ContentService.MimeType.JSON);
}


/************************************************************
  STEP 5 — Menu System
*************************************************************/
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🎫 Certificate Tools")
    .addItem("⚡ Build Final Index", "buildFinalIndexUI")
    .addItem("📄 Scan Certificates Only", "scanCertificatesMessage")
    .addItem("📊 Count Participants", "debugCount")
    .addSeparator()
    .addItem("🔗 Show API URL", "showAPIUrl")
    .addItem("❗ Help", "showHelp")
    .addToUi();
}

function buildFinalIndexUI() {
  const ui = SpreadsheetApp.getUi();
  ui.alert("Building index... Click OK to continue.");
  const msg = buildFinalIndex();
  ui.alert("Completed", msg, ui.ButtonSet.OK);
}

function scanCertificatesMessage() {
  const certs = scanCertificates();
  SpreadsheetApp.getUi().alert(`Scan complete.\nFound ${Object.keys(certs).length} certificate names.`);
}

function debugCount() {
  const base = buildStudentBase();
  SpreadsheetApp.getUi().alert("Total unique students: " + Object.keys(base).length);
}

function showAPIUrl() {
  const url = ScriptApp.getService().getUrl();
  SpreadsheetApp.getUi().alert(
    "API URL:\n\n" +
    url +
    "\n\nUse:\n?mode=certs&q=PHONE_OR_EMAIL_OR_TICKET\n?mode=reindex"
  );
}

function showHelp() {
  SpreadsheetApp.getUi().alert(
    "Certificate System Usage:\n\n" +
    "• Build Final Index — Full rebuild.\n" +
    "• Scan Certificates — Updates file metadata.\n" +
    "• Count Participants — Quick student count.\n" +
    "• Show API URL — Get your endpoint.\n\n" +
    "Search supports phone, email, and ticket ID.\n"
  );
}
