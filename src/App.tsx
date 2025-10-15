import { useState } from "react";
import { toast } from "sonner";
import { AllStories } from "./components/AllStories";
import { Dashboard } from "./components/Dashboard";
import { FirstStoryModal } from "./components/FirstStoryModal";
import { Onboarding } from "./components/Onboarding";
import { Settings } from "./components/Settings";
import { StoryReader } from "./components/StoryReader";
import { Toaster } from "./components/ui/sonner";
import { VocabularyManager } from "./components/VocabularyManager";
import { Story, UserProfile, Word } from "./interface";

// Story generation based on user's vocabulary words
const generateStoryFromWords = (words: Word[], profile: UserProfile): Story => {
  if (words.length === 0) {
    return {
      id: Date.now().toString(),
      title: "No Vocabulary Words",
      content: "Please add vocabulary words to generate a story.",
      words: [],
      difficulty: profile.englishLevel,
      completedWordIds: [],
      isComplete: false,
    };
  }

  // Pick a random genre from user's preferences
  const genre =
    profile.genres[Math.floor(Math.random() * profile.genres.length)] ||
    "adventure";

  const genreThemes: Record<
    string,
    { setting: string; character: string; action: string }
  > = {
    adventure: {
      setting: "a mysterious jungle",
      character: "Alex the explorer",
      action: "embarked on a thrilling expedition",
    },
    mystery: {
      setting: "an old mansion",
      character: "Detective Sarah",
      action: "investigated a puzzling case",
    },
    scifi: {
      setting: "a distant planet",
      character: "Captain Nova",
      action: "explored an unknown galaxy",
    },
    romance: {
      setting: "a charming coastal town",
      character: "Emma",
      action: "discovered unexpected feelings",
    },
    fantasy: {
      setting: "a magical kingdom",
      character: "Aria the wizard",
      action: "sought ancient magic",
    },
    realistic: {
      setting: "a bustling city",
      character: "Jordan",
      action: "faced everyday challenges",
    },
  };

  const theme = genreThemes[genre] || genreThemes.adventure;

  // Generate story title using the first word
  const titleWord =
    words[0].text.charAt(0).toUpperCase() + words[0].text.slice(1);
  const title = `The ${titleWord} Adventure`;

  // Create a more natural story incorporating vocabulary words
  let storyContent = `In ${theme.setting}, ${theme.character} ${theme.action}. `;

  // Build story with vocabulary words woven in naturally
  words.forEach((word, index) => {
    const wordInContext = word.text.toLowerCase();

    if (index === 0) {
      storyContent += `The ${wordInContext} began unexpectedly on a quiet morning. `;
    } else if (index === 1) {
      storyContent += `${theme.character} felt a sense of ${wordInContext} building inside. `;
    } else if (index === words.length - 1) {
      storyContent += `In the end, through great ${wordInContext}, everything fell into place. `;
    } else if (index % 2 === 0) {
      storyContent += `Along the way, something ${wordInContext} caught their attention. `;
    } else {
      storyContent += `The ${wordInContext} of the moment was unforgettable. `;
    }
  });

  storyContent += `Through this experience, ${theme.character} learned valuable lessons that would last a lifetime. This journey, with all its twists and turns, became a story worth telling again and again.`;

  return {
    id: Date.now().toString(),
    title,
    content: storyContent,
    words: words,
    difficulty: profile.englishLevel,
    completedWordIds: [],
    isComplete: false,
  };
};

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const [vocabulary, setVocabulary] = useState<Word[]>([]);
  const [showFirstStoryModal, setShowFirstStoryModal] = useState(false);
  const [firstStoryWordCount, setFirstStoryWordCount] = useState(0);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  // Get words scheduled for today
  const getTodayWords = (): Word[] => {
    const today = new Date().toDateString();
    return vocabulary.filter((word) => {
      const reviewDate = new Date(word.nextReviewDate).toDateString();
      return reviewDate === today;
    });
  };

  const handleAddWord = (word: Word) => {
    const newVocabulary = [...vocabulary, word];
    setVocabulary(newVocabulary);

    // Auto-generate stories when we have enough words
    // Check if we now have enough unused words to create stories
    setTimeout(() => {
      const usedWordIds = new Set<string>();
      stories.forEach((story) => {
        story.words.forEach((w) => {
          usedWordIds.add(w.id);
        });
      });
      const unusedWords = newVocabulary.filter((w) => !usedWordIds.has(w.id));

      // Auto-generate if we have at least 2 unused words
      if (unusedWords.length >= 2 && userProfile) {
        const WORDS_PER_STORY = 4;
        const newStories: Story[] = [];

        if (unusedWords.length > 10) {
          // Create multiple stories when more than 10 words
          let storyIndex = 0;
          for (let i = 0; i < unusedWords.length; i += WORDS_PER_STORY) {
            const storyWords = unusedWords.slice(i, i + WORDS_PER_STORY);
            if (storyWords.length >= 2) {
              const story = generateStoryFromWords(storyWords, userProfile);
              story.id = `${Date.now()}-${storyIndex++}`;
              newStories.push(story);
            }
          }
          setStories((prev) => [...prev, ...newStories]);
          toast.success(
            `Created ${newStories.length} new stories with your words!`,
          );
        } else if (unusedWords.length >= 2) {
          // Create single story
          const story = generateStoryFromWords(unusedWords, userProfile);
          setStories((prev) => [...prev, story]);
          toast.success(`New story created with ${unusedWords.length} words!`);
        }
      }
    }, 100);
  };

  const handleRemoveWord = (wordId: string) => {
    setVocabulary(vocabulary.filter((w) => w.id !== wordId));
  };

  // Get words that haven't been used in any story yet
  const getUnusedWords = (): Word[] => {
    const usedWordIds = new Set<string>();
    stories.forEach((story) => {
      story.words.forEach((word) => {
        usedWordIds.add(word.id);
      });
    });
    return vocabulary.filter((word) => !usedWordIds.has(word.id));
  };

  const handleGenerateStory = () => {
    if (userProfile) {
      const unusedWords = getUnusedWords();
      const todayWords = getTodayWords();

      // Prioritize unused words, then today's words
      let wordsToUse: Word[] = [];

      if (unusedWords.length >= 2) {
        // Use unused words
        wordsToUse = unusedWords;
      } else if (todayWords.length > 0) {
        // Use today's words
        wordsToUse = todayWords;
      } else {
        toast.error("No words available. Add some vocabulary words first!");
        return;
      }

      // Check if there are incomplete stories (only block if no unused words)
      const incompleteStories = stories.filter((s) => !s.isComplete);
      if (incompleteStories.length > 0 && unusedWords.length === 0) {
        toast.error(
          "Please finish your current stories before generating a new one!",
        );
        return;
      }

      // Create multiple stories if there are many words (4 words per story)
      const WORDS_PER_STORY = 4;
      const newStories: Story[] = [];

      if (wordsToUse.length > 10) {
        // Create multiple stories when more than 10 words
        let storyIndex = 0;
        for (let i = 0; i < wordsToUse.length; i += WORDS_PER_STORY) {
          const storyWords = wordsToUse.slice(i, i + WORDS_PER_STORY);
          if (storyWords.length >= 2) {
            const story = generateStoryFromWords(storyWords, userProfile);
            // Ensure unique ID by adding index
            story.id = `${Date.now()}-${storyIndex++}`;
            newStories.push(story);
          }
        }
        setStories([...stories, ...newStories]);
        setCurrentStory(newStories[0]);
        toast.success(
          `Created ${newStories.length} new stories with ${wordsToUse.length} words!`,
        );
      } else {
        // Create single story
        const newStory = generateStoryFromWords(wordsToUse, userProfile);
        setStories([...stories, newStory]);
        setCurrentStory(newStory);
        toast.success(`Story created with ${wordsToUse.length} words!`);
      }
    }
  };

  const handleSelectStory = (story: Story) => {
    setCurrentStory(story);
  };

  const handleBackToDashboard = () => {
    setCurrentStory(null);
    setShowAllStories(false);
  };

  const handleViewAllStories = () => {
    setShowAllStories(true);
  };

  const handleStoryProgress = (storyId: string, completedWordIds: string[]) => {
    setStories((prevStories) => {
      const updatedStories = prevStories.map((story) => {
        if (story.id === storyId) {
          const vocabularyWords = story.words.filter((w) => w.isVocabulary);
          const isComplete =
            vocabularyWords.length > 0 &&
            vocabularyWords.every((w) => completedWordIds.includes(w.id));

          const wasNotComplete = !story.isComplete;

          // Update the current story reference if this is the active one
          const updatedStory = {
            ...story,
            completedWordIds,
            isComplete,
          };

          if (currentStory && currentStory.id === storyId) {
            setCurrentStory(updatedStory);
          }

          // Show completion toast or modal when story is completed
          if (isComplete && wasNotComplete) {
            // Check if this is the first story ever completed
            const completedStoriesCount = prevStories.filter(
              (s) => s.isComplete,
            ).length;
            const isFirstStory = completedStoriesCount === 0;

            setTimeout(() => {
              if (isFirstStory) {
                // Show special modal for first story completion
                setFirstStoryWordCount(vocabularyWords.length);
                setShowFirstStoryModal(true);
              } else {
                // Show regular toast for subsequent stories
                toast.success(
                  `Story completed! You've mastered all ${vocabularyWords.length} words! 🎉`,
                );
              }
            }, 500);
          }

          return updatedStory;
        }
        return story;
      });

      return updatedStories;
    });
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleSaveSettings = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowSettings(false);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleOpenVocabulary = () => {
    setShowVocabulary(true);
  };

  const handleCloseVocabulary = () => {
    setShowVocabulary(false);
  };

  // Show onboarding if no user profile
  if (!userProfile) {
    return (
      <>
        <Onboarding onComplete={handleOnboardingComplete} />
        <Toaster />
      </>
    );
  }

  // Show settings
  if (showSettings) {
    return (
      <>
        <Settings
          userProfile={userProfile}
          onSave={handleSaveSettings}
          onBack={handleCloseSettings}
        />
        <Toaster />
      </>
    );
  }

  // Show vocabulary manager
  if (showVocabulary) {
    return (
      <>
        <VocabularyManager
          words={vocabulary}
          onBack={handleCloseVocabulary}
          onAddWord={handleAddWord}
          onRemoveWord={handleRemoveWord}
          nativeLanguage={userProfile.nativeLanguage}
        />
        <Toaster />
      </>
    );
  }

  // Show story reader if a story is selected
  if (currentStory) {
    const incompleteStories = stories.filter((s) => !s.isComplete);
    const currentIndex = incompleteStories.findIndex(
      (s) => s.id === currentStory.id,
    );

    // If current story is complete, we're not in the incomplete list
    // but we should still show next button if there are incomplete stories
    const hasPrevious = currentIndex > 0;
    const hasNext = currentStory.isComplete
      ? incompleteStories.length > 0 // If current is complete, show next if ANY incomplete stories exist
      : currentIndex >= 0 && currentIndex < incompleteStories.length - 1; // Normal navigation

    const handlePrevious = () => {
      if (hasPrevious) {
        setCurrentStory(incompleteStories[currentIndex - 1]);
      }
    };

    const handleNext = () => {
      // If current story is complete, go to first incomplete story
      // Otherwise, go to next in the list
      if (currentStory.isComplete && incompleteStories.length > 0) {
        setCurrentStory(incompleteStories[0]);
      } else if (hasNext && currentIndex >= 0) {
        setCurrentStory(incompleteStories[currentIndex + 1]);
      }
    };

    return (
      <>
        <StoryReader
          story={currentStory}
          onBack={handleBackToDashboard}
          nativeLanguage={userProfile.nativeLanguage}
          onStoryProgress={handleStoryProgress}
          todayWords={getTodayWords()}
          incompleteStories={incompleteStories}
          currentStoryIndex={currentIndex}
          onPrevious={hasPrevious ? handlePrevious : undefined}
          onNext={hasNext ? handleNext : undefined}
        />
        <Toaster />
      </>
    );
  }

  // Show all stories view
  if (showAllStories) {
    return (
      <>
        <AllStories
          stories={stories}
          onBack={handleBackToDashboard}
          onSelectStory={handleSelectStory}
        />
        <Toaster />
      </>
    );
  }

  // Show dashboard
  return (
    <>
      <Dashboard
        stories={stories}
        vocabulary={vocabulary}
        todayWords={getTodayWords()}
        unusedWords={getUnusedWords()}
        onSelectStory={handleSelectStory}
        onOpenSettings={handleOpenSettings}
        onOpenVocabulary={handleOpenVocabulary}
        onViewAllStories={handleViewAllStories}
        userProfile={userProfile}
      />
      <FirstStoryModal
        isOpen={showFirstStoryModal}
        onClose={() => setShowFirstStoryModal(false)}
        wordCount={firstStoryWordCount}
      />
      <Toaster />
    </>
  );
}
