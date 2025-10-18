import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { OnboardingData, OnboardingProps } from "./types";
import { OnboardingHeader } from "./OnboardingHeader";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";

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

  const updateData = (
    field: keyof OnboardingData,
    value: string | string[],
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
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
        <OnboardingHeader step={step} />

        <Card className="border-2 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && <Step1 data={data} updateData={updateData} />}
              {step === 2 && <Step2 data={data} updateData={updateData} />}
              {step === 3 && <Step3 data={data} updateData={updateData} />}
              {step === 4 && <Step4 data={data} updateData={updateData} />}
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
              <motion.div
                className={`flex-1 ${step === 1 ? "w-full" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg relative overflow-hidden ${step === 1 ? "w-full" : ""}`}
                  size="lg"
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
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
