import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { Story } from "../interface";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface AllStoriesProps {
  stories: Story[];
  onBack: () => void;
  onSelectStory: (story: Story) => void;
}

export function AllStories({
  stories,
  onBack,
  onSelectStory,
}: AllStoriesProps) {
  const completedCount = stories.filter((s) => s.isComplete).length;
  const inProgressCount = stories.filter(
    (s) => !s.isComplete && s.completedWordIds.length > 0,
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-card to-primary/5">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="bg-gradient-to-br from-primary to-emerald-600 rounded-xl p-2.5 shadow-md"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1>Story Library</h1>
                <p className="text-muted-foreground">
                  {stories.length} {stories.length === 1 ? "story" : "stories"}{" "}
                  total
                </p>
              </div>
            </div>
            {/* Quick stats */}
            {stories.length > 0 && (
              <div className="flex gap-2">
                <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {completedCount} Done
                </Badge>
                {inProgressCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="border-2 border-primary/30"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {inProgressCount} Active
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {stories.length === 0 ? (
          <Card className="border-2 border-dashed">
            <div className="p-12 text-center">
              <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2">No stories yet</h3>
              <p className="text-muted-foreground">
                Generate your first story to start learning!
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {stories
              .slice()
              .reverse()
              .map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      className={`border-2 cursor-pointer transition-all relative overflow-hidden ${
                        story.isComplete
                          ? "border-green-500/40 hover:border-green-500/60 bg-gradient-to-br from-green-50/80 to-emerald-50/80 shadow-md hover:shadow-lg"
                          : "border-border hover:border-primary/50 hover:shadow-md bg-gradient-to-br from-white to-primary/5"
                      }`}
                      onClick={() => onSelectStory(story)}
                    >
                      {/* Decorative sparkle for completed stories */}
                      {story.isComplete && (
                        <motion.div
                          className="absolute top-3 right-3"
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Sparkles className="w-4 h-4 text-green-500/40" />
                        </motion.div>
                      )}

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`${story.isComplete ? "bg-gradient-to-br from-green-600 to-emerald-600" : "bg-primary/10"} rounded-lg p-1.5`}
                              >
                                <BookOpen
                                  className={`w-4 h-4 ${story.isComplete ? "text-white" : "text-primary"}`}
                                />
                              </div>
                              <h3 className="flex-1">{story.title}</h3>
                            </div>
                            <p className="text-muted-foreground line-clamp-2 text-sm mb-3">
                              {story.content.substring(0, 150)}...
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5 text-sm">
                          {story.isComplete && (
                            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 shadow-sm">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {!story.isComplete &&
                            story.completedWordIds.length > 0 && (
                              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-sm">
                                <Target className="w-3 h-3 mr-1" />
                                In Progress
                              </Badge>
                            )}
                          <Badge
                            variant="secondary"
                            className="capitalize border-2 border-primary/20"
                          >
                            {story.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {story.words.filter((w) => w.isVocabulary).length}{" "}
                              words
                            </span>
                          </div>
                          {!story.isComplete &&
                            story.completedWordIds.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-primary to-emerald-600"
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${(story.completedWordIds.length / story.words.filter((w) => w.isVocabulary).length) * 100}%`,
                                    }}
                                    transition={{
                                      duration: 0.5,
                                      delay: index * 0.05,
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-primary min-w-[45px]">
                                  {story.completedWordIds.length}/
                                  {
                                    story.words.filter((w) => w.isVocabulary)
                                      .length
                                  }
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
