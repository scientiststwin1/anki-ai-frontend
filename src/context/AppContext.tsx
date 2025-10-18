import React from "react";
import { Story, UserProfile, Word } from "../interface";

// App Context Type Definition
export interface AppContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
  vocabulary: Word[];
  setVocabulary: React.Dispatch<React.SetStateAction<Word[]>>;
  showFirstStoryModal: boolean;
  setShowFirstStoryModal: (show: boolean) => void;
  firstStoryWordCount: number;
  setFirstStoryWordCount: (count: number) => void;
}

// App Context for shared state
export const AppContext = React.createContext<AppContextType | null>(null);

// Custom hook to use the App context
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContext.Provider');
  }
  return context;
};
