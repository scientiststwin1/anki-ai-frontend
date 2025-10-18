import { AnimatePresence, motion } from "motion/react";

interface WordCardRatingProps {
  showRating: boolean;
  onRating: (difficulty: number) => void;
}

export function WordCardRating({ showRating, onRating }: WordCardRatingProps) {
  return (
    <AnimatePresence>
      {showRating && (
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
              onClick={() => onRating(0)}
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
              onClick={() => onRating(1)}
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
              onClick={() => onRating(2)}
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
              onClick={() => onRating(3)}
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
  );
}
