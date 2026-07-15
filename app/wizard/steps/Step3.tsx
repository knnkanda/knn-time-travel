"use client";

import { useWizard } from "../WizardContext";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

const locations = [
  "教室", "屋上", "体育館裏", "銭湯", "純喫茶", "駄菓子屋",
  "レコード店", "ゲームセンター", "海辺", "祭り", "駅のホーム", "下宿・アパート",
];

const media = [
  "ラジオ深夜放送", "テレビ歌謡番組", "有線", "レコード", "カセット", "CD",
];

const seasons = ["春", "夏", "秋", "冬"];

const events = [
  "卒業式", "入学式", "夏祭り", "文化祭", "体育祭", "初雪",
  "新年", "七夕", "お盆", "バレンタイン", "ホワイトデー",
];

export default function Step3() {
  const { data, updateData } = useWizard();

  const toggleLocation = (loc: string) => {
    const updated = data.locations.includes(loc)
      ? data.locations.filter((l) => l !== loc)
      : [...data.locations, loc];
    updateData({ locations: updated });
  };

  const toggleMedia = (med: string) => {
    const updated = data.media.includes(med)
      ? data.media.filter((m) => m !== med)
      : [...data.media, med];
    updateData({ media: updated });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
        STEP 3: 舞台・シチュエーション
      </h2>

      {/* Locations */}
      <div>
        <h3 className="text-lg font-bold mb-3" style={{ color: colors.dark }}>
          舞台（複数選択可）
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => toggleLocation(loc)}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all border-2"
              style={{
                backgroundColor: data.locations.includes(loc)
                  ? colors.primary
                  : "white",
                color: data.locations.includes(loc) ? "white" : colors.dark,
                borderColor: colors.primary,
              }}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Media */}
      <div>
        <h3 className="text-lg font-bold mb-3" style={{ color: colors.dark }}>
          流れるメディア（複数選択可）
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {media.map((med) => (
            <button
              key={med}
              onClick={() => toggleMedia(med)}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all border-2"
              style={{
                backgroundColor: data.media.includes(med) ? colors.primary : "white",
                color: data.media.includes(med) ? "white" : colors.dark,
                borderColor: colors.primary,
              }}
            >
              {med}
            </button>
          ))}
        </div>
      </div>

      {/* Season & Event */}
      <div className="grid md:grid-cols-2 gap-4">
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
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
            イベント（任意）
          </label>
          <select
            value={data.event}
            onChange={(e) => updateData({ event: e.target.value })}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          >
            <option value="">選択してください</option>
            {events.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
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
