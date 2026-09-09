import React, { useState, useEffect } from 'react';

interface TypewriterTitleProps {
  titles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export const TypewriterTitle: React.FC<TypewriterTitleProps> = ({
  titles,
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 3200,
  className = '',
  cursorClassName = '',
}) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Safe fallback list
  const safeTitles = titles && titles.length > 0 ? titles.filter(Boolean) : ['Madrasah Mandiri Berprestasi'];
  const currentTitle = safeTitles[titleIndex % safeTitles.length] || '';

  // Reset when primary title changes from hero editor
  useEffect(() => {
    setTitleIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
    setIsPaused(false);
  }, [titles[0]]);

  useEffect(() => {
    if (!currentTitle) return;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting) {
      if (charIndex < currentTitle.length) {
        const typeTimer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(typeTimer);
      } else {
        // Reached end of string, pause before deleting (or keep if only 1 title)
        if (safeTitles.length > 1) {
          setIsPaused(true);
        }
      }
    } else {
      if (charIndex > 0) {
        const deleteTimer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
        return () => clearTimeout(deleteTimer);
      } else {
        // Finished deleting, switch to next title
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % safeTitles.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, currentTitle, typingSpeed, deletingSpeed, pauseDuration, safeTitles.length]);

  const displayedText = currentTitle.substring(0, charIndex);

  return (
    <span className={`inline-flex items-center whitespace-nowrap max-w-full ${className}`}>
      <span className="whitespace-nowrap truncate">{displayedText}</span>
      <span
        aria-hidden="true"
        className={`shrink-0 inline-block w-1 sm:w-1.5 h-6 sm:h-8 bg-amber-400 ml-1.5 align-middle rounded-full animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.9)] ${cursorClassName}`}
      />
    </span>
  );
};
