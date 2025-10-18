import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { BookOpen, Play, Sparkles, Target, Award } from "lucide-react";
import { motion } from "motion/react";
import { Story } from "../../interface";

interface LearningSessionCTAProps {
  unusedWords: any[];
  todayWords: any[];
  completedStoriesCount: number;
  incompleteStories: Story[];
  onSelectStory: (story: Story) => void;
}

export function LearningSessionCTA({
  unusedWords,
  todayWords,
  completedStoriesCount,
  incompleteStories,
  onSelectStory,
}: LearningSessionCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-emerald-50/30 overflow-hidden relative">
        {/* Animated background sparkles */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
        >
          <Sparkles className="w-5 h-5 text-primary/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-4 left-4"
          animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        >
          <Sparkles className="w-4 h-4 text-emerald-500/20" />
        </motion.div>

        <div className="p-6 relative">
          {/* Exciting header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="inline-flex items-center justify-center bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-3 mb-4 shadow-lg"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
            <h2 className="mb-2 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              Let's Learn Together! 🚀
            </h2>
            <p className="text-sm text-muted-foreground">
              {unusedWords.length > 0 && todayWords.length > 0
                ? `${unusedWords.length} exciting new word${unusedWords.length !== 1 ? "s" : ""} + ${todayWords.length} ready to review`
                : unusedWords.length > 0
                  ? `${unusedWords.length} new adventure${unusedWords.length !== 1 ? "s" : ""} waiting for you!`
                  : `${todayWords.length} word${todayWords.length !== 1 ? "s" : ""} ready for review today`}
            </p>
          </div>

          {/* Animated stat badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {unusedWords.length > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                {/* <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1.5 shadow-md">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  {unusedWords.length} New
                </Badge> */}
              </motion.div>
            )}
            {todayWords.length > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0 px-3 py-1.5 shadow-md">
                  <Target className="w-3 h-3 mr-1.5" />
                  {todayWords.length} Review
                </Badge>
              </motion.div>
            )}
            {completedStoriesCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1.5 border-2 border-green-200 bg-green-50"
                >
                  <Award className="w-3 h-3 mr-1.5 text-green-600" />
                  <span className="text-green-700">
                    {completedStoriesCount} Done
                  </span>
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Exciting CTA Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() =>
                incompleteStories.length > 0 &&
                incompleteStories[0] &&
                onSelectStory(incompleteStories[0])
              }
              disabled={incompleteStories.length === 0}
              className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 gap-2 h-14 text-lg shadow-lg relative overflow-hidden group"
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-200%", "200%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                <span>
                  {incompleteStories.length > 0
                    ? "Start Learning Now"
                    : "Preparing your adventure..."}
                </span>
              </motion.div>
            </Button>
          </motion.div>

          {/* Story preview */}
          {/* {currentStory && incompleteStories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-center"
            >
              <p className="text-xs text-muted-foreground mb-1">Up next:</p>
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm">
                  {currentStory.title}
                </span>
              </div>
            </motion.div>
          )} */}
        </div>
      </Card>
    </motion.div>
  );
}
