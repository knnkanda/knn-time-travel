"use client";

import { useWizard } from "../WizardContext";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

const seasons = ["春", "夏", "秋", "冬"];

export default function Step3() {
  const { data, updateData } = useWizard();

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
        STEP 3: 舞台・シチュエーション
      </h2>

      {/* Locations - Free Text */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          舞台（任意）
        </label>
        <textarea
          placeholder="例: 教室、屋上、カフェ、駅、映画館、川辺など... 複数入力可（改行で区切る）"
          value={data.locations}
          onChange={(e) => updateData({ locations: e.target.value })}
          className="w-full px-4 py-3 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
          rows={3}
        />
      </div>

      {/* Media - Free Text */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          流れるメディア（任意）
        </label>
        <textarea
          placeholder="例: ラジオ深夜放送、テレビ番組『〇〇』、洋画『タイタニック』、ビデオレコード、カセット、CDなど..."
          value={data.media}
          onChange={(e) => updateData({ media: e.target.value })}
          className="w-full px-4 py-3 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
          rows={3}
        />
      </div>

      {/* Season */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          季節
        </label>
        <select
          value={data.season}
          onChange={(e) => updateData({ season: e.target.value })}
          className="w-full px-4 py-2 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
        >
          <option value="">選択してください</option>
          {seasons.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Event - Free Text */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          イベント（任意）
        </label>
        <input
          type="text"
          placeholder="例: 卒業式、入学式、夏祭り、バレンタイン、初雪など..."
          value={data.event}
          onChange={(e) => updateData({ event: e.target.value })}
          className="w-full px-4 py-2 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
        />
      </div>

      {/* Japanese Movie */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          思い出の邦画（任意）
        </label>
        <input
          type="text"
          placeholder="例: 映画『時をかける少女』が好きだった など"
          value={data.japaneseMovie}
          onChange={(e) => updateData({ japaneseMovie: e.target.value })}
          className="w-full px-4 py-3 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
        />
      </div>

      {/* Free Text Items */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
            思い出の品①（任意）
          </label>
          <input
            type="text"
            placeholder="例: 手紙、写真、レコード、制服..."
            value={data.freeItem1}
            onChange={(e) => updateData({ freeItem1: e.target.value })}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
            思い出の品②（任意）
          </label>
          <input
            type="text"
            placeholder="例: 日記、香水、本、ノート..."
            value={data.freeItem2}
            onChange={(e) => updateData({ freeItem2: e.target.value })}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
            思い出の品③（任意）
          </label>
          <input
            type="text"
            placeholder="例: ラジカセ、定期券、チケット、切り抜き..."
            value={data.freeItem3}
            onChange={(e) => updateData({ freeItem3: e.target.value })}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          />
        </div>
      </div>

      {/* Free Keywords */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          思い出キーワード（自由入力）
        </label>
        <textarea
          placeholder="例: 初恋、別れ、友情、夢、悔い、喜び... 印象的な言葉を自由に入力してください"
          value={data.freeKeywords}
          onChange={(e) => updateData({ freeKeywords: e.target.value })}
          className="w-full px-4 py-3 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
          rows={4}
        />
      </div>
    </div>
  );
}
