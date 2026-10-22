// /src/components/hero.ts
// The classes the /studio and /lab heroes share over their background
// video (components/BackgroundVideo.tsx).

/** Dark enough for white text; from lg up lighter on the right, behind the form card. */
export const HERO_OVERLAY = "bg-ink/65 lg:bg-gradient-to-r lg:from-ink/75 lg:via-ink/60 lg:to-ink/35";

/** The hero's lead form, on a solid card over the video. */
export const HERO_FORM_CARD = "border hairline bg-paper p-5 shadow-[0_24px_48px_-32px_rgba(0,0,0,0.5)] sm:p-8";
