import localFont from "next/font/local";

// Shippori Mincho for titles, Zen Kaku Gothic New for text, self-hosted:
// only their Latin slice (fonts/, from Google Fonts, SIL Open Font
// License), which covers French and English, œ, « » and € included.
// Loaded from Google, each family came with hundreds of @font-face rules
// for its Japanese characters: about 165 KB of CSS the browser had to read
// before showing anything, on every page. Japanese text now uses the
// reader's own Japanese fonts (globals.css), Hiragino, Yu or Noto.
// Weights in use: 500 for titles, 400 and 500 for text.

// The Latin slice's characters, written out in each call: the font loader
// only accepts literal values.
export const mincho = localFont({
  src: [{ path: "./fonts/shippori-mincho-500-latin.woff2", weight: "500", style: "normal" }],
  variable: "--font-mincho",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  declarations: [
    {
      prop: "unicode-range",
      value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

export const gothic = localFont({
  src: [
    { path: "./fonts/zen-kaku-gothic-new-400-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/zen-kaku-gothic-new-500-latin.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-gothic",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

export const fontVariables = `${mincho.variable} ${gothic.variable}`;
