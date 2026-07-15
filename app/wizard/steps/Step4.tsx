"use client";

import { useWizard } from "../WizardContext";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

const storyThemes = [
  "初恋と別れ",
  "親友との喧嘩と和解",
  "上京前夜",
  "部活最後の夏",
  "家族との確執と再生",
  "淡い三角関係",
  "夢を追った日々",
];

const writingStyles = [
  "片岡義男風（都会的で洗練）",
  "村上龍風（激烈で危険）",
  "村上春樹風（不思議で叙情的）",
  "夏目漱石風（古典的で深い）",
  "谷崎潤一郎風（官能的で美しい）",
  "シンプル・ナチュラル",
];

export default function Step4() {
  const { data, updateData } = useWizard();

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
        STEP 4: ストーリー・作風
      </h2>

      {/* Story Theme */}
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>
          ストーリーの課題
        </h3>
        <div className="space-y-2">
          {storyThemes.map((theme) => (
            <button
              key={theme}
              onClick={() => updateData({ storyTheme: theme })}
              className="w-full text-left px-4 py-3 rounded-lg border-2 font-semibold transition-all"
              style={{
                backgroundColor:
                  data.storyTheme === theme ? colors.primary : "white",
                color: data.storyTheme === theme ? "white" : colors.dark,
                borderColor: colors.primary,
              }}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Writing Style */}
      <div>
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>
          作風
        </h3>
        <div className="space-y-2">
          {writingStyles.map((style) => (
            <button
              key={style}
              onClick={() => updateData({ writingStyle: style })}
              className="w-full text-left px-4 py-3 rounded-lg border-2 font-semibold transition-all"
              style={{
                backgroundColor:
                  data.writingStyle === style ? colors.primary : "white",
                color: data.writingStyle === style ? "white" : colors.dark,
                borderColor: colors.primary,
              }}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Author Name */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          作者名（ペンネーム）
        </label>
        <input
          type="text"
          placeholder="あなたのペンネーム"
          value={data.authorName}
          onChange={(e) => updateData({ authorName: e.target.value })}
          className="w-full px-4 py-3 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
        />
      </div>

      {/* Info */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.light }}>
        <p className="text-sm" style={{ color: colors.dark }}>
          💡 <strong>作風選択のコツ:</strong> 著者の書き方を参考にした「オリジナル文体」で生成されます。歌詞や実在人物の台詞は引用されません。
        </p>
      </div>

      {/* Final Info */}
      <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: colors.light, borderColor: colors.primary }}>
        <p className="text-sm font-semibold" style={{ color: colors.dark }}>
          ✨ すべてのステップを入力すると、プロンプトが自動生成されます。
        </p>
        <p className="text-xs mt-2" style={{ color: colors.dark }}>
          生成されたプロンプトをコピーして、ChatGPT・Claude・Geminiなどのあなたが使っているAIに貼り付けてください。
        </p>
      </div>
    </div>
  );
}
