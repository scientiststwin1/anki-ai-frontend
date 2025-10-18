import { ArrowLeft, BookOpen, Target } from "lucide-react";
import { motion } from "motion/react";
import { Word } from "../../interface";
import { AddWordForm } from "./AddWordForm";
import { WordList } from "./WordList";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { getAllCards } from "../../queries";

interface VocabularyManagerProps {
  onBack: () => void;
  onRemoveWord: (wordId: string) => void;
  nativeLanguage: string;
}

export function VocabularyManager({
  onBack,
  onRemoveWord,
  nativeLanguage,
}: VocabularyManagerProps) {
  const { data: getAllCardsData } = getAllCards();

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
            {getAllCardsData?.data?.length > 0 && (
              <Badge className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0 shadow-sm px-3 py-1.5">
                <Target className="w-3 h-3 mr-1.5" />
                {getAllCardsData?.data?.length}{" "}
                {getAllCardsData?.data?.length === 1 ? "word" : "words"}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Add Word Form */}
        <AddWordForm />

        {/* Word List */}
        <WordList onRemoveWord={onRemoveWord} />
      </div>
    </div>
  );
}
