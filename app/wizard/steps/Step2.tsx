"use client";

import { useState } from "react";
import { useWizard } from "../WizardContext";
import { parseBirthDate, calculateAge } from "@/lib/inputFormatter";

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
  const [birthDateError, setBirthDateError] = useState("");
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

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

  const handleBirthDateChange = (input: string) => {
    setBirthDateError("");
    setCalculatedAge(null);

    if (!input.trim()) {
      updateData({ mainCharacter: { ...data.mainCharacter, birthDate: "" } });
      return;
    }

    const parsed = parseBirthDate(input);
    if (parsed) {
      updateData({ mainCharacter: { ...data.mainCharacter, birthDate: parsed } });
      const age = calculateAge(parsed);
      if (age !== null) {
        setCalculatedAge(age);
      }
    } else {
      setBirthDateError(
        "形式が正しくありません。YYYY-MM-DD、YYYY/MM/DD、YYYYMMDD、または YYYY年MM月DD日 の形式で入力してください。"
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.dark }}>
        STEP 1: 登場人物
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
            type="text"
            placeholder="19610315 または 1961-03-15 （全角・半角OK）"
            value={data.mainCharacter.birthDate}
            onChange={(e) => handleBirthDateChange(e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg"
            style={{
              borderColor: birthDateError ? "#ff6b6b" : colors.primary,
            }}
          />
          {calculatedAge !== null && (
            <p className="text-sm font-semibold" style={{ color: colors.primary }}>
              🎂 年齢：{calculatedAge}歳
            </p>
          )}
          {birthDateError && (
            <p className="text-xs" style={{ color: "#ff6b6b" }}>
              {birthDateError}
            </p>
          )}
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

      {/* Lover & Admiration */}
      <div className="border-l-4 pl-4" style={{ borderColor: colors.primary }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>
          恋愛・憧れ（架空可）
        </h3>
        <div className="space-y-4">
          {/* Lover */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
              恋人・片思い・初恋
            </label>
            <div className="space-y-2">
              <select
                value={data.lover.type || "恋人"}
                onChange={(e) =>
                  updateData({
                    lover: {
                      ...data.lover,
                      type: e.target.value as "恋人" | "片思い" | "初恋",
                    },
                  })
                }
                className="w-full px-4 py-2 border-2 rounded-lg"
                style={{ borderColor: colors.primary }}
              >
                <option value="恋人">恋人</option>
                <option value="片思い">片思い</option>
                <option value="初恋">初恋</option>
              </select>
              <input
                type="text"
                placeholder="名前（任意）"
                value={data.lover.name}
                onChange={(e) =>
                  updateData({ lover: { ...data.lover, name: e.target.value } })
                }
                className="w-full px-4 py-2 border-2 rounded-lg"
                style={{ borderColor: colors.primary }}
              />
            </div>
          </div>

          {/* Admiration */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.dark }}>
              憧れの人・タレント・スポーツ選手
            </label>
            <div className="space-y-2">
              <select
                value={data.admiration?.type || "憧れの人"}
                onChange={(e) =>
                  updateData({
                    admiration: {
                      name: data.admiration?.name || "",
                      type: e.target.value as
                        | "憧れの人"
                        | "好きなタレント"
                        | "スポーツ選手",
                    },
                  })
                }
                className="w-full px-4 py-2 border-2 rounded-lg"
                style={{ borderColor: colors.primary }}
              >
                <option value="憧れの人">憧れの人</option>
                <option value="好きなタレント">好きなタレント</option>
                <option value="スポーツ選手">スポーツ選手</option>
              </select>
              <input
                type="text"
                placeholder="名前（任意）"
                value={data.admiration?.name || ""}
                onChange={(e) =>
                  updateData({
                    admiration: {
                      name: e.target.value,
                      type: data.admiration?.type || "憧れの人",
                    },
                  })
                }
                className="w-full px-4 py-2 border-2 rounded-lg"
                style={{ borderColor: colors.primary }}
              />
            </div>
          </div>
        </div>
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
