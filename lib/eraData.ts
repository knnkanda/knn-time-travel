// 各年の時代背景データ
export interface EraData {
  year: number;
  era: string;
  primeMinister: string;
  majorEvents: string[];
  tvPrograms: string[];
  music: string[];
  movies: string[];
  celebrities: string[];
  socialIssues: string[];
}

export const eraDataMap: { [key: number]: EraData } = {
  1973: {
    year: 1973,
    era: "昭和48年",
    primeMinister: "田中角栄",
    majorEvents: ["石油危機", "日本列島改造論"],
    tvPrograms: [
      "『サンダーバード』（再放送）",
      "『鉄人28号』（再放送）",
      "『マジンガーZ』",
      "『NHK 紅白歌合戦』",
      "『明星和歌子のおはよう日本』",
    ],
    music: [
      "阿久悠作詞の歌謡曲",
      "ニルヴァーナ（西城秀樹）",
      "津軽海峡冬景色（石川さゆり）",
      "ラッパよ鳴らせ（鶴田浩二）",
    ],
    movies: [
      "『ラストエンペラー』（海外）",
      "『ジョーズ』",
      "『さらば青春の光』（島田洋八）",
    ],
    celebrities: [
      "石川さゆり",
      "西城秀樹",
      "郷ひろみ",
      "山口百恵",
      "北島三郎",
    ],
    socialIssues: [
      "石油危機で混乱",
      "トイレットペーパー買い占め",
      "高度経済成長の陰り",
      "学生運動の終焉",
    ],
  },
  1980: {
    year: 1980,
    era: "昭和55年",
    primeMinister: "大平正芳（後に鈴木善幸）",
    majorEvents: ["日本の GDP がソビエト連邦を上回る"],
    tvPrograms: [
      "『たかじんのそこまで言って委員会』",
      "『ウルトラマン80』",
      "『古畑任三郎』",
      "『サンテレビのおはよう」",
    ],
    music: [
      "バナナロボット（ピンク・レディ）",
      "津軽海峡冬景色（石川さゆり）",
      "いい日旅立ち（山口百恵）",
      "デリケート（久保田利伸）",
    ],
    movies: [
      "『スター・ウォーズ／帝国の逆襲』",
      "『ブルース・ブラザーズ』",
    ],
    celebrities: [
      "山口百恵",
      "都はるみ",
      "石川さゆり",
      "五木ひろし",
    ],
    socialIssues: [
      "高度経済成長の継続",
      "日本の産業競争力強化",
    ],
  },
  1983: {
    year: 1983,
    era: "昭和58年",
    primeMinister: "中曽根康弘",
    majorEvents: ["大韓航空 007 便撃墜事件"],
    tvPrograms: [
      "『あっぱれさんま大先生』",
      "『なるほど！ザ・ワールド』",
      "『スタジアム』",
      "『欽ちゃんの仮装大賞』",
    ],
    music: [
      "Crazy Nights（久保田利伸）",
      "めぐり逢い（奥田民生）",
      "女のみち（山本達彦）",
      "街のサンダーバード（山本達彦）",
    ],
    movies: [
      "『リターン・オブ・ジェダイ』",
      "『スカーフェイス』",
      "『ビッグ』",
    ],
    celebrities: [
      "さんま",
      "久保田利伸",
      "アグネス・チャン",
      "高橋真梨子",
    ],
    socialIssues: [
      "日本の経済成長が世界第2位に",
      "コンピュータ革命の始まり",
    ],
  },
  1985: {
    year: 1985,
    era: "昭和60年",
    primeMinister: "中曽根康弘",
    majorEvents: ["日航ジャンボ機墜落事故"],
    tvPrograms: [
      "『浅草橋ヤング洋品店』",
      "『機動戦士ガンダムZZ』",
      "『からくり TV』",
    ],
    music: [
      "浪漫飛行（米米クラブ）",
      "CHA-LA HEAD-CHA-LA（島津冴子）",
      "ロンリー・チャップ（近藤真彦）",
    ],
    movies: [
      "『バック・トゥ・ザ・フューチャー』",
      "『ブルートゥース』",
    ],
    celebrities: [
      "中森明菜",
      "松田聖子",
      "田原俊彦",
      "米米クラブ",
    ],
    socialIssues: [
      "バブル経済の前夜",
      "ポップカルチャーの隆盛",
    ],
  },
  1990: {
    year: 1990,
    era: "平成2年",
    primeMinister: "海部俊樹（後に宮澤喜一）",
    majorEvents: ["ドイツ再統一"],
    tvPrograms: [
      "『サザエさん』",
      "『ちびまる子ちゃん』",
      "『天才たけしの元気が出るテレビ!!』",
    ],
    music: [
      "シンデレラ・ハネムーン（鈴木聡美）",
      "世界中のみんなへ（鈴木聡美）",
    ],
    movies: [
      "『トータル・リコール』",
      "『スタンド・バイ・ミー』",
    ],
    celebrities: [
      "中山美穂",
      "渡辺満里奈",
      "アイドリング",
    ],
    socialIssues: [
      "バブル崩壊の兆候",
      "環境問題への関心高まり",
    ],
  },
};

export function getEraData(year: number): EraData | null {
  return eraDataMap[year] || null;
}

export function getEraDescription(year: number): string {
  const data = getEraData(year);
  if (!data) return "";

  const lines = [
    `【${data.era}の背景】`,
    `総理大臣：${data.primeMinister}`,
    ``,
    `【当時のテレビ番組】`,
    data.tvPrograms.map((prog) => `・${prog}`).join("\n"),
    ``,
    `【当時のヒット曲】`,
    data.music.map((song) => `・${song}`).join("\n"),
    ``,
    `【当時の映画】`,
    data.movies.map((movie) => `・${movie}`).join("\n"),
    ``,
    `【当時の有名人】`,
    data.celebrities.map((celeb) => `・${celeb}`).join("\n"),
    ``,
    `【社会的背景】`,
    data.majorEvents.map((event) => `・${event}`).join("\n"),
    data.socialIssues.map((issue) => `・${issue}`).join("\n"),
  ];

  return lines.join("\n");
}
