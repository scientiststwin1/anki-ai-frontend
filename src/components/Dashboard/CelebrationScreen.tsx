import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Award, Plus, Library, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface CelebrationScreenProps {
  completedStoriesCount: number;
  totalWordsMastered: number;
  onOpenVocabulary: () => void;
  onViewAllStories: () => void;
}

export function CelebrationScreen({
  completedStoriesCount,
  totalWordsMastered,
  onOpenVocabulary,
  onViewAllStories,
}: CelebrationScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        <div className="p-8 text-center relative">
          {/* Decorative elements */}
          <motion.div
            className="absolute top-3 left-3"
            animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Sparkles className="w-5 h-5 text-green-500/40" />
          </motion.div>
          <motion.div
            className="absolute top-3 right-3"
            animate={{ rotate: [0, -10, 0], y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          >
            <Sparkles className="w-5 h-5 text-emerald-500/40" />
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-2 text-green-800"
          >
            All Stories Mastered! 🎉
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-sm mb-6 max-w-md mx-auto"
          >
            Incredible work! You've completed all your stories and mastered
            every word.
          </motion.p>

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-6"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-green-200/50">
              <div className="text-2xl mb-0.5 text-green-700">
                {completedStoriesCount}
              </div>
              <div className="text-xs text-muted-foreground">
                Stories Completed
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-emerald-200/50">
              <div className="text-2xl mb-0.5 text-emerald-700">
                {totalWordsMastered}
              </div>
              <div className="text-xs text-muted-foreground">
                Words Mastered
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-2 justify-center"
          >
            <Button
              onClick={onOpenVocabulary}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Words
            </Button>
            <Button onClick={onViewAllStories} variant="outline" size="sm">
              <Library className="w-4 h-4 mr-2" />
              View Stories
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
