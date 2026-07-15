"use client";

import { useWizard } from "../WizardContext";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

export default function Step5() {
  const { data } = useWizard();

  const generatePrompt = () => {
    const prompt = `以下の情報をもとに、思い出の青春小説を生成してください。

【時代背景】
年：${data.year}年
場所：${data.prefecture}${data.city}

【主人公】
名前：${data.mainCharacter.name}
生年月日：${data.mainCharacter.birthDate}
性別：${data.mainCharacter.gender}
当時の年齢：${data.mainCharacter.birthDate ? "計算結果" : "未設定"}

【登場人物】
恋人・片思い・初恋：${data.lover.name}（${data.lover.type}）
憧れの人：${data.admiration?.name || "未設定"}
親友：${data.friend.name}${data.friend.character ? `（${data.friend.character}）` : ""}

【舞台・シチュエーション】
舞台：
${data.locations || "未選択"}

流れるメディア：
${data.media || "未選択"}

季節：${data.season}
イベント：${data.event}
思い出の邦画：${data.japaneseMovie}
思い出の品：${data.freeItem1}、${data.freeItem2}、${data.freeItem3}

【当時の心情・シチュエーション】
${data.storyTheme}

【思い出キーワード】
${data.freeKeywords}

【作風・執筆方針】
作風：${data.writingStyle}
作者名：${data.authorName}

【生成指示】
- 上記の情報を織り込んだ、5000字程度の青春小説を生成してください
- 当時の時代背景（流行、風俗、社会情勢）を自然に組み込んでください
- 実在の人物名や著作権保護の楽曲歌詞は引用しないでください
- 架空の設定や人物でも構いません
- 主人公の視点で、思い出の時間を蘇らせるような文体で
`;

    return prompt;
  };

  const prompt = generatePrompt();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    alert("プロンプトをコピーしました！");
  };

  const openInChatGPT = () => {
    navigator.clipboard.writeText(prompt);
    window.open("https://chat.openai.com/", "_blank");
    alert("プロンプトをコピーしました！\nChatGPT が開きます。\nテキストボックスに貼り付けてご使用ください。");
  };

  const openInClaude = () => {
    navigator.clipboard.writeText(prompt);
    window.open("https://claude.ai/", "_blank");
    alert("プロンプトをコピーしました！\nClaude が開きます。\nテキストボックスに貼り付けてご使用ください。");
  };

  const openInGemini = () => {
    navigator.clipboard.writeText(prompt);
    window.open("https://gemini.google.com/", "_blank");
    alert("プロンプトをコピーしました！\nGemini が開きます。\nテキストボックスに貼り付けてご使用ください。");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
        ✨ プロンプト生成完了
      </h2>

      {/* Generated Prompt */}
      <div className="p-4 rounded-lg border-2" style={{ backgroundColor: colors.light, borderColor: colors.primary }}>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          📝 生成されたプロンプト：
        </label>
        <textarea
          value={prompt}
          readOnly
          className="w-full px-4 py-3 border rounded-lg bg-white text-xs font-mono"
          style={{ borderColor: colors.primary, color: colors.dark }}
          rows={15}
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={copyToClipboard}
          className="w-full px-6 py-3 rounded-lg font-bold text-white transition-all"
          style={{ backgroundColor: colors.primary }}
        >
          📋 プロンプトをコピー
        </button>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={openInChatGPT}
            className="px-4 py-2 rounded-lg font-bold text-white text-sm transition-all"
            style={{ backgroundColor: "#10a37f" }}
          >
            📋 ChatGPT で開く
          </button>
          <button
            onClick={openInClaude}
            className="px-4 py-2 rounded-lg font-bold text-white text-sm transition-all"
            style={{ backgroundColor: "#1f2937" }}
          >
            📋 Claude で開く
          </button>
          <button
            onClick={openInGemini}
            className="px-4 py-2 rounded-lg font-bold text-white text-sm transition-all"
            style={{ backgroundColor: "#3b82f6" }}
          >
            📋 Gemini で開く
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: colors.light, borderColor: colors.primary }}>
        <p className="text-sm font-semibold" style={{ color: colors.dark }}>
          💡 使い方：
        </p>
        <ul className="text-xs mt-2 space-y-1" style={{ color: colors.dark }}>
          <li>1. 「プロンプトをコピー」でテキストをコピー</li>
          <li>2. または「ChatGPT/Claude/Gemini で開く」ボタンをクリック</li>
          <li className="text-xs font-semibold">　　↓ ボタンをクリックすると、プロンプトがコピーされて AI が開きます</li>
          <li>3. AI のテキストボックスに貼り付けて、青春小説を生成</li>
          <li>4. 生成後、思い出素材ファイル（YAML）と組み合わせてグラフィックレコーディング化</li>
        </ul>
      </div>
    </div>
  );
}
