import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Award, Sparkles, BookOpen } from "lucide-react";

interface FirstStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  wordCount: number;
}

export function FirstStoryModal({ isOpen, onClose, wordCount }: FirstStoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-2 border-green-500/30 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <DialogTitle className="sr-only">First Story Completed</DialogTitle>
        <DialogDescription className="sr-only">
          Congratulations on completing your first story and mastering {wordCount} vocabulary {wordCount === 1 ? 'word' : 'words'}.
        </DialogDescription>
        <div className="text-center py-6">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="w-20 h-20 text-green-400/30" />
            </motion.div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg relative">
              <Award className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 text-green-800"
          >
            First Story Complete! 🎉
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-6 max-w-sm mx-auto"
          >
            Congratulations! You've completed your first story and mastered {wordCount} vocabulary {wordCount === 1 ? 'word' : 'words'}. This is just the beginning of your learning journey!
          </motion.p>

          {/* Stats Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-200/50 mb-6 inline-block"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="text-2xl text-green-700">{wordCount}</div>
                <div className="text-xs text-muted-foreground">Words Mastered</div>
              </div>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={onClose}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              Continue Learning
            </Button>
          </motion.div>

          {/* Decorative sparkles */}
          <motion.div
            className="absolute top-4 left-4"
            animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-green-500/40" />
          </motion.div>
          <motion.div
            className="absolute top-4 right-4"
            animate={{ rotate: [0, -10, 0], y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <Sparkles className="w-4 h-4 text-emerald-500/40" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-8"
            animate={{ rotate: [0, 15, 0], y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="w-3 h-3 text-teal-500/40" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-8"
            animate={{ rotate: [0, -15, 0], y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
          >
            <Sparkles className="w-3 h-3 text-green-500/40" />
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
