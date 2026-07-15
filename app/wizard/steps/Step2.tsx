"use client";

import { useState } from "react";
import { useWizard } from "../WizardContext";
import { createBirthDate, calculateAge, calculateAgeAtYear, calculateSchoolGrade, toHalfWidth } from "@/lib/inputFormatter";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

// 生年月日の年月日を分けて管理
interface BirthDateFields {
  year: string;
  month: string;
  day: string;
}

export default function Step2() {
  const { data, updateData } = useWizard();
  const [birthDateFields, setBirthDateFields] = useState<BirthDateFields>({
    year: "",
    month: "",
    day: "",
  });
  const [birthDateError, setBirthDateError] = useState("");
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);
  const [ageAtThatTime, setAgeAtThatTime] = useState<number | null>(null);

  const handleMainCharChange = (field: string, value: string) => {
    updateData({
      mainCharacter: { ...data.mainCharacter, [field]: value },
    });
  };

  const handleLoverChange = (value: string) => {
    updateData({ lover: { ...data.lover, name: value } });
  };

  const handleFriendChange = (field: string, value: string) => {
    updateData({
      friend: { ...data.friend, [field]: value },
    });
  };

  const handleBirthDateFieldChange = (field: keyof BirthDateFields, value: string) => {
    // 全角を半角に変換
    const halfWidthValue = toHalfWidth(value);
    const newFields = { ...birthDateFields, [field]: halfWidthValue };
    setBirthDateFields(newFields);
    setBirthDateError("");
    setCalculatedAge(null);
    setAgeAtThatTime(null);

    const birthDate = createBirthDate(newFields.year, newFields.month, newFields.day);
    if (birthDate) {
      updateData({ mainCharacter: { ...data.mainCharacter, birthDate } });
      const age = calculateAge(birthDate);
      if (age !== null) {
        setCalculatedAge(age);
      }

      // 選んだ年での年齢も計算
      if (data.year) {
        const ageAtYear = calculateAgeAtYear(birthDate, data.year);
        if (ageAtYear !== null) {
          setAgeAtThatTime(ageAtYear);
        }
      }
    } else if (newFields.year && newFields.month && newFields.day) {
      setBirthDateError("生年月日が正しくありません（年：1900-2025、月：1-12、日：1-31）");
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
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1" style={{ color: colors.dark }}>
                年
              </label>
              <input
                type="text"
                placeholder="1961"
                value={birthDateFields.year}
                onChange={(e) => handleBirthDateFieldChange("year", e.target.value)}
                className="w-full px-3 py-2 border-2 rounded-lg text-sm"
                style={{
                  borderColor: birthDateError ? "#ff6b6b" : colors.primary,
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1" style={{ color: colors.dark }}>
                月
              </label>
              <input
                type="text"
                placeholder="3"
                value={birthDateFields.month}
                onChange={(e) => handleBirthDateFieldChange("month", e.target.value)}
                className="w-full px-3 py-2 border-2 rounded-lg text-sm"
                style={{
                  borderColor: birthDateError ? "#ff6b6b" : colors.primary,
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1" style={{ color: colors.dark }}>
                日
              </label>
              <input
                type="text"
                placeholder="15"
                value={birthDateFields.day}
                onChange={(e) => handleBirthDateFieldChange("day", e.target.value)}
                className="w-full px-3 py-2 border-2 rounded-lg text-sm"
                style={{
                  borderColor: birthDateError ? "#ff6b6b" : colors.primary,
                }}
              />
            </div>
          </div>
          {ageAtThatTime !== null && (
            <div className="space-y-1">
              <p className="text-sm font-semibold" style={{ color: colors.primary }}>
                🎂 当時の年齢：{ageAtThatTime}歳 {calculateSchoolGrade(ageAtThatTime)}
              </p>
              {calculatedAge !== null && (
                <p className="text-xs" style={{ color: colors.dark }}>
                  （現在：{calculatedAge}歳）
                </p>
              )}
            </div>
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
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: "#999" }}>
              キャラクター設定（架空のキャラ）
            </label>
            <input
              type="text"
              placeholder="例: お調子者のムードメーカー、無口だが頼れる、ライバル、秀才メガネなど..."
              value={data.friend.character}
              onChange={(e) => handleFriendChange("character", e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-lg"
              style={{ borderColor: colors.primary }}
            />
          </div>
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
