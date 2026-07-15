"use client";

export default function Home() {
  const sampleText = `1983年、昭和58年の夏。神戸の駅前にあった喫茶店「オアシス」。
窓から見える大丸百貨店の看板の向こうに、明石海峡の薄い光が見えた。
ラジオからは「キャッツ・アイ」が流れていて、
お調子者の親友・田中は相変わらず舌打ちをしながら、
ココアをフーフーと冷ましていた。

「なあ、進学先ほんまに決まった？」

その時だった——あの子が歩いてきたのは。`;

  const colors = {
    primary: "#FF69B4",
    secondary: "#FFB6D9",
    accent: "#E91E63",
    dark: "#333333",
    light: "#F5F5F5",
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      {/* Header */}
      <header
        className="text-white py-8 px-4 shadow-lg gradient-animate"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent}, ${colors.primary})`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            『KNNタイムトラベル』
          </h1>
          <p className="text-lg md:text-xl font-medium">
            ~あなたの青春時代が蘇る小説ジェネレーター~
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Tagline */}
        <section className="text-center mb-12">
          <p
            className="text-2xl md:text-3xl font-bold leading-relaxed mb-4"
            style={{ color: colors.dark }}
          >
            『あの夏、あの街、あの曲。
            <br />
            あなただけの青春が、一冊の小説になる。』
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            いつ・どこで・誰とを入力するだけで、その時代の空気を織り込んだ私小説が生成されます。
            <br />
            昭和・平成に青春を過ごしたあなたの思い出が、一冊の小説になります。
          </p>
        </section>

        {/* Sample Novel */}
        <section
          className="bg-white rounded-lg shadow-md p-8 md:p-10 mb-12"
          style={{ borderLeft: `4px solid ${colors.primary}` }}
        >
          <h2
            className="text-xl md:text-2xl font-bold mb-6"
            style={{ color: colors.dark }}
          >
            生成される小説の例
          </h2>
          <div className="p-6 rounded-lg" style={{ backgroundColor: colors.light }}>
            <p
              className="text-base md:text-lg leading-relaxed whitespace-pre-wrap"
              style={{ color: colors.dark }}
            >
              {sampleText}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">
            ※ サンプルです。実際の小説はあなたの思い出や時代設定に合わせて生成されます。
          </p>
        </section>

        {/* Feature Highlights */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className="bg-white rounded-lg shadow-md p-6"
            style={{ borderTop: `4px solid ${colors.primary}` }}
          >
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: colors.dark }}
            >
              🎵 時代考証
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              その時代のヒット曲、テレビ番組、CM、事件など、当時の空気をリアルに織り込みます。
            </p>
          </div>
          <div
            className="bg-white rounded-lg shadow-md p-6"
            style={{ borderTop: `4px solid ${colors.accent}` }}
          >
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: colors.dark }}
            >
              💰 完全無料
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              運営者のAPI負担ゼロ。あなたの思い出は安全に、データは一切保存されません。
            </p>
          </div>
          <div
            className="bg-white rounded-lg shadow-md p-6"
            style={{ borderTop: `4px solid ${colors.secondary}` }}
          >
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: colors.dark }}
            >
              📚 出版可能
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              生成した小説をPDF・Markdown形式でダウンロード。表紙付きで完成度の高い一冊に。
            </p>
          </div>
        </section>

        {/* CTA Button */}
        <section className="text-center">
          <button
            onClick={() => {
              // TODO: Navigate to wizard step 1
              console.log("Navigate to wizard");
            }}
            className="text-white font-bold text-xl md:text-2xl px-10 md:px-16 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 button-pulse"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent}, ${colors.primary})`,
            }}
          >
            小説をつくる
          </button>
          <p className="text-sm text-gray-500 mt-4">
            ※ 高齢の方でも使いやすいシンプルな4ステップです
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-6 px-4 mt-12">
        <p className="text-sm text-gray-600">
          © 2026 KNN Time Travel. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          プライバシーポリシー | サービス利用規約
        </p>
      </footer>
    </div>
  );
}
