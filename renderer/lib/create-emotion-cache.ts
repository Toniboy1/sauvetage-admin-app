import createCache from "@emotion/cache";

const isBrowser = typeof window !== "undefined";

/**
 * Creates an Emotion cache for styling in the application.
 * @returns The Emotion cache.
 */
export default function createEmotionCache() {
  let insertionPoint: HTMLElement;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector(
      `meta[name="emotion-insertion-point"]`,
    ) as HTMLElement;
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({
    key: "mui-style",
    insertionPoint,
  });
}
