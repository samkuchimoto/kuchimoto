// /src/i18n/dictionaries/ja.ts
// The Japanese version of fr.ts, same shape. Polite form (です・ます),
// full-width punctuation, brand names kept in Latin letters. Never use
// the em dash.

import type { Dictionary } from "./fr";

const ja: Dictionary = {
  meta: {
    siteName: "KUCHIMOTO",
    home: {
      title: "KUCHIMOTO | 国際グループ＆スタジオ",
      description:
        "国際グループ＆スタジオ、KUCHIMOTO。Happy Homes（タイ、カナダ、アメリカのハウスサービス）、BambooTails（犬のアクセサリー）、Kuchimoto Lab（ITとAIのコンサルティング）。",
    },
    happyHomes: {
      title: "Happy Homes、ハウスサービス",
      description:
        "ヴィラやコンドミニアムの清掃、プールと庭の手入れ。現在はパタヤで、2028年7月からバンコクとカナダ、2029年1月からデンバーとフロリダで。",
    },
    thailand: {
      title: "Happy Homes タイ、パタヤの清掃とVilla Care",
      description:
        "パタヤのヴィラとコンドミニアムの清掃を定額で。留守中のオーナー向け月額プラン「Villa Care」も。オンライン予約。バンコクは2028年7月から。",
    },
    canada: {
      title: "Happy Homes カナダ、2028年7月から",
      description:
        "カナダで2028年7月から、清掃、オフィス清掃、プール管理、造園、除雪を始める予定です。ウェイティングリストにご登録ください。",
    },
    usa: {
      title: "Happy Homes アメリカ、デンバーとフロリダ",
      description:
        "デンバーとフロリダで2029年1月から、清掃とプール・庭のプランを始める予定です。ウェイティングリストにご登録ください。",
    },
    bambootails: {
      title: "BambooTails、犬のアクセサリー",
      description:
        "オリジナルキャラクターの世界から生まれた犬のアクセサリーブランド、BambooTails。フランス製のバンダナと首輪。",
    },
    lab: {
      title: "AIエージェント、n8n・Make自動化、MVP | Kuchimoto Lab",
      description:
        "カスタムAIエージェント、n8nとMakeのワークフロー、WebとモバイルのMVP。48時間・490ユーロで動くプロトタイプをお届けし、本開発に進む場合はその費用から差し引きます。",
    },
    studio: {
      title: "画家が率いる、クリエイティブブランドのためのAIエージェント | Kuchimoto Studio",
      description:
        "画家が率いる、クリエイティブブランドのためのAIエージェント。商品説明、広告のバリエーション、ローカライズを、ブランドの世界観を保ったまま担当します。48時間・490ユーロの動くプロトタイプから。本開発に進む場合は差し引きます。",
    },
    about: {
      title: "プロフィール",
      description:
        "KUCHIMOTOは、フランスとカナダの国籍を持つSamuel Louissaintが創業しました。テック業界でのテクニカルセールスとパートナーエンジニアリング、プール工事の現場経験、そして絵。",
    },
    contact: {
      title: "お問い合わせ",
      description: "KUCHIMOTOへのお問い合わせ：Happy Homes、BambooTails、Kuchimoto Lab。",
    },
    bookingThanks: {
      title: "ご予約を承りました",
      description: "Happy Homes タイのご予約を受け付けました。",
    },
    thankYou: {
      title: "ご依頼を受け付けました",
      description: "ご依頼を受け付けました。24時間以内に固定価格をお送りします。",
    },
  },

  nav: {
    label: "メインナビゲーション",
    skip: "本文へ移動",
    menu: "メニュー",
    close: "メニューを閉じる",
    language: "言語",
    links: {
      home: "ホーム",
      happyHomes: "Happy Homes",
      bambootails: "BambooTails",
      lab: "Kuchimoto Lab",
      about: "プロフィール",
      contact: "お問い合わせ",
    },
  },

  footer: {
    tagline: "国際グループ＆スタジオ。",
    divisions: "事業",
    company: "会社",
    legal: "法的情報",
    legalLinks: {
      notice: "法的表示",
      terms: "Happy Homes 利用規約",
      privacy: "プライバシーポリシー",
      cookies: "Cookieの設定",
    },
    trademark: "BAMBOOTAILSはSamuel Louissaintの商標（INPI番号5308274）で、KUCHIMOTOが使用しています。",
    rights: (year: number) => `© ${year} KUCHIMOTO`,
  },

  common: {
    placeholderEmail: "[メールアドレス]",
    placeholderPhone: "[電話番号]",
    photo: "写真は近日掲載",
    from: (date: string) => `${date}から`,
    open: "営業中",
    noHousing: "Happy Homesは、物件探しや賃貸管理は行っていません。",
    visual: "画像はイメージです",
    learnMore: "詳しく見る",
    email: "メール",
    phone: "電話",
  },

  home: {
    eyebrow: "国際グループ＆スタジオ",
    title: "KUCHIMOTO、国際グループ＆スタジオ。",
    intro: "KUCHIMOTO LLC（米国ワイオミング州）、設立手続き中。",
    divisions: {
      happyHomes: {
        label: "ハウスサービス",
        body: "ヴィラやコンドミニアムの清掃、プールと庭の手入れ。現在はパタヤで、今後はバンコク、カナダ、アメリカへ。",
        cta: "Happy Homesを見る",
      },
      bambootails: {
        label: "犬のアクセサリー",
        body: "オリジナルキャラクターの世界と、フランス製のバンダナや首輪。",
        cta: "BambooTailsを見る",
      },
      lab: {
        label: "テクノロジー",
        body: "ITとAIのコンサルティング、受託開発、Google Play向けテスター、Ittsuiをはじめとする自社アプリ。",
        cta: "Kuchimoto Labを見る",
      },
    },
    where: {
      title: "事業地域",
      france: ["フランス", "スタジオ"],
      thailand: ["タイ", "現在はパタヤ。バンコク：2028年7月から開始予定"],
      canada: ["カナダ", "2028年7月から開始予定"],
      usa: ["アメリカ", "デンバーとフロリダ：2029年1月から開始予定"],
    },
    contact: {
      title: "ご相談、ご質問はこちら",
      body: "3つの事業共通のフォームです。",
      cta: "お問い合わせ",
    },
  },

  happyHomes: {
    label: "ハウスサービス",
    title: "Happy Homes",
    intro: "清掃、プール、庭の手入れを、国ごとにお引き受けします。",
    countriesTitle: "対応する国",
    countries: {
      thailande: {
        name: "タイ",
        status: "現在はパタヤ。バンコク：2028年7月から開始予定",
        body: "ヴィラとコンドミニアムの清掃、そして留守中のオーナー向けの月額プラン「Villa Care」。オンラインで予約、お支払い。",
      },
      canada: {
        name: "カナダ",
        status: "2028年7月から開始予定",
        body: "清掃、オフィス清掃、プール管理、造園、除雪。",
      },
      "etats-unis": {
        name: "アメリカ",
        status: "デンバーとフロリダ：2029年1月から開始予定",
        body: "清掃、プールと庭のプラン。",
      },
    },
    tabsLabel: "国",
    more: {
      title: "その他のサービス",
      intro: "対応は国によって異なります。お気軽にご相談ください。",
      items: [
        ["オフィス清掃", "ご希望の頻度で、清潔なオフィスを保ちます。"],
        ["庭と造園", "日々の手入れから、庭のつくり直しまで。"],
        ["インテリアのご提案", "お住まいのレイアウトと装飾についてアドバイスします。"],
        ["リフォーム", "一戸建てやマンションのリフォーム工事。"],
        ["プールの施工と改修", "新しいプールの施工、または今あるプールの改修。"],
      ],
      contractors: "リフォームとプールの工事は、資格を持ち保険に加入した専門業者が行います。",
      cta: "お問い合わせ",
    },
  },

  thailand: {
    label: "Happy Homes タイ",
    title: "パタヤの清掃とVilla Care",
    status: "パタヤ：営業中。バンコク：2028年7月から開始予定。",
    intro: "料金は定額で、ご予約の前にわかります。ヴィラは写真をもとにお見積もりします。",
    bookOnline: "happyhomesthailand.comで予約する",
    photoAlt: "写真：パタヤのプール付きヴィラ",
    prices: {
      title: "料金",
      note: "料金はタイバーツです。",
      sizes: { studio: "スタジオ", oneBed: "1ベッドルーム", twoBed: "2ベッドルーム" },
      oneOff: "単発の清掃",
      weekly: "週1回プラン（月額）",
      villa: "ヴィラ",
      villaValue: (price: string) => `${price}から（写真をもとにお見積もり）`,
      deepClean: "入居時、退去時の大掃除",
      deepCleanNote: "2ベッドルームまでのコンドミニアム",
      aircon: "エアコンクリーニング",
      perUnit: (price: string) => `1台につき${price}`,
    },
    villaCare: {
      title: "Villa Care",
      lead: "お留守のあいだも、ヴィラをきれいに保ちます。",
      price: (price: string) => `月額${price}`,
      items: ["プールの手入れ", "庭の手入れ", "家の点検訪問（1回）", "家の換気", "ご到着前の清掃"],
    },
  },

  canada: {
    label: "Happy Homes カナダ",
    title: "カナダ：2028年7月から開始予定",
    intro: "ウェイティングリストにご登録ください。お住まいの都市でサービスが始まり次第、お知らせします。",
    photoAlt: "写真：冬のカナダの家",
    servicesTitle: "予定しているサービス",
    services: ["清掃", "オフィス清掃", "プール管理", "造園", "除雪"],
  },

  usa: {
    label: "Happy Homes アメリカ",
    title: "アメリカ：デンバーとフロリダで2029年1月から開始予定",
    intro: "ウェイティングリストにご登録ください。サービスが始まり次第、お知らせします。",
    photoAlt: "写真：庭とプールのある家",
    servicesTitle: "予定しているサービス",
    services: ["清掃", "プールのプラン", "庭のプラン"],
  },

  bambootails: {
    label: "犬のアクセサリー",
    title: "BambooTails",
    intro: "Samuel Louissaintが描くオリジナルキャラクターの世界から生まれた、犬のアクセサリーブランドです。",
    universe: {
      title: "世界観",
      body: "チェンマイからパリまで、ていねいな仕事を愛する14のキャラクター。短いエピソードのシリーズの中で、そしてブランドのバンダナや首輪の上で生きています。",
      characters: [
        ["tao", "Tao", "継承者"],
        ["lumi", "Lumi", "建築家"],
        ["miko", "Miko", "切れ者"],
        ["sora", "Sora", "染め師"],
        ["kuma", "Kuma", "団らん"],
        ["mochi", "Mochi", "小さな喜び"],
      ],
      alt: (name: string) => `BambooTailsの世界のキャラクター、${name}`,
    },
    products: {
      title: "定番アイテム",
      madeIn: "フランス製",
      bandana: {
        name: "キャラクター・バンダナ",
        body: "BambooTailsのキャラクターをプリントした、リバーシブルのコットンバンダナ。2サイズ。",
        alt: "平置きのキャラクター・バンダナ：キャラクターをプリントしたクリーム色のコットン、裏はテラコッタ色",
      },
      collar: {
        name: "キャラクター・首輪",
        body: "丈夫なベルトにプリント生地を重ね、金属のバックルとDリング付き。3サイズ。",
        alt: "キャラクター・首輪：キャラクターをプリントした生地を重ねたベルト、金属のバックルとDリング",
      },
    },
    shop: "ショップを見る",
    tiktok: "TikTok Shop",
    external: "（新しいタブで開きます）",
  },

  lab: {
    label: "Kuchimoto Lab",
    title: "AIエージェント、自動化、MVP。固定価格で、すばやく納品。",
    intro:
      "カスタムのAIエージェント、n8nやMakeのワークフロー、WebとモバイルのMVPを開発します。まずは48時間・{price}の動くプロトタイプから。本開発に進む場合、この費用は差し引かれます。",
    demoLink: "AIトリアージのライブデモを試す",
    demoLang: "（英語）",
    prototype: {
      title: "AIエージェントと自動化の開発者に依頼する",
      cards: {
        agent: {
          title: "48時間のAIプロトタイプ：{price}（固定価格）",
          body: "最も時間を取られている作業に、実際に動くAIエージェントや自動化を。本開発に進む場合、{price}は差し引かれます。",
          cta: "{price}で始める",
        },
        mvp: {
          title: "WebまたはモバイルのMVPスプリント：{price}から",
          body: "最初のユーザーに使ってもらえるプロダクトを7日間で。",
          cta: "MVPの範囲を相談する",
        },
        whitelabel: {
          title: "代理店向けホワイトラベル",
          body: "御社のブランドで開発します。顧客と利益は御社のまま。スプリントごとの固定価格です。",
          cta: "パートナーになる",
        },
      },
      also: "そのほか：ITとAIのコンサルティング、IT業務の受託、Google Playテスターの手配と管理。",
    },
    how: {
      title: "進め方",
      steps: [
        "作業内容を教えてください。2分で終わります。",
        "24時間以内に固定価格と作業範囲をお送りします。",
        "ご承認から48時間で動くプロトタイプ。そのあとでご判断いただけます。",
      ],
    },
    demo: {
      label: "ライブデモ",
      title: "ご自身のメールで試す、AIトリアージ・エージェント",
      body: "メールや受信箱のスクリーンショットを貼り付けると、エージェントが仕分けし、3分で読めるエグゼクティブ・ブリーフを作成します。分析はブラウザ内で行われます。",
      cta: "AIトリアージのライブデモを試す",
    },
    notesIntro:
      "フランスの大手公共交通機関のデジタル責任者に提示したアーキテクチャ提案（2026年）：エグゼクティブ・トリアージ・エージェントと、パリから東京までの駅のモデル。",
    ittsui: {
      title: "Ittsui、私たちのアプリ",
      body: "企画から開発、リリースまで、すべて自社で手がけました。Ittsuiは、大切な人との予定を毎週ひとつ提案し、ワンクリックで確定できます。招待された人は、アカウントもアプリも必要ありません。現在アーリーアクセス中です。",
      cta: "Ittsuiを見る",
    },
    contactTitle: "作業内容を教えてください。24時間以内に固定価格をお送りします。",
  },

  studio: {
    label: "Kuchimoto Studio",
    title: "画家が率いる、クリエイティブブランドのためのAIエージェント。",
    intro:
      "商品説明、広告のバリエーション、ローカライズを、ブランドの世界観を保つエージェントが担当します。まずは48時間・{price}の動くプロトタイプから。本開発に進む場合は差し引きます。",
    art: {
      title: "エージェントの背後にある目",
      body: "10年にわたる絵画とイラストレーション。私たちが届けるエージェントはすべて、同じ目で判断されています。",
      caption: "Samuel Louissaint",
      alts: [
        "刀を持つ赤い着物の侍と、手書きの文字",
        "深い青を背景にした、赤とピンクの肖像",
        "赤、白、青の抽象画",
        "黒い線の入った緑の抽象画",
        "黒地にオレンジの円と白い人影",
        "黒、白、赤で描かれた顔",
        "赤、黒、緑の筆致が重なる抽象画",
        "オレンジの形がある緑の抽象画",
      ],
      open: "拡大する",
      close: "閉じる",
      prev: "前の作品",
      next: "次の作品",
      dialog: "Samuel Louissaintの作品",
    },
    agentsTitle: "エージェント",
    agents: [
      [
        "創業者のために",
        "ローンチとブランド",
        "商品のアイデアから、ローンチまでを取りまとめます：ビジュアルの制作、オンラインストアとTikTok Shop向けの商品説明、広告のバリエーション、コンプライアンスの手順の管理。",
      ],
      [
        "アーティスト、フリーランスのために",
        "クライアントと契約",
        "案件ごとの進行を追い、提案書を作成し、フォローアップを行い、基本的な請求処理を始めます。",
      ],
      [
        "海外に展開するブランドのために",
        "海外マーケット",
        "パリ、東京、アメリカ、それぞれの市場で求められるトーンで、文章や購入までの導線を翻訳、ローカライズ、最適化します。",
      ],
    ],
    prototype: {
      label: "まずはここから",
      title: "48時間でエージェントのプロトタイプ",
      body: "一番時間のかかっている作業を対象に、動くプロトタイプを48時間でつくります。本格的に導入する前に、エージェントが働く様子を確かめられます。",
      unit: "税抜。導入に進む場合は、導入費用から差し引きます",
      note: "48時間は、範囲が確定した時点から数えます。",
      cta: "プロトタイプを注文する",
    },
    packages: {
      title: "3つのステップ、3つのプラン。",
      intro: "まず時間がどこに消えているかを把握し、次に構築し、そしてエージェントを動かし続けます。",
      items: {
        audit: {
          name: "業務診断とエージェント設計",
          unit: "1回（税抜）",
          body: "クリエイティブ面と業務面のボトルネックを分析し、オーダーメイドのエージェント構成を設計します。",
          cta: "15分の通話を依頼する",
        },
        deployment: {
          name: "オーダーメイド導入",
          unit: "1プロジェクト（税抜）",
          body: "お使いのツールに合わせて、エージェントを設計し、組み込みます：コンテンツの再活用、多言語ローカライズ、顧客の受け入れ対応。",
        },
        monthly: {
          name: "月額の運用サポート",
          unit: "月額（税抜）",
          body: "監視、指示（プロンプト）の調整、APIの保守、エージェントの増強。",
        },
      },
      note: "正確な料金は範囲によって異なり、診断のあとに一緒に決めます。",
    },
    pilot: ["パイロットプログラム", "最初のお客様には、割引料金でのパイロット導入をご提供します。お気軽にご相談ください。"],
    toLab: { text: "自動化やアプリの開発が必要ですか？", link: "Kuchimoto Labを見る" },
  },

  proof: {
    label: "実績",
    items: [
      "Ittsui：社内で開発し、公開中のアプリ",
      "ご自身のメールで試せる、AIトリアージのライブデモ",
      "フランスの公共交通機関のデジタル責任者に提示した提案",
      "24時間以内にご返信",
    ],
  },

  notes: {
    title: "提案アーキテクチャと戦略ノート",
    tags: ["イル＝ド＝フランスの公共交通 · 旅客情報システム", "駅 · 東京モデル"],
    caseTitle: "都市交通と駅のエコシステム（パリ ↔ 東京）",
    contextLabel: "背景",
    context:
      "競争に開かれた複数事業者の交通網における旅客情報システムと、イル＝ド＝フランスの未来の駅をめぐる、アーキテクチャの検討。",
    problemLabel: "課題",
    problem:
      "複数事業者の調整に追われて飽和したデジタル部門と、日本（東京のエキナカ）に比べてデジタル活用が進んでいない駅の商業施設。",
    proposalLabel: "Kuchimotoが提案するアーキテクチャ",
    demoLink: "このエージェントのデモを見る（英語）",
    proposals: [
      [
        "経営層向けトリアージとIT統制のAIエージェント",
        "事業者やシステムからのアラートを絞り込み、毎日の要約をつくり、自動で振り分けることで、部門長をメールの負担から解放します。",
      ],
      [
        "未来の駅のための、パリと東京の架け橋",
        "東京の駅のデジタル体験（地域のサービス、リアルタイムの情報、地域での顧客づくり）を、イル＝ド＝フランスの駅に取り入れます。",
      ],
    ],
  },

  lead: {
    email: "仕事用メールアドレス",
    needLabel: "ご希望の内容",
    needs: {
      agent: "AIエージェント・自動化",
      mvp: "Web・モバイルのMVP",
      creative: "ブランド向けクリエイティブAI",
      whitelabel: "代理店向けホワイトラベル",
      other: "その他",
    },
    submit: "固定価格を受け取る",
    notice: "24時間以内にご返信します。ニュースレターは送りません。いただいた情報は、ご返信のためだけに使います。",
    privacyLink: "プライバシーポリシー",
    step2: "ステップ 2/2",
    name: "お名前",
    company: "会社名またはウェブサイト",
    optional: "任意",
    message: "何を開発・自動化しますか？",
    messagePlaceholder: "例：3か国語の商品説明の作成に、毎週6時間かかっている。",
    budgetLabel: "予算",
    budgets: { prototype: "まず{price}のプロトタイプ", unsure: "まだ決めていない" },
    timelineLabel: "時期",
    timelines: { week: "今週", month: "今月", exploring: "情報収集中" },
    send: "依頼を送信する",
    sending: "送信中…",
    errors: {
      email: "正しいメールアドレスを入力してください。",
      need: "ご希望の内容を選んでください。",
      name: "お名前を入力してください。",
      invalid: "入力内容をご確認ください。",
      rate_limited: "短時間に送信が続きました。数分後にもう一度お試しください。",
      server: "送信できませんでした。もう一度お試しいただくか、{email}までご連絡ください。",
      network: "接続できません。ネットワークを確認して、もう一度お試しください。",
    },
  },
  cta: {
    header: "48時間でプロトタイプ",
    bar: "48時間でプロトタイプ・{price}",
  },
  thankYou: {
    title: "受け付けました。24時間以内に固定価格をお送りします。",
    book: "待たずに進める：今すぐ15分の通話を予約",
    next: "このあとの流れ",
    steps: [
      "24時間以内に、固定価格と作業範囲をメールでお送りします。",
      "ご承認後、48時間でプロトタイプをお届けします。",
      "続けるかどうかはお客様が決めます。続ける場合、{price}は差し引かれます。",
    ],
  },
  homeStrip: {
    text: "AIやアプリの開発が必要ですか？{price}で、48時間で動くプロトタイプをお届けします。",
    cta: "Kuchimoto Labを見る",
  },
  founder: {
    title: "つくるのは誰か",
    body: "創業者のSamuel Louissaintです。開発者（RNCP Web・モバイル、2021年）として、Google Cloud AI/ML、X、GoDaddyのプログラムでパートナーエンジニアリングと技術営業の経験を積み、10年にわたり画家としても活動しています。開発は自ら行い、プロジェクトにさらに人手が必要なときは、フランス、イスラエル、アジアの信頼できる専門家ネットワークに協力を依頼します。",
    photoAlt: "Samuel Louissaint",
  },
  faq: {
    title: "よくある質問",
    items: [
      ["{price}は本当に差し引かれますか？", "はい。本開発に進む場合、その費用から差し引きます。"],
      ["コードの所有権は誰にありますか？", "お支払い後は、お客様のものです。"],
      ["秘密保持契約（NDA）に署名しますか？", "はい。"],
      [
        "どのようなツールを使いますか？",
        "n8n、Make、OpenAIとAnthropicのAPI、Python、JavaScriptとTypeScript、そしてWebとモバイルのフレームワークです。",
      ],
      [
        "拠点はどこですか？",
        "パリを拠点に、ヨーロッパとアジアのお客様とリモートで仕事をしています。請求はフランスから行います。",
      ],
      ["返信までどのくらいかかりますか？", "24時間以内です。"],
    ],
  },
  about: {
    label: "プロフィール",
    title: "創業者、Samuel Louissaint",
    intro: "フランスとカナダの国籍を持つ、KUCHIMOTOの創業者。",
    photoAlt: "写真：Samuel Louissaintのポートレート",
    pathTitle: "経歴",
    path: [
      "テクニカルセールスとパートナーエンジニアリング：Google Cloud（Concentrix経由、2025年）、X（Teleperformance経由、2024年）、GoDaddy（バルセロナ）。",
      "Gib-San Pools（トロント）での現場経験：プールの施工と改修。",
      "ビジュアルアーティスト。BambooTailsのキャラクターの作者。",
    ],
    companyTitle: "サイト運営者",
    companyRows: {
      name: "氏名",
      status: "区分",
      company: "法人",
      address: "住所",
    },
  },

  contact: {
    label: "お問い合わせ",
    title: "お問い合わせ",
    intro: "該当する事業をお選びください。メッセージは担当者に直接届きます。",
    direct: "または直接",
    studio: "Kuchimoto Studio",
  },

  forms: {
    name: "お名前",
    email: "メールアドレス",
    phone: "電話番号",
    optional: "任意",
    message: "メッセージ",
    company: "会社名",
    city: "都市",
    division: "該当する事業",
    divisionChoose: "選択してください",
    divisions: {
      "hh-thailand": "Happy Homes タイ",
      "hh-canada": "Happy Homes カナダ",
      "hh-usa": "Happy Homes アメリカ",
      bambootails: "BambooTails",
      lab: "Kuchimoto Lab",
    },
    projectType: "プロジェクトの種類",
    projectTypes: {
      consulting: "ITとAIのコンサルティング",
      subcontracting: "ITの受託開発",
      testers: "Google Play向けテスター",
      app: "アプリ",
      other: "その他",
    },
    services: "ご興味のあるサービス",
    location: "地域",
    locations: { denver: "デンバー", florida: "フロリダ" },
    consent: "",
    privacyLink: "プライバシーポリシー",
    consentEnd: "に記載のとおり、入力した情報がお問い合わせへの対応に使われることに同意します。",
    send: "送信する",
    join: "ウェイティングリストに登録する",
    sending: "送信中…",
    success: {
      contact: "メッセージを送信しました。折り返しご連絡します。",
      waitlist: "ウェイティングリストに登録しました。サービスが始まり次第、メールでお知らせします。",
      project: "プロジェクトの内容を受け付けました。折り返しご連絡します。",
    },
    errors: {
      invalid: "入力内容をご確認ください。",
      required: "この項目は必須です。",
      email: "メールアドレスが正しくないようです。",
      rate_limited: "短い時間に送信が続いています。数分後にもう一度お試しください。",
      not_configured: "オンラインでの送信は、まだご利用いただけません。直接メールでご連絡ください。",
      server: "送信できませんでした。もう一度お試しいただくか、直接メールでご連絡ください。",
      network: "インターネットに接続されていません。接続を確認して、もう一度お試しください。",
      payment: "お支払いを開始できませんでした。もう一度お試しいただくか、メールでご連絡ください。",
    },
  },

  booking: {
    title: "予約する",
    intro: "サービスと日付をお選びください。定額のサービスは、ご予約の際にカードでお支払いいただきます。",
    introRequest: "サービスと日付をお選びください。ご依頼の内容は、メールで確認します。",
    alsoOn: "Happy Homes タイのサイトでも、ご予約いただけます：",
    service: "サービス",
    services: {
      oneOff: "単発の清掃",
      weekly: "週1回プラン（初月）",
      deepClean: "入居時、退去時の大掃除",
      aircon: "エアコンクリーニング",
      villaCare: "Villa Care（初月）",
      villaQuote: "ヴィラの清掃（写真をもとにお見積もり）",
    },
    size: "住居",
    sizes: { studio: "スタジオ", oneBed: "1ベッドルーム", twoBed: "2ベッドルーム" },
    units: "エアコンの台数",
    date: "希望日",
    dateHint: "明日以降の日付です。",
    time: "時間帯",
    times: { morning: "午前", afternoon: "午後" },
    address: "パタヤの住所",
    notes: "補足事項",
    notesHint: "入館の方法、ペット、特に気になる箇所など。",
    total: "合計",
    quoteNote: "ヴィラの場合は、写真をもとにお見積もりをお送りします。この時点でのお支払いはありません。",
    monthlyNote: "月額プランの場合、ここでは初月分をお支払いいただきます。",
    terms: "",
    termsLink: "利用規約",
    termsEnd: "に同意します。",
    privacyNote: "入力内容は、",
    privacyNoteEnd: "に従って取り扱います。",
    waiver:
      "14日間の撤回期間が終わる前にサービスを開始することを希望し、サービスが完全に提供された時点で撤回権を失うことを了承します。",
    pay: "{total}をカードで支払う",
    request: "依頼を送信する",
    paymentSoon:
      "オンラインのカード決済は、近日中に始まります。まずはご依頼をお送りください。内容を確認のうえ、お支払いのリンクをお送りします。",
    secure: "Stripeによる安全な決済です。カード情報が当社に送られることはありません。",
    requestDone: "ご依頼を送信しました。日程を確認のうえ、すぐにご連絡します。",
  },

  thanks: {
    title: "ご予約を承りました。",
    body: "お支払いが完了しました。サービスの日時を確認するため、メールでご連絡します。",
    back: "Happy Homes タイに戻る",
  },

  cookies: {
    title: "Cookie",
    body: "同意いただいた場合に限り、訪問の計測と広告の効果測定のために、GoogleアナリティクスとGoogle広告を使用します。拒否してもサイトの利用には影響せず、いつでも変更できます。",
    accept: "同意する",
    refuse: "拒否する",
    more: "詳しく見る",
  },

  notFound: {
    title: "このページは見つかりません。",
    body: "アドレスが変わった可能性があります。",
    home: "ホームに戻る",
  },

  legal: {
    label: "法的情報",
    updated: (date: string) => `最終更新日：${date}`,
    article: (n: number, title: string) => `第${n}条　${title}`,
    toComplete: (what: string) => `[未記入：${what}]`,
    translationNote: "この日本語版は、参考のための翻訳です。正文はフランス語版です。",
    translationLink: "フランス語版を読む",
  },
};

export default ja;
