"use client";

import { useMemo, useSyncExternalStore } from "react";
import { sampleNovels, getRandomSampleNovel } from "@/lib/sampleNovels";

const colors = {
  primary: "#FF69B4",
  dark: "#333333",
  light: "#F5F5F5",
};

function subscribeNoop() {
  return () => {};
}

// 静的書き出し(SSG)では初回サンプルを固定表示し、
// クライアントでの水和(hydration)後に一度だけランダムに選び直す。
function useIsHydrated() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

export default function SampleNovel() {
  const isHydrated = useIsHydrated();
  const sample = useMemo(
    () => (isHydrated ? getRandomSampleNovel() : sampleNovels[0]),
    [isHydrated]
  );

  return (
    <section
      className="bg-white rounded-lg shadow-md p-8 md:p-10 mb-12"
      style={{ borderLeft: `4px solid ${colors.primary}` }}
    >
      <h2
        className="text-xl md:text-2xl font-bold mb-6"
        style={{ color: colors.dark }}
      >
        生成される小説の例
        <span className="block text-sm font-normal text-gray-500 mt-1">
          {sample.era} ・ {sample.location}
        </span>
      </h2>
      <div className="p-6 rounded-lg" style={{ backgroundColor: colors.light }}>
        <p
          className="text-base md:text-lg leading-relaxed whitespace-pre-wrap"
          style={{ color: colors.dark }}
        >
          {sample.text}
        </p>
      </div>
      <p className="text-sm text-gray-500 mt-4 italic">
        ※ サンプルです。開くたびに昭和30〜60年代のさまざまな街の一節がランダムに表示されます。実際の小説はあなたの思い出や時代設定に合わせて生成されます。
      </p>
    </section>
  );
}
