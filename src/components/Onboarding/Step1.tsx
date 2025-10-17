import { motion } from "motion/react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { StepProps } from "./types";

export function Step1({ data, updateData }: StepProps) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="mb-2">What's your current English level?</h2>
        <p className="text-muted-foreground">
          This helps us create stories that match your ability
        </p>
      </div>
      <RadioGroup
        value={data.englishLevel}
        onValueChange={(value: string) =>
          updateData("englishLevel", value)
        }
        className="space-y-3"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
            ${
              data.englishLevel === "beginner"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border hover:border-primary/50 bg-card"
            }
          `}
        >
          <RadioGroupItem value="beginner" id="beginner" />
          <Label
            htmlFor="beginner"
            className="cursor-pointer flex-1"
          >
            <div>
              <div className="mb-1">Beginner (A1-A2)</div>
              <p className="text-muted-foreground text-sm">
                Just starting to learn English
              </p>
            </div>
          </Label>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
            ${
              data.englishLevel === "intermediate"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border hover:border-primary/50 bg-card"
            }
          `}
        >
          <RadioGroupItem value="intermediate" id="intermediate" />
          <Label
            htmlFor="intermediate"
            className="cursor-pointer flex-1"
          >
            <div>
              <div className="mb-1">Intermediate (B1-B2)</div>
              <p className="text-muted-foreground text-sm">
                Can understand and use everyday English
              </p>
            </div>
          </Label>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
            ${
              data.englishLevel === "advanced"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border hover:border-primary/50 bg-card"
            }
          `}
        >
          <RadioGroupItem value="advanced" id="advanced" />
          <Label
            htmlFor="advanced"
            className="cursor-pointer flex-1"
          >
            <div>
              <div className="mb-1">Advanced (C1-C2)</div>
              <p className="text-muted-foreground text-sm">
                Proficient with complex topics
              </p>
            </div>
          </Label>
        </motion.div>
      </RadioGroup>
    </motion.div>
  );
}
