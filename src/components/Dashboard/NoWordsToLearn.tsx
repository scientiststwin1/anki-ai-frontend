import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { BookOpen, Plus } from "lucide-react";

interface NoWordsToLearnProps {
  onOpenVocabulary: () => void;
}

export function NoWordsToLearn({ onOpenVocabulary }: NoWordsToLearnProps) {
  return (
    <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="p-12 text-center">
        <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h3 className="mb-2">Start Your Learning Journey</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Add vocabulary words to begin your personalized learning
          experience with stories!
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
  );
}

