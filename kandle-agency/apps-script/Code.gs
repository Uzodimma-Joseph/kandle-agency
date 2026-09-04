/**
 * Kandle Business Agency — Apps Script backend.
 *
 * Bind this script to the Kandle-Data-Model Google Sheet (Extensions >
 * Apps Script from inside the Sheet itself — that way SpreadsheetApp
 * .getActiveSpreadsheet() just works, no Sheet ID to configure) and deploy
 * it as a Web App. One deployment URL backs the public contact form AND
 * the whole admin panel (leads, projects, media, site content).
 *
 * SETUP
 * 1. Open the Kandle-Data-Model Google Sheet.
 * 2. Extensions > Apps Script. Delete the default Code.gs content, paste
 *    this whole file in.
 * 3. Set TOKEN below to any password-like string of your choosing.
 * 4. Deploy > New deployment > type "Web app". Execute as "Me", Who has
 *    access "Anyone". Deploy, authorize when prompted, copy the URL
 *    (ends in /exec).
 * 5. In the React app's .env: VITE_ADMIN_API_URL=<that URL>,
 *    VITE_ADMIN_API_TOKEN=<the same TOKEN you set below>. Rebuild/redeploy
 *    the site.
 * 6. If you edit this file later, you must create a New Deployment (not
 *    just save) for changes to go live at the same URL — "Manage
 *    deployments > Edit > New version" also works and keeps the URL
 *    stable.
 *
 * SECURITY NOTE
 * TOKEN is a shared secret checked on every write, not real
 * authentication — it stops casual/accidental misuse, not a determined
 * attacker (it's visible in the deployed site's JS bundle, like any
 * VITE_ variable). That's an acceptable tradeoff for an internal admin
 * tool at this stage; don't use this pattern for anything storing
 * sensitive customer data beyond what's already in the brief.
 */

const TOKEN = "kanHKDshd8y389hdsjkbHKne980JOBNIKddle";

const SHEETS = {
  LEADS: "LEADS",
  LEAD_NOTES: "LEAD_NOTES",
  PROJECTS: "PROJECTS",
  PROJECT_RESULTS: "PROJECT_RESULTS",
  MEDIA: "MEDIA",
  SETTINGS: "SETTINGS",
  STATS: "STATS",
};

// Media uploads are saved into a Drive folder named this, created
// automatically on first upload (inside "My Drive").
const MEDIA_FOLDER_NAME = "Kandle Website Media";

// ---------------------------------------------------------------------------
// Column definitions — must match the Kandle-Data-Model.xlsx headers
// exactly, automation_access included. [sheetColumn, frontendKey, type]
// type: "string" | "number" | "boolean"
// ---------------------------------------------------------------------------

const LEAD_COLUMNS = [
  ["id", "id", "string"],
  ["name", "name", "string"],
  ["email", "email", "string"],
  ["company", "company", "string"],
  ["phone", "phone", "string"],
  ["service", "service", "string"],
  ["budget", "budget", "string"],
  ["timeline", "timeline", "string"],
  ["message", "message", "string"],
  ["status", "status", "string"],
  ["source", "source", "string"],
  ["created_at", "createdAt", "string"],
  ["updated_at", "updatedAt", "string"],
  ["last_contacted", "lastContacted", "string"],
  ["next_followup", "nextFollowup", "string"],
  ["automation_access", "automationAccess", "string"],
];

const LEAD_NOTE_COLUMNS = [
  ["id", "id", "string"],
  ["lead_id", "leadId", "string"],
  ["body", "body", "string"],
  ["created_at", "createdAt", "string"],
  ["automation_access", "automationAccess", "string"],
];

const PROJECT_COLUMNS = [
  ["id", "id", "string"],
  ["title", "title", "string"],
  ["slug", "slug", "string"],
  ["client", "client", "string"],
  ["category", "category", "string"],
  ["description", "description", "string"],
  ["year", "year", "string"],
  ["featured", "featured", "boolean"],
  ["display_order", "displayOrder", "number"],
  ["cover_image", "coverImage", "string"],
  ["size", "size", "string"],
  ["status", "status", "string"],
  ["overview", "overview", "string"],
  ["challenge", "challenge", "string"],
  ["approach", "approach", "string"],
  ["solution", "solution", "string"],
  ["created_at", "createdAt", "string"],
  ["updated_at", "updatedAt", "string"],
  ["automation_access", "automationAccess", "string"],
];

const PROJECT_RESULT_COLUMNS = [
  ["id", "id", "string"],
  ["project_id", "projectId", "string"],
  ["label", "label", "string"],
  ["value", "value", "string"],
  ["automation_access", "automationAccess", "string"],
];

