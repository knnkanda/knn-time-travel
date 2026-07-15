"use client";

import { useRouter } from "next/navigation";

const colors = {
  primary: "#FF69B4",
  accent: "#E91E63",
};

export default function CTAButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/wizard");
  };

  return (
    <button
      onClick={handleClick}
      className="text-white font-bold text-xl md:text-2xl px-10 md:px-16 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 button-pulse"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent}, ${colors.primary})`,
      }}
    >
      小説をつくる
    </button>
  );
}
