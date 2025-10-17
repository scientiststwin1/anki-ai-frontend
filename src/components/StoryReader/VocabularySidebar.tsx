import { Award } from "lucide-react";
import { motion } from "motion/react";
import { Story, Word } from "../../interface";
import { Card } from "../ui/card";

interface VocabularySidebarProps {
  story: Story;
  wordProgress: Record<string, number>;
  todayWordIds: string[];
  onWordClick: (word: Word) => void;
  allTodayWordsReviewed: boolean;
  todayWordsInStory: Word[];
  progress: number;
  totalWords: number;
}

export function VocabularySidebar({
  story,
  wordProgress,
  todayWordIds,
  onWordClick,
  allTodayWordsReviewed,
  todayWordsInStory,
  progress,
  totalWords,
}: VocabularySidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="border-2">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="text-sm">Vocabulary Words</h3>
          </div>
          <div className="space-y-2">
            {story.words
              .filter((w) => w.isVocabulary)
              .map((word) => {
                const difficulty = wordProgress[word.id];
                const isDueToday = todayWordIds.includes(word.id);
                const status =
                  difficulty === 3
                    ? {
                        color:
                          "bg-green-100 border-green-300 text-green-700",
                        icon: "✓",
                      }
                    : difficulty === 2
                      ? {
                          color:
                            "bg-yellow-100 border-yellow-300 text-yellow-700",
                          icon: "○",
                        }
                      : difficulty === 1
                        ? {
                            color:
                              "bg-orange-100 border-orange-300 text-orange-700",
                            icon: "!",
                          }
                        : difficulty === 0
                          ? {
                              color:
                                "bg-red-100 border-red-300 text-red-700",
                              icon: "✕",
                            }
                          : {
                              color:
                                "bg-gray-50 border-gray-200 text-gray-600",
                              icon: "·",
                            };

                return (
                  <motion.button
                    key={word.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onWordClick(word)}
                    className={`
                    w-full text-left px-3 py-2 rounded-lg border transition-all
                    ${status.color} hover:shadow-sm
                    ${isDueToday && !difficulty ? "ring-2 ring-primary ring-offset-1" : ""}
                  `}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm flex items-center gap-1.5">
                        {word.text}
                        {isDueToday && !difficulty && (
                          <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded">
                            Today
                          </span>
                        )}
                      </span>
                      <span className="text-xs opacity-60">{status.icon}</span>
                    </div>
                  </motion.button>
                );
              })}
          </div>
        </div>
      </Card>

      {/* Today's Words Completion Status */}
      {allTodayWordsReviewed && progress < 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="mb-2">Today's Words Done!</h3>
              <p className="text-muted-foreground text-sm">
                All {todayWordsInStory.length} scheduled word
                {todayWordsInStory.length !== 1 ? "s" : ""} reviewed!
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Story Completion Status */}
      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="mb-2">All Done!</h3>
              <p className="text-muted-foreground text-sm">
                No new words to review in this story.
              </p>
              <p className="text-green-600 text-sm mt-2">
                Great job learning all{" "}
                {story.words.filter((w) => w.isVocabulary).length} words!
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
