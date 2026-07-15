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

// シンプル版：年月日の数値から YYYY-MM-DD を生成
export function createBirthDate(year: number | string, month: number | string, day: number | string): string | null {
  const y = String(year).trim();
  const m = String(month).trim();
  const d = String(day).trim();

  if (!y || !m || !d) return null;

  const yearNum = parseInt(y, 10);
  const monthNum = parseInt(m, 10);
  const dayNum = parseInt(d, 10);

  if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) return null;
  if (yearNum < 1900 || yearNum > 2025) return null;
  if (monthNum < 1 || monthNum > 12) return null;
  if (dayNum < 1 || dayNum > 31) return null;

  return `${yearNum}-${String(monthNum).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
}

// 互換性用：従来の parseBirthDate は廃止予定
export function parseBirthDate(input: string): string | null {
  if (!input || !input.trim()) return null;
  const half = toHalfWidth(input).trim();

  // YYYYMMDD 形式のみサポート（シンプル化）
  const eightDigitPattern = /^(\d{4})(\d{2})(\d{2})$/;
  const match = half.match(eightDigitPattern);

  if (match) {
    const [, year, month, day] = match;
    return createBirthDate(year, month, day);
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
