const SHEET_NAME = "Voluntarios";
const MAX_FIELD_LENGTH = 500;
const RATE_LIMIT_SECONDS = 120;

const HEADERS = [
  "Data de envio",
  "Nome completo",
  "WhatsApp",
  "E-mail",
  "Bairro ou comunidade",
  "Profissao ou area de atuacao",
  "Como deseja participar",
  "Disponibilidade",
  "Melhor forma de contato",
  "Mensagem, demanda ou sugestao",
  "Consentimento",
  "Tempo na pagina em segundos",
  "Origem",
];

function doGet() {
  return jsonResponse({
    ok: true,
    message: "Endpoint ativo.",
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = getSheet();
    ensureHeader(sheet);

    const data = readRequestData(e);
    validateRequest(data);
    checkRateLimit(data.whatsapp);

    const row = [
      new Date(),
      clean(data.nome, 120),
      clean(data.whatsapp, 40),
      clean(data.email, 160),
      clean(data.bairro, 120),
      clean(data.profissao, 120),
      clean(data.interesse, 80),
      clean(data.disponibilidade, 80),
      clean(data.canal, 80),
      clean(data.mensagem, 1000),
      clean(data.consentimento, 20),
      clean(data.tempoPermanenciaSegundos, 20),
      clean(data.origem, 80),
    ];

    sheet.appendRow(row);

    return jsonResponse({
      ok: true,
      message: "Formulario recebido com sucesso.",
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      message: error && error.message ? error.message : "Erro ao salvar formulario.",
    });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeader(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
}

function readRequestData(e) {
  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return {};
    }
  }

  return {};
}

function validateRequest(data) {
  if (clean(data.confirmacao, 50) !== "") {
    throw new Error("Envio recusado.");
  }

  if (clean(data.consentimento, 20).toLowerCase() !== "sim") {
    throw new Error("Consentimento obrigatorio.");
  }

  requireField(data.nome, "Nome");
  requireField(data.whatsapp, "WhatsApp");
  requireField(data.bairro, "Bairro");
  requireField(data.interesse, "Interesse");
  requireField(data.disponibilidade, "Disponibilidade");
  requireField(data.canal, "Canal de contato");

  const tempo = Number(clean(data.tempoPermanenciaSegundos, 20));
  if (!Number.isNaN(tempo) && tempo > 0 && tempo < 3) {
    throw new Error("Envio muito rapido.");
  }
}

function requireField(value, label) {
  if (clean(value, MAX_FIELD_LENGTH) === "") {
    throw new Error(label + " obrigatorio.");
  }
}

function checkRateLimit(whatsapp) {
  const key = "form_" + normalizePhone(whatsapp);
  const cache = CacheService.getScriptCache();

  if (cache.get(key)) {
    throw new Error("Aguarde alguns minutos para enviar novamente.");
  }

  cache.put(key, "1", RATE_LIMIT_SECONDS);
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(-11) || "semtelefone";
}

function clean(value, maxLength) {
  const limit = maxLength || MAX_FIELD_LENGTH;
  let text = String(value || "").trim().replace(/\s+/g, " ");

  if (text.length > limit) {
    text = text.slice(0, limit);
  }

  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }

  return text;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
