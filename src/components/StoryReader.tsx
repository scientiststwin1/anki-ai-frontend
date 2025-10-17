import {
  ArrowLeft,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
  Target,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Story, Word } from "../interface";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { WordCard } from "./WordCard/WordCard";

interface StoryReaderProps {
  story: Story;
  onBack: () => void;
  nativeLanguage: string;
  onStoryProgress?: (storyId: string, completedWordIds: string[]) => void;
  todayWords?: Word[];
  incompleteStories?: Story[];
  currentStoryIndex?: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function StoryReader({
  story,
  onBack,
  nativeLanguage,
  onStoryProgress,
  todayWords = [],
  incompleteStories = [],
  currentStoryIndex = -1,
  onPrevious,
  onNext,
}: StoryReaderProps) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [wordProgress, setWordProgress] = useState<Record<string, number>>(
    () => {
      // Initialize with already completed words
      const initial: Record<string, number> = {};
      story.completedWordIds.forEach((wordId) => {
        initial[wordId] = 3; // Mark as easy (completed)
      });
      return initial;
    },
  );

  // Only sync on story ID change (different story loaded), not on completedWordIds changes
  useEffect(() => {
    const initial: Record<string, number> = {};
    story.completedWordIds.forEach((wordId) => {
      initial[wordId] = 3; // Mark as easy (completed)
    });
    setWordProgress(initial);
  }, [story.id]); // Changed from story.completedWordIds to story.id

