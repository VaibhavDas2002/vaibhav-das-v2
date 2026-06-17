"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
}

export default function Typewriter({ words, className = "" }: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex];

    if (isWaiting) {
      setIsWaiting(false);
      setIsDeleting(true);
      return;
    }

    if (!isDeleting) {
      if (currentText.length < currentWord.length) {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
        return;
      }
      // Word is complete, wait before deleting
      setIsWaiting(true);
      return;
    }

    if (currentText.length > 0) {
      setCurrentText(currentText.slice(0, -1));
      return;
    }

    // Deletion complete, move to next word
    setIsDeleting(false);
    setCurrentWordIndex((prev) => (prev + 1) % words.length);
  }, [currentWordIndex, currentText, isDeleting, isWaiting, words]);

  useEffect(() => {
    const timeout = setTimeout(
      type,
      isWaiting ? 2000 : isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [type, isWaiting, isDeleting]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}
