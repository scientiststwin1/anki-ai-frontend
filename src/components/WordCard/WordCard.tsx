import { motion } from "motion/react";
import { useState } from "react";
import { Word } from "../../interface";
import { Card, CardContent } from "../ui/card";
import { WordCardHeader } from "./WordCardHeader";
import { WordCardFlashcard } from "./WordCardFlashcard";
import { WordCardRating } from "./WordCardRating";

interface WordCardProps {
  word: Word;
  nativeLanguage: string;
  onComplete: (wordId: string, difficulty: number) => void;
  onClose: () => void;
}

export function WordCard({
  word,
  nativeLanguage,
  onComplete,
  onClose,
}: WordCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setTimeout(() => setShowRating(true), 300);
    } else {
      setShowRating(false);
    }
  };

  const handleRating = (difficulty: number) => {
    onComplete(word.id, difficulty);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <Card className="border-2 shadow-2xl">
          <WordCardHeader wordText={word.text} onClose={onClose} />

          <CardContent className="p-6 space-y-6">
            <WordCardFlashcard
              word={word}
              nativeLanguage={nativeLanguage}
              isFlipped={isFlipped}
              onFlip={handleFlip}
            />

            <WordCardRating
              showRating={showRating && isFlipped}
              onRating={handleRating}
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