const MEDIA_COLUMNS = [
  ["id", "id", "string"],
  ["filename", "filename", "string"],
  ["url", "url", "string"],
  ["type", "type", "string"],
  ["project_id", "projectId", "string"],
  ["folder", "folder", "string"],
  ["created_at", "createdAt", "string"],
  ["automation_access", "automationAccess", "string"],
];

// SETTINGS is key/value, handled separately (see settingsToObject / below).
// STATS is a small fixed list, read/written wholesale (see getStats/saveStats).

// ---------------------------------------------------------------------------
// Generic sheet <-> object helpers
// ---------------------------------------------------------------------------

function getSheet_(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet) throw new Error("Missing sheet tab: " + name);
  return sheet;
}

function readRows_(sheet, columns) {
  const values = sheet.getDataRange().getValues();
  const header = values[0];
  const headerIndex = {};
  header.forEach((h, i) => (headerIndex[String(h).trim()] = i));

  const rows = [];
  for (let r = 1; r < values.length; r++) {
    const raw = values[r];
    if (raw.every((c) => c === "")) continue; // skip blank rows
    const obj = {};
    columns.forEach(([sheetCol, key, type]) => {
      const idx = headerIndex[sheetCol];
      let val = idx === undefined ? "" : raw[idx];
      if (type === "boolean") val = val === true || String(val).toUpperCase() === "TRUE";
      else if (type === "number") val = val === "" ? 0 : Number(val);
      else val = val === undefined || val === null ? "" : String(val);
      obj[key] = val;
    });
    obj.__row = r + 1; // 1-indexed sheet row, for updates
    rows.push(obj);
  }
  return rows;
}

function objectToRowArray_(obj, columns) {
  return columns.map(([, key, type]) => {
    const val = obj[key];
    if (type === "boolean") return val ? "TRUE" : "FALSE";
    if (type === "number") return val === undefined || val === null ? "" : Number(val);
    return val === undefined || val === null ? "" : val;
  });
}

function appendObject_(sheet, obj, columns) {
  sheet.appendRow(objectToRowArray_(obj, columns));
}

function updateRowByField_(sheet, columns, matchKey, matchValue, updates) {
  const rows = readRows_(sheet, columns);
  const row = rows.find((r) => r[matchKey] === matchValue);
  if (!row) return null;
  const merged = Object.assign({}, row, updates);
  const rowArray = objectToRowArray_(merged, columns);
  sheet.getRange(row.__row, 1, 1, rowArray.length).setValues([rowArray]);
  return merged;
}

function deleteRowByField_(sheet, columns, matchKey, matchValue) {
  const rows = readRows_(sheet, columns);
  const row = rows.find((r) => r[matchKey] === matchValue);
  if (!row) return false;
  sheet.deleteRow(row.__row);
  return true;
}

function newId_(prefix) {
  return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

function ok_(data) {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, data: data }, jsonReplacer_))
    .setMimeType(ContentService.MimeType.JSON);
}

// Drops the internal __row bookkeeping field (used to locate a row for
// updates/deletes) from anything sent back to the client.
function jsonReplacer_(key, value) {
  return key === "__row" ? undefined : value;
}

