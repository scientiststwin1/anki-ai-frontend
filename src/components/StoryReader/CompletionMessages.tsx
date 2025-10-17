import { BookOpen, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Story } from "../../interface";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface CompletionMessagesProps {
  progress: number;
  onNext?: () => void;
  incompleteStories?: Story[];
  currentStoryIndex?: number;
  allTodayWordsReviewed: boolean;
  todayWordsInStory: any[];
}

export function CompletionMessages({
  progress,
  onNext,
  incompleteStories,
  currentStoryIndex,
  allTodayWordsReviewed,
  todayWordsInStory,
}: CompletionMessagesProps) {
  return (
    <>
      {/* Next Story Prompt - Show when story is complete and there are more stories */}
      {progress === 100 && onNext && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="border-2 border-primary/40 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary rounded-full p-2">
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-primary">Ready for the Next Story?</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      You have{" "}
                      {(incompleteStories?.length || 1) -
                        (currentStoryIndex || 0) -
                        1}{" "}
                      more{" "}
                      {(incompleteStories?.length || 1) -
                        (currentStoryIndex || 0) -
                        1 ===
                      1
                        ? "story"
                        : "stories"}{" "}
                      to complete
                    </p>
                  </div>
                </div>
                <Button
                  onClick={onNext}
                  className="bg-primary hover:bg-primary/90 shrink-0"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Today's Words Complete Message */}
      {allTodayWordsReviewed && progress < 100 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="border-2 border-green-600/40 bg-gradient-to-r from-green-50 to-green-100/50">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 rounded-full p-2">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-green-800">Great work! 🎉</h4>
                  <p className="text-sm text-green-700 mt-0.5">
                    You've reviewed all {todayWordsInStory.length} word
                    {todayWordsInStory.length !== 1 ? "s" : ""} scheduled for
                    today!
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </>
  );
}
