import { Navigate, Route, Routes } from "react-router-dom";
import { AllStories } from "./components/AllStories";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Onboarding } from "./components/Onboarding/Onboarding";
import { Settings } from "./components/Settings";
import { StoryReader } from "./components/StoryReader/StoryReader";
import { VocabularyManager } from "./components/VocabularyManager/VocabularyManager";
import { useAppContext } from "./context/AppContext";

// Main router component
export function AppRouter() {
  const { userProfile, setUserProfile } = useAppContext();

  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding onComplete={(profile) => setUserProfile(profile)} />} />
      <Route path="/" element={userProfile ? <Dashboard /> : <Navigate to="/onboarding" replace />} />
      <Route path="/settings" element={userProfile ? <Settings /> : <Navigate to="/onboarding" replace />} />
      <Route path="/vocabulary" element={userProfile ? <VocabularyManager /> : <Navigate to="/onboarding" replace />} />
      <Route path="/story/:storyId" element={userProfile ? <StoryReader /> : <Navigate to="/onboarding" replace />} />
      <Route path="/stories" element={userProfile ? <AllStories /> : <Navigate to="/onboarding" replace />} />
    </Routes>
  );
}