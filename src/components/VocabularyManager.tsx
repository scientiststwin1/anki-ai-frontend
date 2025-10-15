import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Plus, Trash2, ArrowLeft, BookOpen, Sparkles, Target } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { motion, AnimatePresence } from "motion/react";

interface Word {
  id: string;
  text: string;
  translation: string;
  note: string;
  nextReviewDate: string;
  isVocabulary: boolean;
}

interface VocabularyManagerProps {
  words: Word[];
  onBack: () => void;
  onAddWord: (word: Word) => void;
  onRemoveWord: (wordId: string) => void;
  nativeLanguage: string;
}

export function VocabularyManager({ words, onBack, onAddWord, onRemoveWord, nativeLanguage }: VocabularyManagerProps) {
  const [word, setWord] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  const handleAddWord = () => {
    if (!word.trim()) {
      toast.error("Please enter a word");
      return;
    }

    const newWord: Word = {
      id: Date.now().toString(),
      text: word.trim(),
      translation: "", // Empty translation since we removed the field
      note: note.trim(),
      nextReviewDate: new Date().toISOString(),
      isVocabulary: true,
    };

    onAddWord(newWord);
    toast.success(`"${word}" added to vocabulary`);
    
    // Reset form
    setWord("");
    setNote("");
    setShowNote(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddWord();
    }
  };

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
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1>My Vocabulary</h1>
                <p className="text-sm text-muted-foreground">
                  Build your word collection
                </p>
              </div>
            </div>
            {words.length > 0 && (
              <Badge className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0 shadow-sm px-3 py-1.5">
                <Target className="w-3 h-3 mr-1.5" />
                {words.length} {words.length === 1 ? 'word' : 'words'}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Word Form */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-emerald-50/30 mb-8 shadow-sm relative overflow-hidden">
          {/* Decorative sparkle */}
          <motion.div
            className="absolute top-3 right-3"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-primary/20" />
          </motion.div>
          
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-lg p-1.5 shadow-sm">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <h4 className="mb-0">Add New Word</h4>
            </div>
            
            <div className="space-y-2.5">
              {/* Word Input */}
              <div>
                <Label htmlFor="word" className="text-sm">English Word *</Label>
                <Input
                  id="word"
                  placeholder="e.g., adventure"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="mt-1 h-9"
                />
              </div>

              {/* Optional Note */}
              <AnimatePresence>
                {showNote ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Label htmlFor="note" className="text-sm">Personal Note (Optional)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowNote(false);
                          setNote("");
                        }}
                        className="h-7 text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                    <Textarea
                      id="note"
                      placeholder="Add context, mnemonics, or anything that helps you remember..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                  </motion.div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNote(true)}
                    className="text-muted-foreground h-8 text-sm px-2"
                  >
                    + Add personal note
                  </Button>
                )}
              </AnimatePresence>

              {/* Add Button */}
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button 
                  onClick={handleAddWord} 
                  className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 h-10 shadow-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Vocabulary
                </Button>
              </motion.div>

              <p className="text-xs text-center text-muted-foreground pt-0.5">
                💡 Press <kbd className="px-1 py-0.5 bg-muted border rounded text-xs">Enter</kbd> to quickly add words
              </p>
            </div>
          </div>
        </Card>

        {/* Word List */}
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
              {words.slice().reverse().map((w, index) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02, type: "spring" }}
                >
                  <motion.div whileHover={{ scale: 1.01, x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
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
      </div>
    </div>
  );
}
