import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { BookOpen, Settings, Layers, Plus, Library } from "lucide-react";
import { Story, Word } from "../../interface";
import { CelebrationScreen } from "./CelebrationScreen";
import { LearningSessionCTA } from "./LearningSessionCTA";
import { CurrentStoryCard } from "./CurrentStoryCard";
import { NoWordsToLearn } from "./NoWordsToLearn";
import { getAllCards } from "../../queries";

interface DashboardProps {
  stories: Story[];
  todayWords: Word[];
  unusedWords: Word[];
  onSelectStory: (story: Story) => void;
  onOpenSettings: () => void;
  onOpenVocabulary: () => void;
  onViewAllStories: () => void;
  userProfile: {
    englishLevel: string;
    nativeLanguage: string;
    age: string;
    genres: string[];
  };
}

export function Dashboard({
  stories,
  todayWords,
  unusedWords,
  onSelectStory,
  onOpenSettings,
  onOpenVocabulary,
  onViewAllStories,
  userProfile,
}: DashboardProps) {
  const { data: getAllCardsData } = getAllCards();

  // Smart story selection: prioritize incomplete stories, then most recent
  const incompleteStories = stories.filter((s) => !s.isComplete);

  // Check if ALL stories are complete (celebration mode)
  const allStoriesComplete =
    stories.length > 0 &&
    incompleteStories.length === 0 &&
    unusedWords.length < 2;

  // If there are unused words available, only show incomplete stories
  const shouldShowOnlyIncomplete = unusedWords.length >= 2;
  const currentStory = allStoriesComplete
    ? null
    : shouldShowOnlyIncomplete
      ? incompleteStories.length > 0
        ? incompleteStories[0]
        : null
      : incompleteStories.length > 0
        ? incompleteStories[0]
        : stories[stories.length - 1];

  const completedStoriesCount = stories.filter((s) => s.isComplete).length;
  const incompleteStoriesCount = incompleteStories.length;

  // Calculate total words mastered
  const totalWordsMastered = stories.reduce((total, story) => {
    return total + story.words.filter((w) => w.isVocabulary).length;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-xl p-2">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg">StoryLearn</h2>
          </div>
          <Button onClick={onOpenSettings} variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main CTA - Continue Learning */}
        <div className="mb-12">
          {allStoriesComplete ? (
            <CelebrationScreen
              completedStoriesCount={completedStoriesCount}
              totalWordsMastered={totalWordsMastered}
              onOpenVocabulary={onOpenVocabulary}
              onViewAllStories={onViewAllStories}
            />
          ) : unusedWords.length > 0 || todayWords.length > 0 ? (
            <LearningSessionCTA
              unusedWords={unusedWords}
              todayWords={todayWords}
              completedStoriesCount={completedStoriesCount}
              incompleteStories={incompleteStories}
              onSelectStory={onSelectStory}
            />
          ) : currentStory ? (
            <CurrentStoryCard
              currentStory={currentStory}
              incompleteStoriesCount={incompleteStoriesCount}
              completedStoriesCount={completedStoriesCount}
              incompleteStories={incompleteStories}
              onSelectStory={onSelectStory}
            />
          ) : (
            <NoWordsToLearn onOpenVocabulary={onOpenVocabulary} />
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <Card className="border-2">
            <div className="p-6 text-center">
              <div className="text-3xl mb-1 text-primary">
                {getAllCardsData?.data?.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Words</div>
            </div>
          </Card>
          <Card className="border-2">
            <div className="p-6 text-center">
              <div className="text-3xl mb-1 text-primary">
                {completedStoriesCount}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </Card>
          <Card className="border-2">
            <div className="p-6 text-center">
              <div className="text-3xl mb-1 text-primary">
                {todayWords.length}
              </div>
              <div className="text-sm text-muted-foreground">Words Today</div>
            </div>
          </Card>
          <Card
            className={`border-2 ${unusedWords.length > 0 ? "border-amber-300 bg-amber-50/50" : ""}`}
          >
            <div className="p-6 text-center">
              <div
                className={`text-3xl mb-1 ${unusedWords.length > 0 ? "text-amber-600" : "text-muted-foreground"}`}
              >
                {unusedWords.length}
              </div>
              <div className="text-sm text-muted-foreground">New Words</div>
            </div>
          </Card>
        </div>

        {/* Vocabulary Quick Access */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3>My Vocabulary</h3>
            <Button onClick={onOpenVocabulary} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Words
            </Button>
          </div>

          <Card
            className="border-2 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all"
            onClick={onOpenVocabulary}
          >
            <div className="p-5 text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h4 className="mb-1">
                {getAllCardsData?.data?.length}{" "}
                {getAllCardsData?.data?.length === 1 ? "Word" : "Words"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {getAllCardsData?.data?.length === 0
                  ? "Start building your vocabulary library"
                  : "Click to manage your vocabulary"}
              </p>
            </div>
          </Card>
        </div>

        {/* Stories Section */}
        {stories.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3>Recent Stories</h3>
                {incompleteStoriesCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {incompleteStoriesCount} in progress
                  </Badge>
                )}
              </div>
              {stories.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onViewAllStories}
                  className="text-primary hover:bg-primary/10"
                >
                  <Library className="w-4 h-4 mr-1" />
                  View All ({stories.length})
                </Button>
              )}
            </div>
            <div className="grid gap-3">
              {stories
                .slice()
                .reverse()
                .slice(0, 3)
                .map((story) => (
                  <Card
                    key={story.id}
                    className="border-2 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all"
                    onClick={() => onSelectStory(story)}
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="truncate mb-1">{story.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {story.words.filter((w) => w.isVocabulary).length}{" "}
                            words • {story.difficulty}
                          </p>
                        </div>
                        <BookOpen className="w-5 h-5 text-primary shrink-0" />
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
