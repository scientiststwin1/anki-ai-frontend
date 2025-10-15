import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ArrowLeft, Plus, Trash2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";

interface Word {
  id: string;
  text: string;
  translation: string;
  note: string;
  deckId: string;
  nextReviewDate: string;
  isVocabulary: boolean;
}

interface Deck {
  id: string;
  name: string;
  color: string;
}

interface DeckViewProps {
  deck: Deck;
  words: Word[];
  onBack: () => void;
  onAddWord: (word: Word) => void;
  onRemoveWord: (wordId: string) => void;
  nativeLanguage: string;
}

export function DeckView({ deck, words, onBack, onAddWord, onRemoveWord, nativeLanguage }: DeckViewProps) {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [note, setNote] = useState("");
  const [showNoteField, setShowNoteField] = useState(false);

  const handleAddWord = () => {
    if (!word.trim() || !translation.trim()) {
      toast.error("Please enter both word and translation");
      return;
    }

    const newWord: Word = {
      id: Date.now().toString(),
      text: word.trim(),
      translation: translation.trim(),
      note: note.trim(),
      deckId: deck.id,
      nextReviewDate: new Date().toISOString(),
      isVocabulary: true,
    };

    onAddWord(newWord);
    toast.success(`"${word}" added to ${deck.name}`);
    
    // Reset form
    setWord("");
    setTranslation("");
    setNote("");
    setShowNoteField(false);
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
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button variant="ghost" onClick={onBack} className="mb-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: deck.color }}
            />
            <h1>{deck.name}</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            {words.length} word{words.length !== 1 ? 's' : ''} in this deck
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Word Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 mb-8">
          <div className="p-6">
            <h3 className="mb-4">Add New Word</h3>
            <div className="space-y-4">
              {/* Word and Translation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="word" className="text-sm">English Word</Label>
                  <Input
                    id="word"
                    placeholder="e.g., adventure"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="bg-card border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="translation" className="text-sm">Translation</Label>
                  <Input
                    id="translation"
                    placeholder={`in ${nativeLanguage}`}
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="bg-card border-2"
                  />
                </div>
              </div>

              {/* Optional Note */}
              <AnimatePresence>
                {showNoteField ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Label htmlFor="note" className="text-sm">Personal Note (Optional)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowNoteField(false);
                          setNote("");
                        }}
                        className="h-auto py-1 px-2 text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                    <Textarea
                      id="note"
                      placeholder="Add context, examples, or anything that helps you remember..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      className="bg-card border-2 resize-none"
                    />
                  </motion.div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNoteField(true)}
                    className="w-full text-muted-foreground"
                  >
                    + Add note (optional)
                  </Button>
                )}
              </AnimatePresence>

              <Button 
                onClick={handleAddWord}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Word
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Press <kbd className="px-1.5 py-0.5 bg-card border rounded text-xs">Enter</kbd> to quickly add words
              </p>
            </div>
          </div>
        </Card>

        {/* Words List */}
        <div>
          <h3 className="mb-4">Words in this deck</h3>
          {words.length === 0 ? (
            <Card className="border-2 border-dashed">
              <div className="p-12 text-center">
                <p className="text-muted-foreground">
                  No words yet. Add your first word above!
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {words.map((word) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <Card className="border-2">
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4>{word.text}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {word.translation}
                            </Badge>
                          </div>
                          {word.note && (
                            <p className="text-sm text-muted-foreground italic">
                              {word.note}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            onRemoveWord(word.id);
                            toast.success(`"${word.text}" removed from deck`);
                          }}
                          className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
