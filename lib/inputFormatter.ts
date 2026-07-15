// 全角数字を半角に変換
export function toHalfWidth(str: string): string {
  return str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
}

// 年号を数値に変換（全角・半角両対応）
export function parseYear(input: string): number | null {
  const half = toHalfWidth(input).trim();
  const year = parseInt(half, 10);
  if (isNaN(year) || year < 1900 || year > 2100) return null;
  return year;
}

// 生年月日を YYYY-MM-DD フォーマットに正規化
// 優先順: YYYYMMDD (8桁) → YYYY-MM-DD / YYYY/MM/DD → YYYY年MM月DD日
export function parseBirthDate(input: string): string | null {
  if (!input || !input.trim()) return null;

  // ステップ1: 全角数字を半角に変換
  let normalized = toHalfWidth(input).trim();

  // ステップ2: 全角の区切り文字を削除・統一
  normalized = normalized
    .replace(/[－−−]/g, "")    // 全角・半角ハイフンを削除
    .replace(/[／/]/g, "")      // スラッシュを削除
    .replace(/年/g, "")         // 「年」を削除
    .replace(/月/g, "")         // 「月」を削除
    .replace(/日/g, "");        // 「日」を削除

  // ステップ3: YYYYMMDD 形式（8桁）を優先処理
  const eightDigitPattern = /^(\d{4})(\d{2})(\d{2})$/;
  const match8 = normalized.match(eightDigitPattern);
  if (match8) {
    const [, year, month, day] = match8;
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${year}-${month}-${day}`;
    }
  }

  // ステップ4: YYYY-MM-DD または YYYY/MM/DD 形式を処理
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

  // ステップ5: すでに YYYY-MM-DD の場合
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return normalized;
  }

  return null;
}

// 生年月日から年齢を計算
export function calculateAge(birthDate: string): number | null {
  try {
    const birth = new Date(birthDate);
    const today = new Date();

    if (birth > today) return null;

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  } catch {
    return null;
  }
}
