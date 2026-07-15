// Test the parseBirthDate function
function toHalfWidth(str) {
  return str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
}

function parseBirthDate(input) {
  if (!input || !input.trim()) return null;

  let normalized = toHalfWidth(input).trim();
  console.log("Step 1 - Half width:", normalized);

  normalized = normalized
    .replace(/[-－−]/g, "")
    .replace(/[／/]/g, "")
    .replace(/年/g, "")
    .replace(/月/g, "")
    .replace(/日/g, "");

  console.log("Step 2 - Cleaned:", normalized);

  // 8-digit pattern (YYYYMMDD)
  const eightDigitPattern = /^(\d{4})(\d{2})(\d{2})$/;
  const match8 = normalized.match(eightDigitPattern);
  console.log("Step 3 - 8-digit pattern match:", match8 ? "YES" : "NO");

  if (match8) {
    const [, year, month, day] = match8;
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    console.log(`Month: ${m}, Day: ${d}`);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      const result = `${year}-${month}-${day}`;
      console.log("✅ Valid date:", result);
      return result;
    }
  }

  // YYYY-MM-DD or YYYY/MM/DD pattern
  const separatedPattern = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;
  const match = normalized.match(separatedPattern);
  if (match) {
    const [, year, month, day] = match;
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
  }

  // Already YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return normalized;
  }

  return null;
}

// Test cases
const testCases = [
  "19610315",
  "1961-03-15",
  "1961/03/15",
  "1961年03月15日",
  "１９６１０３１５",  // Full-width
  "１９６１-０３-１５", // Mixed
];

console.log("=== Birth Date Parser Test ===\n");
testCases.forEach((testCase) => {
  console.log(`\nInput: "${testCase}"`);
  const result = parseBirthDate(testCase);
  console.log(`Result: ${result}\n`);
});