function fail_(message) {
  return ContentService.createTextOutput(JSON.stringify({ ok: false, error: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------------------------------------------------------------------------
// Leads + notes
// ---------------------------------------------------------------------------

function attachNotes_(lead) {
  const notes = readRows_(getSheet_(SHEETS.LEAD_NOTES), LEAD_NOTE_COLUMNS)
    .filter((n) => n.leadId === lead.id)
    .map((n) => ({ id: n.id, body: n.body, createdAt: n.createdAt }));
  return Object.assign({}, lead, { notes: notes });
}

function getLeads_() {
  const leads = readRows_(getSheet_(SHEETS.LEADS), LEAD_COLUMNS);
  return leads.map(attachNotes_);
}

function submitLead_(payload) {
  const sheet = getSheet_(SHEETS.LEADS);
  const now = new Date().toISOString();
  const lead = {
    id: newId_("lead"),
    name: payload.name || "",
    email: payload.email || "",
    company: payload.company || "",
    phone: payload.phone || "",
    service: payload.service || "",
    budget: payload.budget || "",
    timeline: payload.timeline || "",
    message: payload.message || "",
    status: "new",
    source: payload.source || "Website",
    createdAt: now,
    updatedAt: now,
    lastContacted: "",
    nextFollowup: "",
    automationAccess: "",
  };
  appendObject_(sheet, lead, LEAD_COLUMNS);
  return attachNotes_(lead);
}

function updateLeadStatus_(id, status) {
  return updateRowByField_(getSheet_(SHEETS.LEADS), LEAD_COLUMNS, "id", id, {
    status: status,
    updatedAt: new Date().toISOString(),
  });
}

function markContacted_(id) {
  const now = new Date().toISOString();
  return updateRowByField_(getSheet_(SHEETS.LEADS), LEAD_COLUMNS, "id", id, {
    lastContacted: now,
    updatedAt: now,
  });
}

function setLeadFollowup_(id, nextFollowup) {
  return updateRowByField_(getSheet_(SHEETS.LEADS), LEAD_COLUMNS, "id", id, {
    nextFollowup: nextFollowup,
    updatedAt: new Date().toISOString(),
  });
}

function addLeadNote_(id, body) {
  const sheet = getSheet_(SHEETS.LEAD_NOTES);
  const note = { id: newId_("note"), leadId: id, body: body, createdAt: new Date().toISOString(), automationAccess: "" };
  appendObject_(sheet, note, LEAD_NOTE_COLUMNS);
  updateRowByField_(getSheet_(SHEETS.LEADS), LEAD_COLUMNS, "id", id, { updatedAt: new Date().toISOString() });
  return note;
}

// ---------------------------------------------------------------------------
// Projects (+ results)
// ---------------------------------------------------------------------------

function attachResults_(project) {
  const results = readRows_(getSheet_(SHEETS.PROJECT_RESULTS), PROJECT_RESULT_COLUMNS)
    .filter((r) => r.projectId === project.id)
    .map((r) => ({ label: r.label, value: r.value }));
  return Object.assign({}, project, { results: results });
}

function getProjects_(scope) {
  let projects = readRows_(getSheet_(SHEETS.PROJECTS), PROJECT_COLUMNS);
  if (scope === "published") projects = projects.filter((p) => p.status === "published");
  return projects.map(attachResults_).sort((a, b) => a.displayOrder - b.displayOrder);
}

function getProjectBySlug_(slug) {
  const project = readRows_(getSheet_(SHEETS.PROJECTS), PROJECT_COLUMNS).find((p) => p.slug === slug);
  if (!project) throw new Error("Project not found: " + slug);
  return attachResults_(project);
}

function saveProject_(payload) {
  const sheet = getSheet_(SHEETS.PROJECTS);
  const existing = readRows_(sheet, PROJECT_COLUMNS).find((p) => p.id === payload.id);
  const now = new Date().toISOString();

  if (existing) {
    return updateRowByField_(sheet, PROJECT_COLUMNS, "id", payload.id, Object.assign({}, payload, { updatedAt: now }));
  }
  const project = Object.assign({ automationAccess: "" }, payload, { createdAt: now, updatedAt: now });
  appendObject_(sheet, project, PROJECT_COLUMNS);
  return project;
}

function deleteProject_(id) {
  return deleteRowByField_(getSheet_(SHEETS.PROJECTS), PROJECT_COLUMNS, "id", id);
}

function reorderProject_(id, direction) {
  const sheet = getSheet_(SHEETS.PROJECTS);
  const rows = readRows_(sheet, PROJECT_COLUMNS).sort((a, b) => a.displayOrder - b.displayOrder);
  const idx = rows.findIndex((p) => p.id === id);
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapWith < 0 || swapWith >= rows.length) return;
  const a = rows[idx].displayOrder;
  const b = rows[swapWith].displayOrder;
  updateRowByField_(sheet, PROJECT_COLUMNS, "id", rows[idx].id, { displayOrder: b });
  updateRowByField_(sheet, PROJECT_COLUMNS, "id", rows[swapWith].id, { displayOrder: a });
}

// ---------------------------------------------------------------------------
// Settings + stats
// ---------------------------------------------------------------------------

const SETTINGS_KEY_MAP = {
  hero_eyebrow: "heroEyebrow",
  hero_headline: "heroHeadline",
  hero_subhead: "heroSubhead",
  hero_primary_cta: "heroPrimaryCta",
  hero_secondary_cta: "heroSecondaryCta",
  about_eyebrow: "aboutEyebrow",
  about_headline: "aboutHeadline",
  about_body: "aboutBody",
  contact_headline: "contactHeadline",
  contact_subhead: "contactSubhead",
};

function getSettings_() {
  const sheet = getSheet_(SHEETS.SETTINGS);
  const values = sheet.getDataRange().getValues();
  const result = {};
  for (let r = 1; r < values.length; r++) {
    const key = values[r][0];
    const value = values[r][1];
    const frontendKey = SETTINGS_KEY_MAP[key];
    if (frontendKey) result[frontendKey] = value;
  }
  return result;
}

function saveSettings_(settings) {
  const sheet = getSheet_(SHEETS.SETTINGS);
  const values = sheet.getDataRange().getValues();
  Object.keys(SETTINGS_KEY_MAP).forEach((sheetKey) => {
    const frontendKey = SETTINGS_KEY_MAP[sheetKey];
    if (!(frontendKey in settings)) return;
    let found = false;
    for (let r = 1; r < values.length; r++) {
      if (values[r][0] === sheetKey) {
        sheet.getRange(r + 1, 2).setValue(settings[frontendKey]);
        found = true;
        break;
      }
    }
    if (!found) sheet.appendRow([sheetKey, settings[frontendKey], ""]);
  });
  return getSettings_();
}

function getStats_() {
  const sheet = getSheet_(SHEETS.STATS);
  const values = sheet.getDataRange().getValues();
  const stats = [];
  for (let r = 1; r < values.length; r++) {
    if (!values[r][0]) continue;
    stats.push({ metric: values[r][0], value: values[r][1], label: values[r][2] });
  }
  return stats;
}

function saveStats_(stats) {
  const sheet = getSheet_(SHEETS.STATS);
  stats.forEach((stat) => {
    const values = sheet.getDataRange().getValues();
    let found = false;
    for (let r = 1; r < values.length; r++) {
      if (values[r][0] === stat.metric) {
        sheet.getRange(r + 1, 2, 1, 2).setValues([[stat.value, stat.label]]);
        found = true;
        break;
      }
    }
    if (!found) sheet.appendRow([stat.metric, stat.value, stat.label, ""]);
  });
  return getStats_();
}

// ---------------------------------------------------------------------------
// Media (uploads to Drive)
// ---------------------------------------------------------------------------

function getMediaFolder_() {
  const folders = DriveApp.getFoldersByName(MEDIA_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(MEDIA_FOLDER_NAME);
}

function getMedia_() {
  return readRows_(getSheet_(SHEETS.MEDIA), MEDIA_COLUMNS);
}

function uploadMedia_(payload) {
  const matches = /^data:(.+);base64,(.+)$/.exec(payload.dataUrl || "");
  if (!matches) throw new Error("Invalid file data");
  const mimeType = payload.mimeType || matches[1];
  const bytes = Utilities.base64Decode(matches[2]);
  const blob = Utilities.newBlob(bytes, mimeType, payload.filename);

  const folder = getMediaFolder_();
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const asset = {
    id: newId_("media"),
    filename: payload.filename || file.getName(),
    url: "https://drive.google.com/uc?export=view&id=" + file.getId(),
    type: mimeType.indexOf("image") === 0 ? "image" : "document",
    projectId: payload.projectId || "",
    folder: payload.folder || "uploads",
    createdAt: new Date().toISOString(),
    automationAccess: "",
  };
  appendObject_(getSheet_(SHEETS.MEDIA), asset, MEDIA_COLUMNS);
  return asset;
}

function deleteMedia_(id) {
  return deleteRowByField_(getSheet_(SHEETS.MEDIA), MEDIA_COLUMNS, "id", id);
}

// ---------------------------------------------------------------------------
// HTTP entry points
// ---------------------------------------------------------------------------

// Defensive no-op — Apps Script Web Apps don't reliably run a real preflight
// handler, but every request from apiClient.ts is deliberately built as a
// CORS "simple request" (GET with query params, or POST with a
// text/plain body) specifically so browsers never send a preflight OPTIONS
// in the first place. This just avoids a hard error if one ever arrives.
function doOptions() {
  return ContentService.createTextOutput("");
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    if (action === "projects") return ok_(getProjects_(e.parameter.scope));
    if (action === "project") return ok_(getProjectBySlug_(e.parameter.slug));
    if (action === "settings") return ok_(getSettings_());
    if (action === "stats") return ok_(getStats_());
    if (action === "leads") return ok_(getLeads_());
    if (action === "media") return ok_(getMedia_());
    return fail_("Unknown action: " + action);
  } catch (err) {
    return fail_(String(err));
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.token !== TOKEN) return fail_("Invalid token");

    switch (body.action) {
      case "submitLead":
        return ok_(submitLead_(body.lead));
      case "updateLeadStatus":
        return ok_(updateLeadStatus_(body.id, body.status));
      case "markContacted":
        return ok_(markContacted_(body.id));
      case "setLeadFollowup":
        return ok_(setLeadFollowup_(body.id, body.nextFollowup));
      case "addLeadNote":
        return ok_(addLeadNote_(body.id, body.body));

      case "saveProject":
        return ok_(saveProject_(body.project));
      case "deleteProject":
        return ok_(deleteProject_(body.id));
      case "reorderProject":
        return ok_(reorderProject_(body.id, body.direction));

      case "saveSettings":
        return ok_(saveSettings_(body.settings));
      case "saveStats":
        return ok_(saveStats_(body.stats));

      case "uploadMedia":
        return ok_(uploadMedia_(body));
      case "deleteMedia":
        return ok_(deleteMedia_(body.id));

      default:
        return fail_("Unknown action: " + body.action);
    }
  } catch (err) {
    return fail_(String(err));
  }
}
