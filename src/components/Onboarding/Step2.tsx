import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { StepProps } from "./types";

export function Step2({ data, updateData }: StepProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="mb-2">What's your native language?</h2>
        <p className="text-muted-foreground">
          We'll use this for translations and context
        </p>
      </div>
      <Select
        value={data.nativeLanguage}
        onValueChange={(value: string) =>
          updateData("nativeLanguage", value)
        }
      >
        <SelectTrigger className="h-14 text-base border-2">
          <SelectValue placeholder="Select your native language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
          <SelectItem value="chinese">
            🇨🇳 Chinese (Mandarin)
          </SelectItem>
          <SelectItem value="hindi">🇮🇳 Hindi</SelectItem>
          <SelectItem value="arabic">🇸🇦 Arabic</SelectItem>
          <SelectItem value="portuguese">🇵🇹 Portuguese</SelectItem>
          <SelectItem value="bengali">🇧🇩 Bengali</SelectItem>
          <SelectItem value="russian">🇷🇺 Russian</SelectItem>
          <SelectItem value="japanese">🇯🇵 Japanese</SelectItem>
          <SelectItem value="french">🇫🇷 French</SelectItem>
          <SelectItem value="german">🇩🇪 German</SelectItem>
          <SelectItem value="korean">🇰🇷 Korean</SelectItem>
          <SelectItem value="vietnamese">🇻🇳 Vietnamese</SelectItem>
          <SelectItem value="italian">🇮🇹 Italian</SelectItem>
          <SelectItem value="turkish">🇹🇷 Turkish</SelectItem>
          <SelectItem value="other">🌍 Other</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
}
