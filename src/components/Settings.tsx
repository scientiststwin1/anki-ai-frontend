import { ArrowLeft, Check, Save, Settings as SettingsIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { UserProfile } from "../interface";
import { useAppContext } from "../context/AppContext";

const GENRE_OPTIONS = [
  { id: "adventure", label: "Adventure", icon: "🏔️" },
  { id: "mystery", label: "Mystery", icon: "🔍" },
  { id: "scifi", label: "Science Fiction", icon: "🚀" },
  { id: "romance", label: "Romance", icon: "💕" },
  { id: "fantasy", label: "Fantasy", icon: "🧙" },
  { id: "realistic", label: "Realistic Fiction", icon: "🌆" },
];

interface SettingsProps {
  // No props needed - component will handle its own context and navigation
}

export function Settings({}: SettingsProps) {
  const { userProfile, setUserProfile } = useAppContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(userProfile!);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSaveSettings = (profile: UserProfile) => {
    setUserProfile(profile);
    navigate('/');
  };

  const handleCloseSettings = () => {
    navigate('/');
  };

  const updateProfile = (
    field: keyof UserProfile,
    value: string | string[],
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const toggleGenre = (genreId: string) => {
    const newGenres = profile.genres.includes(genreId)
      ? profile.genres.filter((g) => g !== genreId)
      : [...profile.genres, genreId];
    updateProfile("genres", newGenres);
  };

  const handleSave = () => {
    handleSaveSettings(profile);
    setHasChanges(false);
    toast.success("Settings saved successfully!", {
      description: "Your learning preferences have been updated",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={handleCloseSettings}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary rounded-xl p-3">
              <SettingsIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1>Learning Profile Settings</h1>
              <p className="text-muted-foreground">
                Update your preferences to personalize your learning experience
              </p>
            </div>
          </div>
          {hasChanges && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-sm text-primary">You have unsaved changes</p>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {/* English Level */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="mb-1">English Level</h3>
                <p className="text-muted-foreground text-sm">
                  Choose the level that best matches your current ability
                </p>
              </div>
              <RadioGroup
                value={profile.englishLevel}
                onValueChange={(value: string) =>
                  updateProfile("englishLevel", value)
                }
                className="space-y-3"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`
                    flex items-center space-x-4 border-2 rounded-xl p-4 cursor-pointer transition-all
                    ${
                      profile.englishLevel === "beginner"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 bg-card"
                    }
                  `}
                >
                  <RadioGroupItem value="beginner" id="settings-beginner" />
                  <Label
                    htmlFor="settings-beginner"
                    className="cursor-pointer flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-1">Beginner (A1-A2)</div>
                        <p className="text-muted-foreground text-sm">
                          Just starting to learn English
                        </p>
                      </div>
                      {profile.englishLevel === "beginner" && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </Label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`
                    flex items-center space-x-4 border-2 rounded-xl p-4 cursor-pointer transition-all
                    ${
                      profile.englishLevel === "intermediate"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 bg-card"
                    }
                  `}
                >
                  <RadioGroupItem
                    value="intermediate"
                    id="settings-intermediate"
                  />
                  <Label
                    htmlFor="settings-intermediate"
                    className="cursor-pointer flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-1">Intermediate (B1-B2)</div>
                        <p className="text-muted-foreground text-sm">
                          Can understand and use everyday English
                        </p>
                      </div>
                      {profile.englishLevel === "intermediate" && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </Label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`
                    flex items-center space-x-4 border-2 rounded-xl p-4 cursor-pointer transition-all
                    ${
                      profile.englishLevel === "advanced"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 bg-card"
                    }
                  `}
                >
                  <RadioGroupItem value="advanced" id="settings-advanced" />
                  <Label
                    htmlFor="settings-advanced"
                    className="cursor-pointer flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-1">Advanced (C1-C2)</div>
                        <p className="text-muted-foreground text-sm">
                          Proficient with complex topics
                        </p>
                      </div>
                      {profile.englishLevel === "advanced" && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </Label>
                </motion.div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Native Language */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="mb-1">Native Language</h3>
                <p className="text-muted-foreground text-sm">
                  The language you're most comfortable with
                </p>
              </div>
              <Select
                value={profile.nativeLanguage}
                onValueChange={(value: string) =>
                  updateProfile("nativeLanguage", value)
                }
              >
                <SelectTrigger className="h-12 border-2">
                  <SelectValue placeholder="Select your native language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="chinese">🇨🇳 Chinese (Mandarin)</SelectItem>
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
            </CardContent>
          </Card>

          {/* Age Group */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="mb-1">Age Group</h3>
                <p className="text-muted-foreground text-sm">
                  Helps us create age-appropriate content
                </p>
              </div>
              <RadioGroup
                value={profile.age}
                onValueChange={(value: string) => updateProfile("age", value)}
                className="grid grid-cols-3 gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center justify-center border-2 rounded-xl p-4 cursor-pointer transition-all
                    ${
                      profile.age === "child"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 bg-card"
                    }
                  `}
                >
                  <RadioGroupItem
                    value="child"
                    id="settings-child"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="settings-child"
                    className="cursor-pointer text-center"
                  >
                    <div>Child</div>
                    <div className="text-xs text-muted-foreground">
                      6-12 years
                    </div>
                  </Label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center justify-center border-2 rounded-xl p-4 cursor-pointer transition-all
                    ${
                      profile.age === "teen"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 bg-card"
                    }
                  `}
                >
                  <RadioGroupItem
                    value="teen"
                    id="settings-teen"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="settings-teen"
                    className="cursor-pointer text-center"
                  >
                    <div>Teen</div>
                    <div className="text-xs text-muted-foreground">
                      13-17 years
                    </div>
                  </Label>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center justify-center border-2 rounded-xl p-4 cursor-pointer transition-all
                    ${
                      profile.age === "adult"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 bg-card"
                    }
                  `}
                >
                  <RadioGroupItem
                    value="adult"
                    id="settings-adult"
                    className="sr-only"
                  />
                  <Label
                    htmlFor="settings-adult"
                    className="cursor-pointer text-center"
                  >
                    <div>Adult</div>
                    <div className="text-xs text-muted-foreground">
                      18+ years
                    </div>
                  </Label>
                </motion.div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Preferred Genres */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="mb-1">Preferred Story Genres</h3>
                <p className="text-muted-foreground text-sm">
                  Select all genres you enjoy (at least one required)
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {GENRE_OPTIONS.map((genre) => (
                  <motion.button
                    key={genre.id}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleGenre(genre.id)}
                    className={`
                      flex items-center gap-3 p-4 rounded-xl border-2 transition-all
                      ${
                        profile.genres.includes(genre.id)
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-border bg-card hover:border-primary/50"
                      }
                    `}
                  >
                    <div className="text-2xl">{genre.icon}</div>
                    <div className="flex-1 text-left text-sm">
                      {genre.label}
                    </div>
                    {profile.genres.includes(genre.id) && (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </motion.button>
                ))}
              </div>
              {profile.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    Selected genres:
                  </span>
                  {profile.genres.map((genreId) => {
                    const genre = GENRE_OPTIONS.find((g) => g.id === genreId);
                    return (
                      <Badge key={genreId} variant="secondary">
                        {genre?.icon} {genre?.label}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 bg-card border-t mt-8 -mx-6 px-6 py-4">
          <div className="max-w-5xl mx-auto flex gap-3">
            <Button
              variant="outline"
              onClick={handleCloseSettings}
              className="flex-1"
              size="lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || profile.genres.length === 0}
              className="flex-1 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
