import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { GENRE_OPTIONS, StepProps } from "./types";

export function Step4({ data, updateData }: StepProps) {
  const toggleGenre = (genreId: string) => {
    const newGenres = data.genres.includes(genreId)
      ? data.genres.filter((g) => g !== genreId)
      : [...data.genres, genreId];
    updateData("genres", newGenres);
  };

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="mb-2">
          What types of stories do you enjoy?
        </h2>
        <p className="text-muted-foreground">
          Select at least one genre (you can choose multiple)
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {GENRE_OPTIONS.map((genre, idx) => (
          <motion.button
            key={genre.id}
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05, type: "spring" }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleGenre(genre.id)}
            className={`
              flex items-center gap-3 p-4 rounded-xl border-2 transition-all relative overflow-hidden
              ${
                data.genres.includes(genre.id)
                  ? "border-primary bg-gradient-to-br from-primary/15 to-emerald-50/50 shadow-md"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
              }
            `}
          >
            {data.genres.includes(genre.id) && (
              <motion.div
                className="absolute top-2 right-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
            )}
            <div className="text-2xl">{genre.icon}</div>
            <div className="flex-1 text-left">
              <div className="text-sm">{genre.label}</div>
            </div>
          </motion.button>
        ))}
      </div>
      {data.genres.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm text-muted-foreground">
            Selected:
          </span>
          {data.genres.map((genreId) => {
            const genre = GENRE_OPTIONS.find(
              (g) => g.id === genreId,
            );
            return (
              <Badge
                key={genreId}
                className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0"
              >
                {genre?.icon} {genre?.label}
              </Badge>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
