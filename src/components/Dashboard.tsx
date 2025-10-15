import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Settings, Play, Layers, Plus, Library, Award, Sparkles, Target } from "lucide-react";
import { motion } from "motion/react";

interface Word {
  id: string;
  text: string;
  translation: string;
  note: string;
  nextReviewDate: string;
  isVocabulary: boolean;
}

interface Story {
  id: string;
  title: string;
  content: string;
  words: Word[];
  difficulty: string;
  completedWordIds: string[];
  isComplete: boolean;
}

interface DashboardProps {
  stories: Story[];
  vocabulary: Word[];
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
  vocabulary,
  todayWords,
  unusedWords,
  onSelectStory, 
  onOpenSettings,
  onOpenVocabulary,
  onViewAllStories,
  userProfile,
}: DashboardProps) {
  // Smart story selection: prioritize incomplete stories, then most recent
  const incompleteStories = stories.filter(s => !s.isComplete);
  
  // Check if ALL stories are complete (celebration mode)
  const allStoriesComplete = stories.length > 0 && incompleteStories.length === 0 && unusedWords.length < 2;
  
  // If there are unused words available, only show incomplete stories
  const shouldShowOnlyIncomplete = unusedWords.length >= 2;
  const currentStory = allStoriesComplete 
    ? null 
    : (shouldShowOnlyIncomplete
        ? (incompleteStories.length > 0 ? incompleteStories[0] : null)
        : (incompleteStories.length > 0 
            ? incompleteStories[0] 
            : stories[stories.length - 1]));
  
  const completedStoriesCount = stories.filter(s => s.isComplete).length;
  const incompleteStoriesCount = incompleteStories.length;
  
  // Calculate total words mastered
  const totalWordsMastered = stories.reduce((total, story) => {
    return total + story.words.filter(w => w.isVocabulary).length;
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
            /* Celebration Screen - All Stories Complete */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
                <div className="p-8 text-center relative">
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-3 left-3"
                    animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Sparkles className="w-5 h-5 text-green-500/40" />
                  </motion.div>
                  <motion.div
                    className="absolute top-3 right-3"
                    animate={{ rotate: [0, -10, 0], y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
                  >
                    <Sparkles className="w-5 h-5 text-emerald-500/40" />
                  </motion.div>
                  
                  {/* Main content */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-2 text-green-800"
                  >
                    All Stories Mastered! 🎉
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-muted-foreground text-sm mb-6 max-w-md mx-auto"
                  >
                    Incredible work! You've completed all your stories and mastered every word.
                  </motion.p>

                  {/* Achievement Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-6"
                  >
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-green-200/50">
                      <div className="text-2xl mb-0.5 text-green-700">{completedStoriesCount}</div>
                      <div className="text-xs text-muted-foreground">Stories Completed</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-emerald-200/50">
                      <div className="text-2xl mb-0.5 text-emerald-700">{totalWordsMastered}</div>
                      <div className="text-xs text-muted-foreground">Words Mastered</div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex gap-2 justify-center"
                  >
                    <Button
                      onClick={onOpenVocabulary}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Words
                    </Button>
                    <Button
                      onClick={onViewAllStories}
                      variant="outline"
                      size="sm"
                    >
                      <Library className="w-4 h-4 mr-2" />
                      View Stories
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ) : (unusedWords.length > 0 || todayWords.length > 0) ? (
            /* Learning Session CTA - Exciting and motivating */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-emerald-50/30 overflow-hidden relative">
                {/* Animated background sparkles */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Sparkles className="w-5 h-5 text-primary/20" />
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-4"
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
                >
                  <Sparkles className="w-4 h-4 text-emerald-500/20" />
                </motion.div>

                <div className="p-6 relative">
                  {/* Exciting header */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="inline-flex items-center justify-center bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-3 mb-4 shadow-lg"
                    >
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <BookOpen className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>
                    <h2 className="mb-2 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                      Let's Learn Together! 🚀
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {unusedWords.length > 0 && todayWords.length > 0
                        ? `${unusedWords.length} exciting new word${unusedWords.length !== 1 ? 's' : ''} + ${todayWords.length} ready to review`
                        : unusedWords.length > 0
                        ? `${unusedWords.length} new adventure${unusedWords.length !== 1 ? 's' : ''} waiting for you!`
                        : `${todayWords.length} word${todayWords.length !== 1 ? 's' : ''} ready for review today`}
                    </p>
                  </div>

                  {/* Animated stat badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {unusedWords.length > 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.1 }}
                      >
                        {/* <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1.5 shadow-md">
                          <Sparkles className="w-3 h-3 mr-1.5" />
                          {unusedWords.length} New
                        </Badge> */}
                      </motion.div>
                    )}
                    {todayWords.length > 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2 }}
                      >
                        <Badge className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0 px-3 py-1.5 shadow-md">
                          <Target className="w-3 h-3 mr-1.5" />
                          {todayWords.length} Review
                        </Badge>
                      </motion.div>
                    )}
                    {completedStoriesCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                      >
                        <Badge variant="secondary" className="px-3 py-1.5 border-2 border-green-200 bg-green-50">
                          <Award className="w-3 h-3 mr-1.5 text-green-600" />
                          <span className="text-green-700">{completedStoriesCount} Done</span>
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Exciting CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => incompleteStories.length > 0 && incompleteStories[0] && onSelectStory(incompleteStories[0])}
                      disabled={incompleteStories.length === 0}
                      className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 gap-2 h-14 text-lg shadow-lg relative overflow-hidden group"
                    >
                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="relative flex items-center gap-2"
                      >
                        <Play className="w-5 h-5" />
                        <span>{incompleteStories.length > 0 ? "Start Learning Now" : "Preparing your adventure..."}</span>
                      </motion.div>
                    </Button>
                  </motion.div>

                  {/* Story preview */}
                  {/* {currentStory && incompleteStories.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 text-center"
                    >
                      <p className="text-xs text-muted-foreground mb-1">Up next:</p>
                      <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-sm">
                          {currentStory.title}
                        </span>
                      </div>
                    </motion.div>
                  )} */}
                </div>
              </Card>
            </motion.div>
          ) : currentStory ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className={`border-2 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
                currentStory.isComplete 
                  ? 'border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50' 
                  : 'border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10'
              }`} onClick={() => onSelectStory(currentStory)}>
                <div className="p-8">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`rounded-xl p-3 shrink-0 ${currentStory.isComplete ? 'bg-green-600' : 'bg-primary'}`}
                      animate={currentStory.isComplete ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      {currentStory.isComplete ? (
                        <Award className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-primary-foreground" />
                      )}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={currentStory.isComplete ? "default" : "secondary"} className={`text-xs ${currentStory.isComplete ? 'bg-green-600' : ''}`}>
                          {currentStory.isComplete ? '✓ Completed' : 'Current Story'}
                        </Badge>
                        {incompleteStoriesCount > 1 && !currentStory.isComplete && (
                          <>
                            <Badge variant="outline" className="text-xs">
                              Story {incompleteStories.findIndex(s => s.id === currentStory.id) + 1} of {incompleteStoriesCount}
                            </Badge>
                            <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border border-green-200">
                              {completedStoriesCount} completed
                            </Badge>
                          </>
                        )}
                      </div>
                      <h2 className="mb-2">{currentStory.title}</h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {currentStory.content.substring(0, 120)}...
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {currentStory.isComplete ? (
                          <>
                            <span className="text-green-600">All words mastered!</span>
                            <span>•</span>
                            <span>{currentStory.words.filter(w => w.isVocabulary).length} words</span>
                          </>
                        ) : (
                          <>
                            <span>{currentStory.words.filter(w => w.isVocabulary).length - currentStory.completedWordIds.length} words remaining</span>
                            <span>•</span>
                            <span className="capitalize">{currentStory.difficulty} level</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {currentStory.isComplete ? (
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10" />
                    <div className="relative flex items-center justify-center gap-3 text-white">
                      <Sparkles className="w-5 h-5" />
                      <span>Story Completed!</span>
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                ) : (
                  <div className="bg-primary px-8 py-4">
                    <div className="flex items-center justify-center gap-2 text-primary-foreground">
                      <Play className="w-5 h-5" />
                      <span>Continue Learning</span>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ) : (
            /* No words to learn */
            <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="p-12 text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2">Start Your Learning Journey</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Add vocabulary words to begin your personalized learning experience with stories!
                </p>
                <Button 
                  onClick={onOpenVocabulary}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Words
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <Card className="border-2">
            <div className="p-6 text-center">
              <div className="text-3xl mb-1 text-primary">{vocabulary.length}</div>
              <div className="text-sm text-muted-foreground">Total Words</div>
            </div>
          </Card>
          <Card className="border-2">
            <div className="p-6 text-center">
              <div className="text-3xl mb-1 text-primary">{completedStoriesCount}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </Card>
          <Card className="border-2">
            <div className="p-6 text-center">
              <div className="text-3xl mb-1 text-primary">{todayWords.length}</div>
              <div className="text-sm text-muted-foreground">Words Today</div>
            </div>
          </Card>
          <Card className={`border-2 ${unusedWords.length > 0 ? 'border-amber-300 bg-amber-50/50' : ''}`}>
            <div className="p-6 text-center">
              <div className={`text-3xl mb-1 ${unusedWords.length > 0 ? 'text-amber-600' : 'text-muted-foreground'}`}>
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

          <Card className="border-2 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all" onClick={onOpenVocabulary}>
            <div className="p-5 text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h4 className="mb-1">
                {vocabulary.length} {vocabulary.length === 1 ? 'Word' : 'Words'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {vocabulary.length === 0 
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
              {stories.slice().reverse().slice(0, 3).map((story) => (
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
                          {story.words.filter(w => w.isVocabulary).length} words • {story.difficulty}
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
