export interface OnboardingData {
    englishLevel: string;
    nativeLanguage: string;
    age: string;
    genres: string[];
}

export interface OnboardingProps {
    onComplete: (data: OnboardingData) => void;
}

export interface StepProps {
    data: OnboardingData;
    updateData: (field: keyof OnboardingData, value: string | string[]) => void;
}

export const GENRE_OPTIONS = [
    { id: "adventure", label: "Adventure", icon: "🏔️" },
    { id: "mystery", label: "Mystery", icon: "🔍" },
    { id: "scifi", label: "Science Fiction", icon: "🚀" },
    { id: "romance", label: "Romance", icon: "💕" },
    { id: "fantasy", label: "Fantasy", icon: "🧙" },
    { id: "realistic", label: "Realistic Fiction", icon: "🌆" },
];
