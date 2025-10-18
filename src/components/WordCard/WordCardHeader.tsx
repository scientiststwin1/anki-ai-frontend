import { BookOpen, Volume2, X } from "lucide-react";
import { Button } from "../ui/button";

interface WordCardHeaderProps {
  wordText: string;
  onClose: () => void;
}

export function WordCardHeader({ wordText, onClose }: WordCardHeaderProps) {
  return (
    <div className="p-6 border-b bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary rounded-lg p-2">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl">{wordText}</h2>
              <p className="text-sm text-muted-foreground">Vocabulary Word</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
