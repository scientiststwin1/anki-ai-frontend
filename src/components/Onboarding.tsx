import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { BookOpen, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OnboardingData {
  englishLevel: string;
  nativeLanguage: string;
  age: string;
  genres: string[];
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const GENRE_OPTIONS = [
  { id: "adventure", label: "Adventure", icon: "🏔️" },
  { id: "mystery", label: "Mystery", icon: "🔍" },
  { id: "scifi", label: "Science Fiction", icon: "🚀" },
  { id: "romance", label: "Romance", icon: "💕" },
  { id: "fantasy", label: "Fantasy", icon: "🧙" },
  { id: "realistic", label: "Realistic Fiction", icon: "🌆" },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    englishLevel: "",
    nativeLanguage: "",
    age: "",
    genres: [],
  });

  // Update URL based on step
  useEffect(() => {
    const stepPaths = ["", "level", "language", "age", "genres"];
    const path = `/onboarding/${stepPaths[step]}`;
    window.history.pushState({}, "", path);
  }, [step]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const stepPaths = ["", "level", "language", "age", "genres"];
      const currentStep = stepPaths.indexOf(path.split("/").pop() || "");
      if (currentStep > 0 && currentStep <= 4) {
        setStep(currentStep);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const updateData = (field: keyof OnboardingData, value: string | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGenre = (genreId: string) => {
    const newGenres = data.genres.includes(genreId)
      ? data.genres.filter((g) => g !== genreId)
      : [...data.genres, genreId];
    updateData("genres", newGenres);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.englishLevel !== "";
      case 2:
        return data.nativeLanguage !== "";
      case 3:
        return data.age !== "";
      case 4:
        return data.genres.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      window.history.pushState({}, "", "/");
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-emerald-50/30 p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-primary to-emerald-600 rounded-2xl p-4 shadow-xl relative"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            >
              <BookOpen className="w-10 h-10 text-white" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.h1 
            className="mb-2 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to StoryLearn! 🎉
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Let's personalize your learning journey
          </motion.p>
          
          {/* Progress Steps */}
          <motion.div 
            className="flex gap-3 justify-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <motion.div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-all
                    ${i < step 
                      ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md" 
                      : i === step 
                      ? "bg-gradient-to-br from-primary to-emerald-600 text-white ring-4 ring-primary/20 shadow-lg" 
                      : "bg-muted text-muted-foreground"
                    }
                  `}
                  animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {i < step ? <Sparkles className="w-5 h-5" /> : i}
                </motion.div>
                {i < 4 && (
                  <motion.div 
                    className={`w-12 h-1 rounded-full transition-all ${
                      i < step ? "bg-gradient-to-r from-primary to-emerald-600" : "bg-border"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: i < step ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <Card className="border-2 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-2">What's your current English level?</h2>
                    <p className="text-muted-foreground">This helps us create stories that match your ability</p>
                  </div>
                  <RadioGroup
                    value={data.englishLevel}
                    onValueChange={(value) => updateData("englishLevel", value)}
                    className="space-y-3"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className={`
                        flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
                        ${data.englishLevel === "beginner" 
                          ? "border-primary bg-primary/10 shadow-sm" 
                          : "border-border hover:border-primary/50 bg-card"
                        }
                      `}
                    >
                      <RadioGroupItem value="beginner" id="beginner" />
                      <Label htmlFor="beginner" className="cursor-pointer flex-1">
                        <div>
                          <div className="mb-1">Beginner (A1-A2)</div>
                          <p className="text-muted-foreground text-sm">Just starting to learn English</p>
                        </div>
                      </Label>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className={`
                        flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
                        ${data.englishLevel === "intermediate" 
                          ? "border-primary bg-primary/10 shadow-sm" 
                          : "border-border hover:border-primary/50 bg-card"
                        }
                      `}
                    >
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate" className="cursor-pointer flex-1">
                        <div>
                          <div className="mb-1">Intermediate (B1-B2)</div>
                          <p className="text-muted-foreground text-sm">Can understand and use everyday English</p>
                        </div>
                      </Label>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className={`
                        flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
                        ${data.englishLevel === "advanced" 
                          ? "border-primary bg-primary/10 shadow-sm" 
                          : "border-border hover:border-primary/50 bg-card"
                        }
                      `}
                    >
                      <RadioGroupItem value="advanced" id="advanced" />
                      <Label htmlFor="advanced" className="cursor-pointer flex-1">
                        <div>
                          <div className="mb-1">Advanced (C1-C2)</div>
                          <p className="text-muted-foreground text-sm">Proficient with complex topics</p>
                        </div>
                      </Label>
                    </motion.div>
                  </RadioGroup>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-2">What's your native language?</h2>
                    <p className="text-muted-foreground">We'll use this for translations and context</p>
                  </div>
                  <Select
                    value={data.nativeLanguage}
                    onValueChange={(value) => updateData("nativeLanguage", value)}
                  >
                    <SelectTrigger className="h-14 text-base border-2">
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
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-2">What's your age group?</h2>
                    <p className="text-muted-foreground">This helps us create age-appropriate content</p>
                  </div>
                  <RadioGroup
                    value={data.age}
                    onValueChange={(value) => updateData("age", value)}
                    className="space-y-3"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className={`
                        flex items-center space-x-4 border-2 rounded-xl p-5 cursor-pointer transition-all
                        ${data.age === "child" 
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
                        ${data.age === "teen" 
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
                        ${data.age === "adult" 
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
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-2">What types of stories do you enjoy?</h2>
                    <p className="text-muted-foreground">Select at least one genre (you can choose multiple)</p>
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
                          ${data.genres.includes(genre.id)
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
                      <span className="text-sm text-muted-foreground">Selected:</span>
                      {data.genres.map((genreId) => {
                        const genre = GENRE_OPTIONS.find(g => g.id === genreId);
                        return (
                          <Badge key={genreId} className="bg-gradient-to-r from-primary to-emerald-600 text-white border-0">
                            {genre?.icon} {genre?.label}
                          </Badge>
                        );
                      })}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 pt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 border-2"
                  size="lg"
                >
                  Back
                </Button>
              )}
              <motion.div className={`flex-1 ${step === 1 ? 'w-full' : ''}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg relative overflow-hidden ${step === 1 ? 'w-full' : ''}`}
                  size="lg"
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative flex items-center gap-2">
                    {step === 4 ? (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Start Learning
                      </>
                    ) : (
                      "Continue"
                    )}
                  </span>
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Footer hint */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Step {step} of 4 • Your preferences can be changed anytime in settings
        </p>
      </div>
    </div>
  );
}
