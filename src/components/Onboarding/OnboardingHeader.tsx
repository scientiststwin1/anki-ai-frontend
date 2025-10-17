import { BookOpen, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface OnboardingHeaderProps {
  step: number;
}

export function OnboardingHeader({ step }: OnboardingHeaderProps) {
  return (
    <div className="text-center mb-8">
      <motion.div
        className="flex justify-center mb-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <motion.div
          className="bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-4 shadow-xl relative"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
        >
          <BookOpen className="w-10 h-10 text-white" />
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.h1
        className="mb-2 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to StoryLearn! 🎉
      </motion.h1>
      <motion.p
        className="text-muted-foreground text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Let's personalize your learning journey
      </motion.p>

      {/* Progress Steps */}
      <motion.div
        className="flex gap-3 justify-center mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <motion.div
              className={`
                flex items-center justify-center w-10 h-10 rounded-full transition-all
                ${
                  i < step
                    ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md"
                    : i === step
                      ? "bg-gradient-to-br from-primary to-emerald-600 text-white ring-4 ring-primary/20 shadow-lg"
                      : "bg-muted text-muted-foreground"
                }
              `}
              animate={i === step ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {i < step ? <Sparkles className="w-5 h-5" /> : i}
            </motion.div>
            {i < 4 && (
              <motion.div
                className={`w-12 h-1 rounded-full transition-all ${
                  i < step
                    ? "bg-gradient-to-r from-primary to-emerald-600"
                    : "bg-border"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i < step ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
