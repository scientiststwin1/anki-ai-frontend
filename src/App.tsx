import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FirstStoryModal } from "./components/FirstStoryModal";
import { Toaster } from "./components/ui/sonner";
import { AppRouter } from "./router";
import { AppContext } from "./context/AppContext";
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


function AppContent() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [vocabulary, setVocabulary] = useState<Word[]>([]);
  const [showFirstStoryModal, setShowFirstStoryModal] = useState(false);
  const [firstStoryWordCount, setFirstStoryWordCount] = useState(0);

  const contextValue = {
    userProfile,
    setUserProfile,
    stories,
    setStories,
    vocabulary,
    setVocabulary,
    showFirstStoryModal,
    setShowFirstStoryModal,
    firstStoryWordCount,
    setFirstStoryWordCount,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <AppRouter />
      <FirstStoryModal
        isOpen={showFirstStoryModal}
        onClose={() => setShowFirstStoryModal(false)}
        wordCount={firstStoryWordCount}
      />
      <Toaster />
    </AppContext.Provider>
  );
}


export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
