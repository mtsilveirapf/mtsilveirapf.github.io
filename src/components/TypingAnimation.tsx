"use client";

import { useEffect, useState } from "react";

// Reimplementação do code component "TypingAnimation" (Home, codeFile/PKhANBn:default —
// docs/framer-audit.md, seção 2.1/10). Props e valores confirmados via Framer MCP:
// words=["Create 5 component variations"], typeSpeed=150, deleteSpeed=80, delay=2000,
// showCursor=true, cursorStyle="|", repeatType="Infinite", Inter 400/18px, cor branca.
const WORDS = ["Create 5 component variations"];
const TYPE_SPEED = 150;
const DELETE_SPEED = 80;
const PAUSE_DELAY = 2000;

export function TypingAnimation() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIndex % WORDS.length];
    const atFullWord = !deleting && text === current;
    const atEmptyWord = deleting && text === "";
    const delay = atFullWord ? PAUSE_DELAY : deleting ? DELETE_SPEED : TYPE_SPEED;

    const timeout = setTimeout(() => {
      if (atFullWord) {
        setDeleting(true);
        return;
      }
      if (atEmptyWord) {
        setDeleting(false);
        setWordIndex((i) => i + 1);
        return;
      }
      setText((t) =>
        deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex]);

  return (
    <span className="font-inter text-[18px] font-normal text-white">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
