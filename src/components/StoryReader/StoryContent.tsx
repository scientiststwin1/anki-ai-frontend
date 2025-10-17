import { Volume2 } from "lucide-react";
import { motion } from "motion/react";
import { Story, Word } from "../../interface";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface StoryContentProps {
  story: Story;
  wordProgress: Record<string, number>;
  todayWordIds: string[];
  onWordClick: (word: Word) => void;
}

export function StoryContent({
  story,
  wordProgress,
  todayWordIds,
  onWordClick,
}: StoryContentProps) {
  // Parse story content and make vocabulary words clickable
  const renderStory = () => {
    const words = story.content.split(/(\s+)/);

    return words.map((word, index) => {
      // Remove punctuation for matching
      const cleanWord = word.replace(/[.,!?;:"""'']/g, "").toLowerCase();
      const vocabWord = story.words.find(
        (w) => w.text.toLowerCase() === cleanWord && w.isVocabulary,
      );

      if (vocabWord) {
        const progress = wordProgress[vocabWord.id];
        const isDueToday = todayWordIds.includes(vocabWord.id);
        const colorClass =
          progress === undefined
            ? isDueToday
              ? "text-primary hover:bg-primary/10 border-b-2 border-primary font-medium"
              : "text-primary hover:bg-primary/10 border-b-2 border-primary/40"
            : progress === 0
              ? "text-red-600 hover:bg-red-50 border-b-2 border-red-300"
              : progress === 1
                ? "text-orange-600 hover:bg-orange-50 border-b-2 border-orange-300"
                : progress === 2
                  ? "text-yellow-600 hover:bg-yellow-50 border-b-2 border-yellow-300"
                  : "text-green-600 hover:bg-green-50 border-b-2 border-green-300";

        return (
          <motion.span
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`cursor-pointer ${colorClass} transition-all rounded-sm px-0.5 inline-block`}
            onClick={() => onWordClick(vocabWord)}
          >
            {word}
          </motion.span>
        );
      }

      return <span key={index}>{word}</span>;
    });
  };

  return (
    <Card className="border-2">
      <div className="p-8">
        {/* Audio Button */}
        <div className="flex justify-end mb-6">
          <Button variant="outline" size="sm" className="gap-2">
            <Volume2 className="w-4 h-4" />
            Listen to Story
          </Button>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="leading-relaxed text-lg">{renderStory()}</p>
        </div>
      </div>
    </Card>
  );
}
