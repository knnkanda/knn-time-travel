"use client";

import { useState } from "react";
import { useWizard } from "../WizardContext";
import { yearToEra } from "@/lib/eraConverter";
import { parseYear } from "@/lib/inputFormatter";

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

export default function Step1() {
  const { data, updateData } = useWizard();
  const [yearInput, setYearInput] = useState(String(data.year || ""));

  // 主人公の生年月日と学校情報から西暦を逆算
  const calculateYearFromBirthDate = () => {
    if (!data.mainCharacter.birthDate) return null;

    try {
      const birthDate = new Date(data.mainCharacter.birthDate);
      const birthYear = birthDate.getFullYear();

      // 学年から年齢を推定（4月入学と仮定）
      const schoolYearMap: { [key: string]: number } = {
        "中学1年": 12,
        "中学2年": 13,
        "中学3年": 14,
        "高校1年": 15,
        "高校2年": 16,
        "高校3年": 17,
        "大学1年": 18,
        "大学2年": 19,
        "大学3年": 20,
        "大学4年": 21,
        "社会人1年": 22,
        "社会人2年": 23,
        "社会人3年": 24,
      };

      // TODO: あとでこの値を取得するため、学年情報を WizardContext に追加する必要がある
      // ここでは簡易版として、高校3年生（17歳）を仮定
      const ageAtTheTime = 17;

      const year = birthYear + ageAtTheTime;
      if (year >= 1950 && year <= 2026) {
        return year;
      }
    } catch {
      return null;
    }
    return null;
  };

  const calculatedYear = calculateYearFromBirthDate();

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setYearInput(input);

    const parsed = parseYear(input);
    if (parsed && parsed >= 1950 && parsed <= 2026) {
      updateData({ year: parsed });
    }
  };

  const handlePrefectureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateData({ prefecture: e.target.value });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ city: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
        STEP 2: いつ・どこで
      </h2>
      <p className="text-sm mb-6" style={{ color: colors.dark }}>
        主人公の情報から、思い出の時代を確定します
      </p>

      <div className="space-y-6">
        {/* Calculated Year from Birth Date */}
        {calculatedYear && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: colors.light }}>
            <p className="text-sm font-semibold" style={{ color: colors.dark }}>
              📅 主人公の情報から推定：{yearToEra(calculatedYear)}
            </p>
            <p className="text-xs mt-1" style={{ color: colors.dark }}>
              高校3年生時の推定です。別の学年の場合は下で修正してください。
            </p>
          </div>
        )}

        {/* Year Input */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
            西暦で入力してください（1950〜2026）
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder={calculatedYear ? `例: ${calculatedYear}` : "1950〜2026（全角・半角OK）"}
              value={yearInput}
              onChange={handleYearChange}
              className="px-4 py-3 border-2 rounded-lg text-lg font-semibold flex-1"
              style={{ borderColor: colors.primary, color: colors.dark }}
            />
            <div className="text-lg font-semibold px-4" style={{ color: colors.primary }}>
              {yearToEra(data.year || calculatedYear || 1983)}
            </div>
          </div>
        </div>

        {/* Prefecture Selection - Grid */}
        <div>
          <label className="block text-sm font-semibold mb-3" style={{ color: colors.dark }}>
            都道府県を選択してください
          </label>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {prefectures.map((pref) => (
              <button
                key={pref}
                onClick={() => handlePrefectureChange({ target: { value: pref } } as any)}
                className="px-2 py-2 rounded-lg font-semibold text-sm transition-all border-2"
                style={{
                  backgroundColor: data.prefecture === pref ? colors.primary : "white",
                  color: data.prefecture === pref ? "white" : colors.dark,
                  borderColor: colors.primary,
                }}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* City Input */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
            市町村を入力してください（任意）
          </label>
          <input
            type="text"
            placeholder="例: 中央区、渋谷区"
            value={data.city}
            onChange={handleCityChange}
            className="w-full px-4 py-3 border-2 rounded-lg text-base"
            style={{ borderColor: colors.primary, color: colors.dark }}
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: colors.light }}>
        <p className="text-sm" style={{ color: colors.dark }}>
          💡 <strong>時代選択のコツ:</strong> あなたが青春を過ごした時代を選ぶと、当時のヒット曲やテレビ番組、CMなどが自動的に織り込まれます。
        </p>
      </div>
    </div>
  );
}
