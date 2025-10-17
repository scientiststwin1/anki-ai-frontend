import { motion } from "motion/react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { StepProps } from "./types";

export function Step3({ data, updateData }: StepProps) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="mb-2">What's your age group?</h2>
        <p className="text-muted-foreground">
          This helps us create age-appropriate content
        </p>
      </div>
      <RadioGroup
        value={data.age}
        onValueChange={(value: string) => updateData("age", value)}
        className="space-y-3"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
            ${
              data.age === "child"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border hover:border-primary/50 bg-card"
            }
          `}
        >
          <RadioGroupItem value="child" id="child" />
          <Label htmlFor="child" className="cursor-pointer flex-1">
            <div>Child (6-12 years)</div>
          </Label>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
            ${
              data.age === "teen"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border hover:border-primary/50 bg-card"
            }
          `}
        >
          <RadioGroupItem value="teen" id="teen" />
          <Label htmlFor="teen" className="cursor-pointer flex-1">
            <div>Teen (13-17 years)</div>
          </Label>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
            ${
              data.age === "adult"
                ? "border-primary bg-primary/10 shadow-sm"
                : "border-border hover:border-primary/50 bg-card"
            }
          `}
        >
          <RadioGroupItem value="adult" id="adult" />
          <Label htmlFor="adult" className="cursor-pointer flex-1">
            <div>Adult (18+ years)</div>
          </Label>
        </motion.div>
      </RadioGroup>
    </motion.div>
  );
}
