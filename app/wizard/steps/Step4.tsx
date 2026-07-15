"use client";

import { useWizard } from "../WizardContext";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};


export default function Step4() {
  const { data, updateData } = useWizard();

  const downloadMaterials = () => {
    const yamlContent = `# KNNタイムトラベル - 思い出素材
metadata:
  createdAt: "${new Date().toISOString()}"
  title: "思い出素材 - グラフィックレコーディング用"

# STEP 1: いつ・どこで
timeline:
  year: ${data.year}
  era: ""
  location:
    prefecture: "${data.prefecture}"
    city: "${data.city}"

# STEP 2: 登場人物
characters:
  mainCharacter:
    name: "${data.mainCharacter.name}"
    birthDate: "${data.mainCharacter.birthDate}"
    gender: "${data.mainCharacter.gender}"

  lover:
    name: "${data.lover.name}"
    type: "${data.lover.type}"

  admiration:
    name: "${data.admiration?.name || ""}"
    type: "${data.admiration?.type || ""}"

  friend:
    name: "${data.friend.name}"
    character: "${data.friend.character}"

# STEP 3: 舞台・シチュエーション
setting:
  locations: |
${data.locations
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => `    ${line}`)
  .join("\n") || "    未入力"}

  media: |
${data.media
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => `    ${line}`)
  .join("\n") || "    未入力"}

  season: "${data.season}"
  event: "${data.event}"
  japaneseMovie: "${data.japaneseMovie}"

  freeItems:
    item1: "${data.freeItem1}"
    item2: "${data.freeItem2}"
    item3: "${data.freeItem3}"

  keywords: |
${data.freeKeywords
  .split("\n")
  .filter((line) => line.trim())
  .map((line) => `    ${line}`)
  .join("\n") || "    未入力"}

# STEP 4: ストーリー・作風
story:
  theme: "${data.storyTheme}"
  style: "${data.writingStyle}"
  authorName: "${data.authorName}"
`;

    const blob = new Blob([yamlContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `knn-timetravel-materials-${Date.now()}.yaml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
        STEP 4: ストーリー・作風
      </h2>

      {/* Story Theme - Free Text */}
      <div>
        <label className="block text-lg font-bold mb-2" style={{ color: colors.dark }}>
          当時のシチュエーション（自由記述）
        </label>
        <textarea
          placeholder="例: 初恋で胸を焦がしていた、親友と喧嘩して悔しかった、受験勉強の真っ最中、将来への不安と期待が混在していた時期... 当時の心情や状況を自由に書いてください"
          value={data.storyTheme}
          onChange={(e) => updateData({ storyTheme: e.target.value })}
          className="w-full px-4 py-3 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
          rows={5}
        />
      </div>

      {/* Writing Style - Free Text */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          作風（自由記述）
        </label>
        <input
          type="text"
          placeholder="例: 片岡義男風、村上春樹風、村上龍風、シンプル・ナチュラル、古典的で叙情的など..."
          value={data.writingStyle}
          onChange={(e) => updateData({ writingStyle: e.target.value })}
          className="w-full px-4 py-3 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
        />
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

      {/* Download Materials */}
      <div className="p-4 rounded-lg border-2" style={{ backgroundColor: colors.light, borderColor: colors.primary }}>
        <p className="text-sm font-semibold mb-3" style={{ color: colors.dark }}>
          💾 思い出素材をダウンロード
        </p>
        <button
          onClick={downloadMaterials}
          className="w-full px-6 py-3 rounded-lg font-bold text-white transition-all"
          style={{ backgroundColor: colors.primary }}
        >
          💾 思い出素材をダウンロード（YAML）
        </button>
        <p className="text-xs mt-2" style={{ color: colors.dark }}>
          入力した思い出の素材をテキストファイルで保存。後で見直したり、別のAIに使用できます。
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
