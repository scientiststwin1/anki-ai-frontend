import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Play, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Story } from "../../interface";

interface CurrentStoryCardProps {
  currentStory: Story;
  incompleteStoriesCount: number;
  completedStoriesCount: number;
  incompleteStories: Story[];
  onSelectStory: (story: Story) => void;
}

export function CurrentStoryCard({
  currentStory,
  incompleteStoriesCount,
  completedStoriesCount,
  incompleteStories,
  onSelectStory,
}: CurrentStoryCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card
        className={`border-2 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
          currentStory.isComplete
            ? "border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50"
            : "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10"
        }`}
        onClick={() => onSelectStory(currentStory)}
      >
        <div className="p-8">
          <div className="flex items-start gap-4">
            <motion.div
              className={`rounded-xl p-3 shrink-0 ${currentStory.isComplete ? "bg-green-600" : "bg-primary"}`}
              animate={
                currentStory.isComplete
                  ? {
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {currentStory.isComplete ? (
                <Award className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-primary-foreground" />
              )}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={
                    currentStory.isComplete ? "default" : "secondary"
                  }
                  className={`text-xs ${currentStory.isComplete ? "bg-green-600" : ""}`}
                >
                  {currentStory.isComplete
                    ? "✓ Completed"
                    : "Current Story"}
                </Badge>
                {incompleteStoriesCount > 1 &&
                  !currentStory.isComplete && (
                    <>
                      <Badge variant="outline" className="text-xs">
                        Story{" "}
                        {incompleteStories.findIndex(
                          (s) => s.id === currentStory.id,
                        ) + 1}{" "}
                        of {incompleteStoriesCount}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-50 text-green-700 border border-green-200"
                      >
                        {completedStoriesCount} completed
                      </Badge>
                    </>
                  )}
              </div>
              <h2 className="mb-2">{currentStory.title}</h2>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {currentStory.content.substring(0, 120)}...
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {currentStory.isComplete ? (
                  <>
                    <span className="text-green-600">
                      All words mastered!
                    </span>
                    <span>•</span>
                    <span>
                      {
                        currentStory.words.filter((w) => w.isVocabulary)
                          .length
                      }{" "}
                      words
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentStory.words.filter((w) => w.isVocabulary)
                        .length -
                        currentStory.completedWordIds.length}{" "}
                      words remaining
                    </span>
                    <span>•</span>
                    <span className="capitalize">
                      {currentStory.difficulty} level
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {currentStory.isComplete ? (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative flex items-center justify-center gap-3 text-white">
              <Sparkles className="w-5 h-5" />
              <span>Story Completed!</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        ) : (
          <div className="bg-primary px-8 py-4">
            <div className="flex items-center justify-center gap-2 text-primary-foreground">
              <Play className="w-5 h-5" />
              <span>Continue Learning</span>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

