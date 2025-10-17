import { Calendar, Sparkles, X } from "lucide-react";
import { Deck, Word } from "../interface";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface TodayVocabularyProps {
  words: Word[];
  decks: Deck[];
  onGenerateStory: () => void;
  onRemoveWord: (wordId: string) => void;
}

export function TodayVocabulary({
  words,
  decks,
  onGenerateStory,
  onRemoveWord,
}: TodayVocabularyProps) {
  const getDeckById = (deckId?: string) => {
    return decks.find((d) => d.id === deckId);
  };

  if (words.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <CardTitle>Today's Vocabulary</CardTitle>
              <CardDescription>No words scheduled for today</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Add words to your vocabulary list to start learning!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Today's Vocabulary</CardTitle>
              <CardDescription>
                {words.length} word{words.length !== 1 ? "s" : ""} to learn
                today
              </CardDescription>
            </div>
          </div>
          <Button onClick={onGenerateStory} size="lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Story
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {words.map((word) => {
            const deck = getDeckById(word.deckId);
            return (
              <div
                key={word.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{word.text}</span>
                    <span className="text-muted-foreground">
                      → {word.translation}
                    </span>
                    {deck && (
                      <Badge variant="secondary" className="gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: deck.color }}
                        />
                        {deck.name}
                      </Badge>
                    )}
                  </div>
                  {word.note && (
                    <p className="text-muted-foreground">{word.note}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveWord(word.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
