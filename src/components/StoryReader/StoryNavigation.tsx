import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Story } from "../../interface";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface StoryNavigationProps {
  incompleteStories: Story[];
  currentStoryIndex: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function StoryNavigation({
  incompleteStories,
  currentStoryIndex,
  onPrevious,
  onNext,
}: StoryNavigationProps) {
  if (incompleteStories.length <= 1 || currentStoryIndex < 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      <Card className="border-2 border-primary/20">
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!onPrevious}
              className="flex-1 sm:flex-none"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Story
            </Button>

            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Story {currentStoryIndex + 1} of {incompleteStories.length}
              </span>
            </div>

            <Button
              variant="outline"
              onClick={onNext}
              disabled={!onNext}
              className="flex-1 sm:flex-none"
            >
              Next Story
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