  // Parse story content and make vocabulary words clickable
  const renderStory = () => {
    const words = story.content.split(/(\s+)/);

    return words.map((word, index) => {
      // Remove punctuation for matching
      const cleanWord = word.replace(/[.,!?;:"""'']/g, "").toLowerCase();
      const vocabWord = story.words.find(
        (w) => w.text.toLowerCase() === cleanWord && w.isVocabulary,
      );

      if (vocabWord) {
        const progress = wordProgress[vocabWord.id];
        const isDueToday = todayWordIds.includes(vocabWord.id);
        const colorClass =
          progress === undefined
            ? isDueToday
              ? "text-primary hover:bg-primary/10 border-b-2 border-primary font-medium"
              : "text-primary hover:bg-primary/10 border-b-2 border-primary/40"
            : progress === 0
              ? "text-red-600 hover:bg-red-50 border-b-2 border-red-300"
              : progress === 1
                ? "text-orange-600 hover:bg-orange-50 border-b-2 border-orange-300"
                : progress === 2
                  ? "text-yellow-600 hover:bg-yellow-50 border-b-2 border-yellow-300"
                  : "text-green-600 hover:bg-green-50 border-b-2 border-green-300";

        return (
          <motion.span
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`cursor-pointer ${colorClass} transition-all rounded-sm px-0.5 inline-block`}
            onClick={() => setSelectedWord(vocabWord)}
          >
            {word}
          </motion.span>
        );
      }

      return <span key={index}>{word}</span>;
    });
  };

  const handleWordComplete = (wordId: string, difficulty: number) => {
    const newProgress = {
      ...wordProgress,
      [wordId]: difficulty,
    };
    setWordProgress(newProgress);
    setSelectedWord(null);

    // Check if this completes all today's words
    const completedWordIds = Object.keys(newProgress);
    const todayWordsInStoryIds = todayWordsInStory.map((w) => w.id);
    const justCompletedTodayWords =
      todayWordsInStoryIds.length > 0 &&
      todayWordsInStoryIds.every((id) => completedWordIds.includes(id)) &&
      !Object.keys(wordProgress).every((id) =>
        todayWordsInStoryIds.includes(id)
          ? completedWordIds.includes(id)
          : true,
      );

    // Report progress to parent
    if (onStoryProgress) {
      onStoryProgress(story.id, completedWordIds);
    }

    // Show toast if all today's words are now complete
    if (justCompletedTodayWords) {
      setTimeout(() => {
        toast.success(
          `Great work! You've reviewed all ${todayWordsInStory.length} words scheduled for today! 🎉`,
        );
      }, 300);
    }
  };

  const totalWords = story.words.filter((w) => w.isVocabulary).length;
  const learnedWords = Object.keys(wordProgress).length;
  const progress = totalWords > 0 ? (learnedWords / totalWords) * 100 : 0;

  // Calculate stats
  const againWords = Object.values(wordProgress).filter((d) => d === 0).length;
  const hardWords = Object.values(wordProgress).filter((d) => d === 1).length;
  const goodWords = Object.values(wordProgress).filter((d) => d === 2).length;
  const easyWords = Object.values(wordProgress).filter((d) => d === 3).length;

  // Check if all today's words have been reviewed
  const todayWordIds = todayWords.map((w) => w.id);
  const todayWordsInStory = story.words.filter(
    (w) => w.isVocabulary && todayWordIds.includes(w.id),
  );
  const todayWordsCompleted = todayWordsInStory.every((w) =>
    Object.keys(wordProgress).includes(w.id),
  );
  const allTodayWordsReviewed =
    todayWordsInStory.length > 0 && todayWordsCompleted;

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header - Only Back Button */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Story Title and Meta */}
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
                      Story {currentStoryIndex + 1} of{" "}
                      {incompleteStories.length}
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
                      <h4 className="text-primary">
                        Ready for the Next Story?
                      </h4>
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

        {/* Story Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-2">
              <div className="p-8">
                {/* Audio Button */}
                <div className="flex justify-end mb-6">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Volume2 className="w-4 h-4" />
                    Listen to Story
                  </Button>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="leading-relaxed text-lg">{renderStory()}</p>
                </div>
              </div>
            </Card>

            {/* Progress Section */}
            {learnedWords > 0 && (
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
                            <h4 className="text-green-800 text-sm">
                              Amazing Work! 🎉
                            </h4>
                            <p className="text-green-700 text-xs mt-0.5">
                              You've reviewed all{" "}
                              <strong>{totalWords} words</strong>
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
                              <div className="text-xs text-yellow-700">
                                Good
                              </div>
                            </div>
                          )}
                          {hardWords > 0 && (
                            <div className="bg-white/70 rounded-md p-2 text-center border border-orange-200">
                              <div className="text-orange-600">{hardWords}</div>
                              <div className="text-xs text-orange-700">
                                Hard
                              </div>
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
                            <h4 className="text-xs text-primary">
                              Your Progress
                            </h4>
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
            )}

            {/* Learning Tip - Only show when starting */}
            {learnedWords === 0 && (
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
                      <h4 className="text-sm mb-2 text-primary">
                        How to Learn
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Click any{" "}
                        <span className="text-primary border-b-2 border-primary/60 px-1">
                          highlighted word
                        </span>{" "}
                        to see its meaning and rate your knowledge. Your
                        progress is saved automatically.
                      </p>
                      {todayWordsInStory.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-primary/20">
                          <p className="text-sm text-primary flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            <span>
                              <strong>{todayWordsInStory.length}</strong> word
                              {todayWordsInStory.length !== 1 ? "s" : ""}{" "}
                              scheduled for today
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar with Vocabulary List */}
          <div className="space-y-6">
            <Card className="border-2">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="text-sm">Vocabulary Words</h3>
                </div>
                <div className="space-y-2">
                  {story.words
                    .filter((w) => w.isVocabulary)
                    .map((word) => {
                      const difficulty = wordProgress[word.id];
                      const isDueToday = todayWordIds.includes(word.id);
                      const status =
                        difficulty === 3
                          ? {
                              color:
                                "bg-green-100 border-green-300 text-green-700",
                              icon: "✓",
                            }
                          : difficulty === 2
                            ? {
                                color:
                                  "bg-yellow-100 border-yellow-300 text-yellow-700",
                                icon: "○",
                              }
                            : difficulty === 1
                              ? {
                                  color:
                                    "bg-orange-100 border-orange-300 text-orange-700",
                                  icon: "!",
                                }
                              : difficulty === 0
                                ? {
                                    color:
                                      "bg-red-100 border-red-300 text-red-700",
                                    icon: "✕",
                                  }
                                : {
                                    color:
                                      "bg-gray-50 border-gray-200 text-gray-600",
                                    icon: "·",
                                  };

                      return (
                        <motion.button
                          key={word.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedWord(word)}
                          className={`
                          w-full text-left px-3 py-2 rounded-lg border transition-all
                          ${status.color} hover:shadow-sm
                          ${isDueToday && !difficulty ? "ring-2 ring-primary ring-offset-1" : ""}
                        `}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm flex items-center gap-1.5">
                              {word.text}
                              {isDueToday && !difficulty && (
                                <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded">
                                  Today
                                </span>
                              )}
                            </span>
                            <span className="text-xs opacity-60">
                              {status.icon}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                </div>
              </div>
            </Card>

            {/* Today's Words Completion Status */}
            {allTodayWordsReviewed && progress < 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-3">✨</div>
                    <h3 className="mb-2">Today's Words Done!</h3>
                    <p className="text-muted-foreground text-sm">
                      All {todayWordsInStory.length} scheduled word
                      {todayWordsInStory.length !== 1 ? "s" : ""} reviewed!
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Story Completion Status */}
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <h3 className="mb-2">All Done!</h3>
                    <p className="text-muted-foreground text-sm">
                      No new words to review in this story.
                    </p>
                    <p className="text-green-600 text-sm mt-2">
                      Great job learning all{" "}
                      {story.words.filter((w) => w.isVocabulary).length} words!
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        {incompleteStories.length > 1 && currentStoryIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Card className="border-2 border-primary/20">
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={onPrevious}
                    disabled={!onPrevious}
                    className="flex-1 sm:flex-none"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous Story
                  </Button>

                  <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      Story {currentStoryIndex + 1} of{" "}
                      {incompleteStories.length}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={onNext}
                    disabled={!onNext}
                    className="flex-1 sm:flex-none"
                  >
                    Next Story
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {selectedWord && (
        <WordCard
          word={selectedWord}
          nativeLanguage={nativeLanguage}
          onComplete={handleWordComplete}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  );
}
