import { Plus, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Word } from "../../interface";
import { addCardMutation } from "../../queries";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function AddWordForm() {
  const [word, setWord] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  const { mutate: addCardMutationMutate } = addCardMutation({
    onSuccess: () => {
      toast.success("Word added to vocabulary");
      setWord("");
      setNote("");
      setShowNote(false);
    },
    onError: () => {
      toast.error("Failed to add word to vocabulary");
    },
  });

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

    addCardMutationMutate({ word: word.trim(), note: note.trim() });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddWord();
    }
  };

  return (
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
            <Label htmlFor="word" className="text-sm">
              English Word *
            </Label>
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
                  <Label htmlFor="note" className="text-sm">
                    Personal Note (Optional)
                  </Label>
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
            💡 Press{" "}
            <kbd className="px-1 py-0.5 bg-muted border rounded text-xs">
              Enter
            </kbd>{" "}
            to quickly add words
          </p>
        </div>
      </div>
    </Card>
  );
}
