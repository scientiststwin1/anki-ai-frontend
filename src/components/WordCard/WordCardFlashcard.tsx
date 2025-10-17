import { RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Word } from "../../interface";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface WordCardFlashcardProps {
  word: Word;
  nativeLanguage: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export function WordCardFlashcard({
  word,
  nativeLanguage,
  isFlipped,
  onFlip,
}: WordCardFlashcardProps) {
  return (
    <div className="perspective-1000">
      <AnimatePresence mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-primary/10 to-primary/20 p-8 rounded-xl border-2 border-primary/30 min-h-[240px] flex flex-col justify-center shadow-sm"
          >
            <div className="text-center space-y-6">
              <div>
                <p className="text-muted-foreground mb-2">
                  🤔 Can you remember?
                </p>
                <p className="text-lg">
                  What does <strong>"{word.text}"</strong> mean?
                </p>
              </div>
              <Button
                onClick={onFlip}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                Reveal Answer
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-xl border-2 border-green-300 min-h-[240px] shadow-sm"
          >
            <div className="space-y-5">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">✓</div>
                <Badge
                  variant="secondary"
                  className="bg-green-200 text-green-800"
                >
                  Answer
                </Badge>
              </div>

              <div className="bg-white/60 rounded-lg p-4 border border-green-200">
                <p className="text-xs text-muted-foreground mb-1">
                  Translation ({nativeLanguage})
                </p>
                <p className="text-lg">{word.translation}</p>
              </div>

              {word.note && (
                <div className="bg-white/60 rounded-lg p-4 border border-green-200">
                  <p className="text-xs text-muted-foreground mb-1">
                    Personal Note
                  </p>
                  <p className="text-sm italic">{word.note}</p>
                </div>
              )}

              <Button
                variant="outline"
                onClick={onFlip}
                className="w-full border-green-300 hover:bg-green-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Flip Back
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
