import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";

// Shippori Mincho for titles, a Japanese serif with a full Latin set;
// Zen Kaku Gothic New for text. latin-ext covers French (œ, Œ).
export const mincho = Shippori_Mincho({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  variable: "--font-mincho",
  display: "swap",
});

export const gothic = Zen_Kaku_Gothic_New({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-gothic",
  display: "swap",
});

export const fontVariables = `${mincho.variable} ${gothic.variable}`;
