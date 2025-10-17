import { BookOpen, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Word } from "../../interface";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface WordListProps {
  words: Word[];
  onRemoveWord: (wordId: string) => void;
}

export function WordList({ words, onRemoveWord }: WordListProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/10 rounded-lg p-1.5">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <h3 className="flex-1">Your Word Collection</h3>
      </div>

      {words.length === 0 ? (
        <Card className="border-2 border-dashed">
          <div className="p-12 text-center">
            <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="mb-2">No words yet</h4>
            <p className="text-muted-foreground">
              Add your first vocabulary word to get started!
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {words
            .slice()
            .reverse()
            .map((w, index) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02, type: "spring" }}
              >
                <motion.div
                  whileHover={{ scale: 1.01, x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-2 hover:border-primary/30 transition-all hover:shadow-sm bg-gradient-to-br from-white to-primary/5">
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="bg-primary/10 rounded-lg p-1.5 mt-0.5">
                            <BookOpen className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="mb-1">{w.text}</h4>
                            {w.note && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {w.note}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            onRemoveWord(w.id);
                            toast.success(`"${w.text}" removed`);
                          }}
                          className="text-destructive hover:bg-destructive/10 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
