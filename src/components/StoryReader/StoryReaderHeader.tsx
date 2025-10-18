import { ArrowLeft, BookOpen, Sparkles, Target } from "lucide-react";
import { motion } from "motion/react";
import { Story } from "../../interface";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface StoryReaderHeaderProps {
  story: Story;
  onBack: () => void;
  progress: number;
  totalWords: number;
  todayWordsInStory: any[];
  learnedWords: number;
  incompleteStories?: Story[];
  currentStoryIndex?: number;
}

export function StoryReaderHeader({
  story,
  onBack,
  progress,
  totalWords,
  todayWordsInStory,
  learnedWords,
  incompleteStories,
  currentStoryIndex,
}: StoryReaderHeaderProps) {
  return (
    <div className="border-b bg-card sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
}

export function StoryTitleSection({
  story,
  progress,
  totalWords,
  todayWordsInStory,
  learnedWords,
  incompleteStories,
  currentStoryIndex,
}: StoryReaderHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-primary rounded-xl p-3 shrink-0">
          <BookOpen className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="mb-3">{story.title}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{story.difficulty}</Badge>
            {progress === 100 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Badge className="bg-gradient-to-r from-green-600 to-emerald-600">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Completed!
                </Badge>
              </motion.div>
            )}
            {incompleteStories &&
              incompleteStories.length > 1 &&
              currentStoryIndex !== undefined &&
              currentStoryIndex >= 0 && (
                <Badge variant="outline" className="text-xs">
                  Story {currentStoryIndex + 1} of {incompleteStories.length}
                </Badge>
              )}
          </div>
        </div>
      </div>

      {/* Compact Stats Row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4" />
          <span>
            {totalWords} word{totalWords !== 1 ? "s" : ""}
          </span>
        </div>
        {todayWordsInStory.length > 0 && (
          <div className="flex items-center gap-1.5 text-primary">
            <span>•</span>
            <span>{todayWordsInStory.length} due today</span>
          </div>
        )}
        {learnedWords > 0 && (
          <div className="flex items-center gap-1.5 text-primary">
            <span>•</span>
            <span>{learnedWords} reviewed</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
