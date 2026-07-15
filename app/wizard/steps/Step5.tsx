"use client";

import { useState } from "react";
import { useWizard } from "../WizardContext";
import { getEraDescription } from "@/lib/eraData";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

export default function Step5() {
  const { data } = useWizard();
  const [selectedImageType, setSelectedImageType] = useState<string>("bookcover");

  const generatePrompt = () => {
    const eraInfo = getEraDescription(data.year);

    const prompt = `以下の情報をもとに、思い出の青春小説を生成してください。

【時代背景】
年：${data.year}年
場所：${data.prefecture}${data.city}

${eraInfo ? `\n${eraInfo}\n` : ""}

【主人公】
名前：${data.mainCharacter.name}
生年月日：${data.mainCharacter.birthDate}
性別：${data.mainCharacter.gender}

【登場人物】
恋人・片思い・初恋：${data.lover.name}（${data.lover.type}）
憧れの人・タレント・スポーツ選手：${data.admiration?.name || "未設定"}${data.admiration?.type ? `（${data.admiration.type}）` : ""}
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
- 当時の時代背景（テレビ番組、流行、有名人、社会情勢）を自然に組み込んでください
- チャンネルをまわすと当時のテレビ番組が流れている、ラジオから当時のヒット曲が聞こえるような時代背景の空気感を大切に
- 実在の人物名や著作権保護の楽曲歌詞は引用しないでください
- 架空の設定や人物でも構いません
- 主人公の視点で、思い出の時間を蘇らせるような文体で
`;

    return prompt;
  };

  const generateImagePrompt = (type: string): string => {
    const year = data.year;
    const title = `思い出の青春　${year}年`;

    const imagePrompts: { [key: string]: string } = {
      bookcover: `【ブックカバー：ハードカバー小説】
タイトル：『${title}』
著者：${data.authorName}

実写写真風の美しいブックカバー。${data.year}年の${data.prefecture}${data.city}の情景を背景に、主人公${data.mainCharacter.name}が思い出の相手${data.lover.name}と過ごした瞬間が優しく表現されている。帯には「${data.storyTheme}」というキャッチコピーがついている。レトロで温かみのあるデザイン。高級感のあるハードカバー。`,

      movieposter: `【映画ポスター風】
映画タイトル：『${data.mainCharacter.name}の${data.year}年』
主演：${data.mainCharacter.name}

${data.year}年の${data.prefecture}、${data.season}の情景を背景に、青春映画のポスター。主人公と${data.lover.name}が光に包まれている。映画館で見かけるような魅力的で洗練されたポスター風デザイン。`,

      graphicrecording: `【グラフィックレコーディング風】
タイトル：『${data.mainCharacter.name}の記憶の地図　${data.year}年』

思い出の舞台（${data.locations}）、登場人物（${data.mainCharacter.name}、${data.lover.name}、${data.friend.name}）、流れていたメディア（${data.media}）が、カラフルなイラストと手書き文字で立体的に記録されている。思い出の品（${data.freeItem1}、${data.freeItem2}、${data.freeItem3}）も可愛らしく描かれている。`,

      presentation: `【プレゼン風スライド】
テーマ：『${data.mainCharacter.name}の${data.year}年スタディーズ』

${data.year}年の時代背景、主人公の心情、当時の流行、思い出の瞬間がプレゼンテーション資料風にまとめられている。グラフ、イラスト、タイムラインなどを含む。プロフェッショナルで視覚的に分かりやすいデザイン。`,

      freetext: `${data.freeKeywords}

上記のキーワードをもとに、${data.year}年の${data.prefecture}を舞台にした、${data.mainCharacter.name}と${data.lover.name}の思い出を表現した画像を生成してください。当時の雰囲気、${data.season}の季節感、${data.storyTheme}という心情を反映させてください。`,
    };

    return imagePrompts[type] || imagePrompts.freetext;
  };

  const prompt = generatePrompt();
  const imagePrompt = generateImagePrompt(selectedImageType);

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

      {/* Tabs */}
      <div className="flex gap-2 border-b-2" style={{ borderColor: colors.primary }}>
        <button
          onClick={() => setSelectedImageType("")}
          className="px-4 py-2 font-semibold border-b-4 transition-all"
          style={{
            borderColor: selectedImageType === "" ? colors.primary : "transparent",
            color: selectedImageType === "" ? colors.primary : colors.dark,
          }}
        >
          📖 ストーリープロンプト
        </button>
        <button
          onClick={() => setSelectedImageType("bookcover")}
          className="px-4 py-2 font-semibold border-b-4 transition-all"
          style={{
            borderColor: selectedImageType === "bookcover" ? colors.primary : "transparent",
            color: selectedImageType === "bookcover" ? colors.primary : colors.dark,
          }}
        >
          📚 ブックカバー
        </button>
        <button
          onClick={() => setSelectedImageType("movieposter")}
          className="px-4 py-2 font-semibold border-b-4 transition-all"
          style={{
            borderColor: selectedImageType === "movieposter" ? colors.primary : "transparent",
            color: selectedImageType === "movieposter" ? colors.primary : colors.dark,
          }}
        >
          🎬 映画ポスター
        </button>
        <button
          onClick={() => setSelectedImageType("graphicrecording")}
          className="px-4 py-2 font-semibold border-b-4 transition-all"
          style={{
            borderColor: selectedImageType === "graphicrecording" ? colors.primary : "transparent",
            color: selectedImageType === "graphicrecording" ? colors.primary : colors.dark,
          }}
        >
          🎨 グラレコ風
        </button>
        <button
          onClick={() => setSelectedImageType("presentation")}
          className="px-4 py-2 font-semibold border-b-4 transition-all"
          style={{
            borderColor: selectedImageType === "presentation" ? colors.primary : "transparent",
            color: selectedImageType === "presentation" ? colors.primary : colors.dark,
          }}
        >
          📊 プレゼン風
        </button>
        <button
          onClick={() => setSelectedImageType("freetext")}
          className="px-4 py-2 font-semibold border-b-4 transition-all"
          style={{
            borderColor: selectedImageType === "freetext" ? colors.primary : "transparent",
            color: selectedImageType === "freetext" ? colors.primary : colors.dark,
          }}
        >
          ✨ フリー画像
        </button>
      </div>

      {/* Generated Prompt */}
      <div className="p-4 rounded-lg border-2" style={{ backgroundColor: colors.light, borderColor: colors.primary }}>
        <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
          {selectedImageType === "" ? "📖 ストーリープロンプト：" : `🖼️ 画像生成プロンプト（${["📚 ブックカバー", "🎬 映画ポスター", "🎨 グラレコ風", "📊 プレゼン風", "✨ フリー画像"][["bookcover", "movieposter", "graphicrecording", "presentation", "freetext"].indexOf(selectedImageType)] || ""}）：`}
        </label>
        <textarea
          value={selectedImageType === "" ? prompt : imagePrompt}
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
          <li>3. AI のテキストボックスに貼り付けて、ストーリーまたは画像を生成</li>
          {selectedImageType !== "" && (
            <li className="text-xs font-semibold" style={{ color: colors.primary }}>
              💡 <strong>画像生成のコツ：</strong>当時の思い出の写真もアップロードしてください。AI が「このような雰囲気で」と参考にできます。より個人的で忠実な画像が生成されます。
            </li>
          )}
          <li>4. 生成後、思い出素材ファイル（YAML）と組み合わせてグラフィックレコーディング化</li>
        </ul>
      </div>
    </div>
  );
}
