// /src/components/ArtGallery.tsx
// Samuel's paintings on /studio (#art): a grid of thumbnails, each opening
// a full-screen view. A native <dialog>, so Escape closes it and focus
// stays inside; the arrow keys and the two buttons move between works.

"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

export type Artwork = { src: string; alt: string };

export function ArtGallery({
  images,
  caption,
  labels,
}: {
  images: Artwork[];
  caption: string;
  labels: { open: string; close: string; prev: string; next: string; dialog: string };
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  function open(i: number, button: HTMLButtonElement) {
    opener.current = button;
    setIndex(i);
    dialog.current?.showModal();
  }
  const step = (by: number) => setIndex((i) => (i === null ? i : (i + by + images.length) % images.length));
  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };
  const control =
    "grid min-h-11 min-w-11 place-items-center border border-paper/40 px-4 text-sm text-paper hover:bg-paper/10";
  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={(event) => open(i, event.currentTarget)}
              className="group relative block aspect-square w-full overflow-hidden bg-washi"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="sr-only">{labels.open}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-soft">{caption}</p>

      <dialog
        ref={dialog}
        aria-label={labels.dialog}
        onKeyDown={onKeyDown}
        onClose={() => {
          setIndex(null);
          opener.current?.focus();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink/80"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex justify-end p-3">
              <button type="button" onClick={() => dialog.current?.close()} className={control}>
                {labels.close}
              </button>
            </div>
            <figure className="relative flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain px-4 sm:px-16" />
            </figure>
            <div className="flex items-center justify-between gap-4 p-3">
              <button type="button" onClick={() => step(-1)} className={control}>
                <span aria-hidden>←</span>
                <span className="sr-only">{labels.prev}</span>
              </button>
              <p className="text-center text-sm text-paper/80">
                {current.alt} · {caption}
              </p>
              <button type="button" onClick={() => step(1)} className={control}>
                <span aria-hidden>→</span>
                <span className="sr-only">{labels.next}</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
