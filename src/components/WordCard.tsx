import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Volume2, X, RotateCcw, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Word {
  id: string;
  text: string;
  translation: string;
  note: string;
  deckId: string;
  nextReviewDate: string;
  isVocabulary: boolean;
}

interface WordCardProps {
  word: Word;
  nativeLanguage: string;
  onComplete: (wordId: string, difficulty: number) => void;
  onClose: () => void;
}

export function WordCard({ word, nativeLanguage, onComplete, onClose }: WordCardProps) {
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
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary rounded-lg p-2">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl">{word.text}</h2>
                    <p className="text-sm text-muted-foreground">Vocabulary Word</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Flashcard */}
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
                        onClick={handleFlip} 
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
                        <Badge variant="secondary" className="bg-green-200 text-green-800">
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
                        onClick={handleFlip}
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

            {/* Rating Section */}
            <AnimatePresence>
              {showRating && isFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 pt-4 border-t-2 border-dashed"
                >
                  <div className="text-center">
                    <h4 className="mb-1">How well did you know this?</h4>
                    <p className="text-sm text-muted-foreground">
                      This helps schedule your next review
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRating(0)}
                      className="group relative overflow-hidden rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-4 transition-all hover:border-red-300 hover:shadow-lg"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">😰</span>
                        <span className="text-sm">Again</span>
                        <span className="text-xs text-muted-foreground">Forgot it</span>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRating(1)}
                      className="group relative overflow-hidden rounded-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4 transition-all hover:border-orange-300 hover:shadow-lg"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">😕</span>
                        <span className="text-sm">Hard</span>
                        <span className="text-xs text-muted-foreground">Struggled</span>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRating(2)}
                      className="group relative overflow-hidden rounded-xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 transition-all hover:border-yellow-300 hover:shadow-lg"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">🤔</span>
                        <span className="text-sm">Good</span>
                        <span className="text-xs text-muted-foreground">Got it</span>
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRating(3)}
                      className="group relative overflow-hidden rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 transition-all hover:border-green-300 hover:shadow-lg"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">😊</span>
                        <span className="text-sm">Easy</span>
                        <span className="text-xs text-muted-foreground">Know it!</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
