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
        "国際グループ＆スタジオ（テクノロジー・サービス・クリエイティブ）のKUCHIMOTO。Happy Homes（タイ、カナダ、アメリカのハウスサービス）、BambooTails（犬のアクセサリー）、Kuchimoto Lab（ITとAIのコンサルティング）。",
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
      title: "Kuchimoto Lab、ITとAIのコンサルティング",
      description:
        "ITとAIのコンサルティング、ITの受託開発、Google Play向けテスターの手配、Ittsuiをはじめとする自社アプリ。",
    },
    studio: {
      title: "Kuchimoto Studio、クリエイターのためのAIエージェント",
      description:
        "Kuchimoto Labのサービス、Kuchimoto Studio。クリエイティブエージェンシー、ブランド、起業家のための自律型AIエージェント。商品のローンチ、顧客対応、各市場向けのローカライズ。",
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
    tagline: "国際グループ＆スタジオ。テクノロジー・サービス・クリエイティブ。",
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
    eyebrow: "テクノロジー・サービス・クリエイティブ",
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
    label: "テクノロジー",
    title: "Kuchimoto Lab",
    intro: "デジタルプロダクトをつくる企業のための、コンサルティング、開発、テスト。",
    photoAlt: "写真：開発者の作業スペース",
    servicesTitle: "事業内容",
    services: [
      ["ITとAIのコンサルティング", "アーキテクチャ、クラウドプロバイダー、AIモデルを選び、導入まで行います。"],
      ["ITの受託開発", "単発の案件から長期のプロジェクトまで、技術面でチームを支えます。"],
      [
        "Google Play向けテスターの手配",
        "Google Playでは、新しい個人デベロッパーアカウントは、アプリを公開する前に、テスターのグループによるテストを受ける必要があります。そのテスターを手配し、テストを管理します。",
      ],
      ["自社アプリ", "Ittsuiをはじめ、自社のアプリも開発しています。"],
    ],
    ittsui: "Ittsuiを見る",
    sprints: {
      title: "短期スプリント",
      intro:
        "成果物は明確に、範囲はお客様と一緒に決めます。メールでご連絡いただければ、範囲を確定し、お見積もりをお送りします。24時間以内にご返信します。",
      quote: "お見積もり",
      scope: "範囲に合わせてご提案",
      items: {
        ai: {
          label: "AIと自動化",
          name: "AI・デバッグスプリント（48時間）",
          body: "AIエージェント、自動化、オーダーメイドのスクリプト、または急ぎの技術的な問題の解決。",
          cta: "このスプリントを予約する",
          mail: {
            subject: "AI・デバッグスプリント（48時間）",
            body: "はじめまして。\n\n48時間のAI・デバッグスプリントを予約したいと考えています。\n\n内容：\n対象のツールやコード：\n希望の期限：\n",
          },
        },
        mvp: {
          label: "開発",
          name: "Web・モバイルMVPスプリント（7日間）",
          body: "最初のユーザーに試してもらえる、Webまたはモバイルの動くプロトタイプ。",
          cta: "MVPを始める",
          mail: {
            subject: "Web・モバイルMVPスプリント（7日間）",
            body: "はじめまして。\n\nMVPスプリントを始めたいと考えています。\n\nプロダクトの概要（一文で）：\nWebかモバイルか：\n希望の開始日：\n",
          },
        },
      },
      note: "事業者向けのサービスです。期間は、範囲が確定した時点から数えます。",
    },
    studio: {
      label: "クリエイターのためのAIエージェント",
      title: "Kuchimoto Studio",
      body: "エージェンシー、ブランド、起業家のために、クリエイティブの周辺業務をこなすAIエージェント。",
      cta: "Kuchimoto Studioを見る",
    },
    formTitle: "プロジェクトについてお聞かせください",
  },

  studio: {
    label: "Kuchimoto Labのサービス",
    title: "Kuchimoto Studio",
    intro: "クリエイティブの周辺業務をこなすAIエージェント。",
    lead: "私たちがつくるのは、ただのチャットボットではありません。複数のステップにわたるクリエイティブ業務、市場をまたぐローカライズ、マルチチャネルのキャンペーン運用を担う、自律型のAIエージェントを導入します。",
    audit: "業務診断を依頼する",
    seePackages: "プランを見る",
    photoAlt: "東京で、作業台に向かって絵を描くアーティストの後ろ姿。",
    photoCaption: "仕事中のアーティスト、東京。",
    photoCredit: "写真：Habib Beaini、Unsplash",
    who: {
      title: "つくることに集中したいのに、それ以外の仕事に追われている人へ。",
      items: [
        "クリエイティブエージェンシー",
        "ファッション、ライフスタイルのECブランド",
        "マーケティングエージェンシー",
        "個人の起業家、アーティスト",
      ],
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
    packages: {
      title: "3つのステップ、3つのプラン。",
      intro: "まず時間がどこに消えているかを把握し、次に構築し、そしてエージェントを動かし続けます。",
      items: {
        audit: {
          name: "業務診断とエージェント設計",
          unit: "1回（税抜）",
          body: "クリエイティブ面と業務面のボトルネックを分析し、オーダーメイドのエージェント構成を設計します。",
          cta: "15分の通話を依頼する",
          mail: {
            subject: "15分の通話：Kuchimoto Studioの業務診断",
            body: "はじめまして。\n\n業務診断について、15分ほどお話ししたいと考えています。\n\n事業の内容：\n一番時間がかかっていること：\n今週の都合のよい日時：\n",
          },
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
    prototype: {
      label: "まずはここから",
      title: "48時間でエージェントのプロトタイプ",
      body: "一番時間のかかっている作業を対象に、動くプロトタイプを48時間でつくります。本格的に導入する前に、エージェントが働く様子を確かめられます。",
      unit: "税抜。導入に進む場合は、導入費用から差し引きます",
      note: "48時間は、範囲が確定した時点から数えます。",
      cta: "プロトタイプを注文する",
      mail: {
        subject: "48時間でエージェントのプロトタイプ",
        body: "はじめまして。\n\n48時間でのエージェントのプロトタイプを依頼したいと考えています。\n\n事業の内容：\nエージェントに任せたい作業：\n使っているツール：\n",
      },
    },
    method: {
      title: "お客様の前に、まず自分たちで使う。",
      items: [
        [
          "まず自社のブランドで",
          "どのエージェントも、まずKUCHIMOTOの事業、BambooTailsのブランド、Happy Homesのサービスで稼働させてから、お客様にご提供します。",
        ],
        ["パイロットプログラム", "最初のお客様には、割引料金でのパイロット導入をご提供します。お気軽にご相談ください。"],
      ],
    },
    ittsui: {
      title: "Ittsui、私たちのアプリ",
      body: "企画から開発、リリースまで、すべて自社で手がけました。Ittsuiは、大切な人との予定を毎週ひとつ提案し、ワンクリックで確定できます。招待された人は、アカウントもアプリも必要ありません。現在アーリーアクセス中です。",
      cta: "Ittsuiを見る",
    },
    partOfLab: "Kuchimoto Studioは、ITとAIのコンサルティングを行うKuchimoto Labのサービスです。",
    toLab: "Kuchimoto Labを見る",
    contact: {
      title: "あなたの事業について、お聞かせください。",
      body: "どんなお仕事をしていて、何に一番時間を取られているかを教えてください。業務診断の日程を決めるため、こちらからご連絡します。",
      subject: "Kuchimoto Studio",
    },
  },

  proof: {
    demo: "オンラインデモ：ご自身のメールでトリアージ・エージェントを試す",
    demoLang: "（フランス語）",
    notes: "アーキテクチャ・ノート：都市交通と駅（パリ ↔ 東京）",
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
    demoLink: "このエージェントのデモを見る（フランス語）",
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
    body: "本サイトは、動作に必要なCookieだけを使用しています。今後アクセス解析を加える場合も、お客様の同意があるときにだけ動作し、同意はいつでも撤回できます。",
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
