import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Story, Word } from "../../interface";
import { WordCard } from "../WordCard/WordCard";
import { CompletionMessages } from "./CompletionMessages";
import { ProgressSection } from "./ProgressSection";
import { StoryContent } from "./StoryContent";
import { StoryNavigation } from "./StoryNavigation";
import { StoryReaderHeader, StoryTitleSection } from "./StoryReaderHeader";
import { VocabularySidebar } from "./VocabularySidebar";

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
      <StoryReaderHeader
        story={story}
        onBack={onBack}
        progress={progress}
        totalWords={totalWords}
        todayWordsInStory={todayWordsInStory}
        learnedWords={learnedWords}
        incompleteStories={incompleteStories}
        currentStoryIndex={currentStoryIndex}
      />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <StoryTitleSection
          story={story}
          onBack={onBack}
          progress={progress}
          totalWords={totalWords}
          todayWordsInStory={todayWordsInStory}
          learnedWords={learnedWords}
          incompleteStories={incompleteStories}
          currentStoryIndex={currentStoryIndex}
        />

        <CompletionMessages
          progress={progress}
          onNext={onNext}
          incompleteStories={incompleteStories}
          currentStoryIndex={currentStoryIndex}
          allTodayWordsReviewed={allTodayWordsReviewed}
          todayWordsInStory={todayWordsInStory}
        />

        {/* Story Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StoryContent
              story={story}
              wordProgress={wordProgress}
              todayWordIds={todayWordIds}
              onWordClick={setSelectedWord}
            />

            <ProgressSection
              learnedWords={learnedWords}
              totalWords={totalWords}
              progress={progress}
              easyWords={easyWords}
              goodWords={goodWords}
              hardWords={hardWords}
              againWords={againWords}
              todayWordsInStory={todayWordsInStory}
              allTodayWordsReviewed={allTodayWordsReviewed}
            />
          </div>

          <VocabularySidebar
            story={story}
            wordProgress={wordProgress}
            todayWordIds={todayWordIds}
            onWordClick={setSelectedWord}
            allTodayWordsReviewed={allTodayWordsReviewed}
            todayWordsInStory={todayWordsInStory}
            progress={progress}
            totalWords={totalWords}
          />
        </div>

        <StoryNavigation
          incompleteStories={incompleteStories}
          currentStoryIndex={currentStoryIndex}
          onPrevious={onPrevious}
          onNext={onNext}
        />
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
