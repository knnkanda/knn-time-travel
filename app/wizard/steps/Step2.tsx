"use client";

import { useWizard } from "../WizardContext";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

const characterPresets = [
  "お調子者のムードメーカー",
  "無口だが頼れる",
  "ライバルであり相棒",
  "秀才メガネ",
  "不良だが情に厚い",
  "上級生でかっこいい",
  "同級生の親友",
];

export default function Step2() {
  const { data, updateData } = useWizard();

  const handleMainCharChange = (field: string, value: string) => {
    updateData({
      mainCharacter: { ...data.mainCharacter, [field]: value },
    });
  };

  const handleLoverChange = (value: string) => {
    updateData({ lover: { name: value } });
  };

  const handleFriendChange = (field: string, value: string) => {
    updateData({
      friend: { ...data.friend, [field]: value },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
        STEP 2: 登場人物
      </h2>

      {/* Main Character */}
      <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>
          主人公
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="名前（ファーストネーム推奨）"
            value={data.mainCharacter.name}
            onChange={(e) => handleMainCharChange("name", e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          />
          <input
            type="date"
            value={data.mainCharacter.birthDate}
            onChange={(e) => handleMainCharChange("birthDate", e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          />
          <select
            value={data.mainCharacter.gender}
            onChange={(e) => handleMainCharChange("gender", e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          >
            <option value="other">性別（任意）</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select>
        </div>
      </div>

      {/* Lover */}
      <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>
          恋人（架空可）
        </h3>
        <input
          type="text"
          placeholder="名前"
          value={data.lover.name}
          onChange={(e) => handleLoverChange(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-lg"
          style={{ borderColor: colors.primary }}
        />
      </div>

      {/* Friend */}
      <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>
          親友
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="親友の名前"
            value={data.friend.name}
            onChange={(e) => handleFriendChange("name", e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          />
          <select
            value={data.friend.character}
            onChange={(e) => handleFriendChange("character", e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{ borderColor: colors.primary }}
          >
            <option value="">キャラクター設定（任意）</option>
            {characterPresets.map((char) => (
              <option key={char} value={char}>
                {char}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: colors.light }}>
        <p className="text-sm" style={{ color: colors.dark }}>
          💡 <strong>キャラクター作成のコツ:</strong> 実名を使っても、ファーストネームだけでも大丈夫です。実際の思い出と違う設定にするのも楽しい体験になります。
        </p>
      </div>
    </div>
  );
}
