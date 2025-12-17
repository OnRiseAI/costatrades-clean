import { useEffect, useState } from "react";

export function useTypewriterPlaceholder(
  phrases: string[],
  options?: {
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseMs?: number;
  },
) {
  const { typeSpeed = 80, deleteSpeed = 40, pauseMs = 2000 } = options || {};

  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;

    const currentPhrase = phrases[index % phrases.length];

    let timeoutId: number | undefined;

    if (!isDeleting && text.length < currentPhrase.length) {
      timeoutId = window.setTimeout(() => {
        setText(currentPhrase.slice(0, text.length + 1));
      }, typeSpeed);
    } else if (!isDeleting && text.length === currentPhrase.length) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseMs);
    } else if (isDeleting && text.length > 0) {
      timeoutId = window.setTimeout(() => {
        setText(currentPhrase.slice(0, text.length - 1));
      }, deleteSpeed);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [phrases, index, text, isDeleting, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
