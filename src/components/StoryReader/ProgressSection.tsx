import { Award, Sparkles, Target } from "lucide-react";
import { motion } from "motion/react";
import { Card } from "../ui/card";

interface ProgressSectionProps {
  learnedWords: number;
  totalWords: number;
  progress: number;
  easyWords: number;
  goodWords: number;
  hardWords: number;
  againWords: number;
  todayWordsInStory: any[];
  allTodayWordsReviewed: boolean;
}

export function ProgressSection({
  learnedWords,
  totalWords,
  progress,
  easyWords,
  goodWords,
  hardWords,
  againWords,
  todayWordsInStory,
  allTodayWordsReviewed,
}: ProgressSectionProps) {
  if (learnedWords === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="mt-6 border-2 border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="p-5 flex gap-3">
            <div className="shrink-0">
              <div className="bg-primary rounded-lg p-2">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h4 className="text-sm mb-2 text-primary">How to Learn</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Click any{" "}
                <span className="text-primary border-b-2 border-primary/60 px-1">
                  highlighted word
                </span>{" "}
                to see its meaning and rate your knowledge. Your progress is
                saved automatically.
              </p>
              {todayWordsInStory.length > 0 && (
                <div className="mt-3 pt-3 border-t border-primary/20">
                  <p className="text-sm text-primary flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>
                      <strong>{todayWordsInStory.length}</strong> word
                      {todayWordsInStory.length !== 1 ? "s" : ""} scheduled for
                      today
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6"
    >
      {progress === 100 ? (
        // Celebration Card - Story Complete
        <Card className="border border-green-600/40 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 overflow-hidden relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(74,157,127,0.1),transparent)]"
          />
          <div className="p-4 relative">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  duration: 0.6,
                  delay: 0.2,
                }}
                className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-2 shadow-md shrink-0"
              >
                <Award className="w-5 h-5 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-green-800 text-sm">Amazing Work! 🎉</h4>
                  <p className="text-green-700 text-xs mt-0.5">
                    You've reviewed all <strong>{totalWords} words</strong>
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Progress Stats */}
            {(easyWords > 0 ||
              goodWords > 0 ||
              hardWords > 0 ||
              againWords > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-4 gap-2 mt-4"
              >
                {easyWords > 0 && (
                  <div className="bg-white/70 rounded-md p-2 text-center border border-green-200">
                    <div className="text-green-600">{easyWords}</div>
                    <div className="text-xs text-green-700">Easy</div>
                  </div>
                )}
                {goodWords > 0 && (
                  <div className="bg-white/70 rounded-md p-2 text-center border border-yellow-200">
                    <div className="text-yellow-600">{goodWords}</div>
                    <div className="text-xs text-yellow-700">Good</div>
                  </div>
                )}
                {hardWords > 0 && (
                  <div className="bg-white/70 rounded-md p-2 text-center border border-orange-200">
                    <div className="text-orange-600">{hardWords}</div>
                    <div className="text-xs text-orange-700">Hard</div>
                  </div>
                )}
                {againWords > 0 && (
                  <div className="bg-white/70 rounded-md p-2 text-center border border-red-200">
                    <div className="text-red-600">{againWords}</div>
                    <div className="text-xs text-red-700">Again</div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </Card>
      ) : (
        // Active Progress Card
        <Card className="border border-primary/30 bg-gradient-to-br from-primary/5 to-white">
          <div className="p-4">
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="bg-primary/10 rounded-lg p-1.5">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs text-primary">Your Progress</h4>
                  <p className="text-xs text-muted-foreground">
                    {learnedWords} of {totalWords} reviewed
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="text-primary"
              >
                {Math.round(progress)}%
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="relative h-2.5 bg-primary/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                />
                {/* Shine effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </div>

              {/* Rating Breakdown */}
              {(easyWords > 0 ||
                goodWords > 0 ||
                hardWords > 0 ||
                againWords > 0) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {easyWords > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-green-50 border border-green-200 rounded px-2 py-1 text-center"
                    >
                      <span className="text-xs text-green-700">
                        {easyWords} easy
                      </span>
                    </motion.div>
                  )}
                  {goodWords > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-yellow-50 border border-yellow-200 rounded px-2 py-1 text-center"
                    >
                      <span className="text-xs text-yellow-700">
                        {goodWords} good
                      </span>
                    </motion.div>
                  )}
                  {hardWords > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-orange-50 border border-orange-200 rounded px-2 py-1 text-center"
                    >
                      <span className="text-xs text-orange-700">
                        {hardWords} hard
                      </span>
                    </motion.div>
                  )}
                  {againWords > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-red-50 border border-red-200 rounded px-2 py-1 text-center"
                    >
                      <span className="text-xs text-red-700">
                        {againWords} again
                      </span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
