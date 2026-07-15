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
// 対応フォーマット: YYYY/MM/DD, YYYY-MM-DD, YYYYMMDD, YYYY年MM月DD日
export function parseBirthDate(input: string): string | null {
  let normalized = toHalfWidth(input).trim();

  // 全角の区切り文字を半角に変換
  normalized = normalized
    .replace(/－/g, "-")      // 全角ハイフン → 半角ハイフン
    .replace(/／/g, "/")      // 全角スラッシュ → 半角スラッシュ
    .replace(/年/g, "-")       // 「年」→ 「-」
    .replace(/月/g, "-")       // 「月」→ 「-」
    .replace(/日/g, "");       // 「日」→ 削除

  const half = normalized;

  // YYYY-MM-DD、YYYY/MM/DD、YYYY-MM-DD（変換後）
  const datePattern1 = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;
  const match1 = half.match(datePattern1);
  if (match1) {
    const [, year, month, day] = match1;
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
  }

  // YYYYMMDD
  const datePattern2 = /^(\d{4})(\d{2})(\d{2})$/;
  const match2 = half.match(datePattern2);
  if (match2) {
    const [, year, month, day] = match2;
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${year}-${month}-${day}`;
    }
  }

  // YYYY年MM月DD日
  const datePattern3 = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/;
  const match3 = half.match(datePattern3);
  if (match3) {
    const [, year, month, day] = match3;
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
      return `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
  }

  // すでに YYYY-MM-DD の場合
  if (/^\d{4}-\d{2}-\d{2}$/.test(half)) {
    return half;
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
