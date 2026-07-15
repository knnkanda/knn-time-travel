"use client";

import { useWizard } from "../WizardContext";
import { yearToEra } from "@/lib/eraConverter";

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

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);
    if (year >= 1950 && year <= 2026) {
      updateData({ year });
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
        STEP 1: いつ・どこで
      </h2>

      <div className="space-y-6">
        {/* Year Input */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
            西暦で入力してください（1950〜2026）
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="number"
              min="1950"
              max="2026"
              value={data.year}
              onChange={handleYearChange}
              className="px-4 py-3 border-2 rounded-lg text-lg font-semibold flex-1"
              style={{ borderColor: colors.primary, color: colors.dark }}
            />
            <div className="text-lg font-semibold px-4" style={{ color: colors.primary }}>
              {yearToEra(data.year)}
            </div>
          </div>
        </div>

        {/* Prefecture Selection */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
            都道府県を選択してください
          </label>
          <select
            value={data.prefecture}
            onChange={handlePrefectureChange}
            className="w-full px-4 py-3 border-2 rounded-lg text-base"
            style={{ borderColor: colors.primary, color: colors.dark }}
          >
            <option value="">選択してください</option>
            {prefectures.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
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
