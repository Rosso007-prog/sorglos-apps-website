// Escapes a single CSV field value per RFC 4180
function csvField(value) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  // Wrap in quotes if field contains comma, quote, newline, or carriage return
  if (s.includes('"') || s.includes(",") || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

// Builds a full CSV string from a header array and rows array-of-objects
export function buildCsv(headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => csvField(row[h])).join(","));
  }
  return lines.join("\r\n");
}
