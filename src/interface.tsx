export interface Word {
  id: string;
  text: string;
  translation: string;
  note: string;
  deckId?: string;
  nextReviewDate: string;
  isVocabulary: boolean;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  words: Word[];
  difficulty: string;
  completedWordIds: string[];
  isComplete: boolean;
}

export interface Deck {
  id: string;
  name: string;
  color: string;
}

export interface UserProfile {
  englishLevel: string;
  nativeLanguage: string;
  age: string;
  genres: string[];
}
