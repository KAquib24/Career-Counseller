import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/quiz/useQuiz";
import { useAuth } from "../context/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Import components
import SkillsStep from "../components/quiz/SkillsStep";
import InterestsStep from "../components/quiz/InterestsStep";
import WorkStyleStep from "../components/quiz/WorkStyleStep";
import EducationStep from "../components/quiz/EducationStep";
import AdditionalInfoStep from "../components/quiz/AdditionalInfoStep";
import QuizNavigation from "../components/quiz/QuizNavigation";
import QuizProgress from "../components/quiz/QuizProgress";

const Quiz = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to take the career quiz",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, toast]);

  const {
    currentStep,
    totalSteps,
    responses,
    isLoading,
    setSkill,
    toggleInterest,
    setWorkStyle,
    setEducationLevel,
    setPreferredSalary,
    setAdditionalNotes,
    nextStep,
    prevStep,
    submitQuiz,
    resetQuiz,
  } = useQuiz();

  // State for animation
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    resetQuiz();
    console.log("Quiz component mounted");
  }, [resetQuiz]);
  
  // Debug effect to monitor step changes
  useEffect(() => {
    console.log("Current Step in Quiz component:", currentStep);
  }, [currentStep]);  

  const handleNextStep = useCallback(() => {
    console.log("handleNextStep called with currentStep:", currentStep);
    
    // Check if we need validation for the current step
    if (currentStep === 1) {
      // Validate that all skills have been rated
      const emptySkills = Object.entries(responses.skills)
        .filter(([_, level]) => level === '')
        .map(([skill]) => skill);
      
      if (emptySkills.length > 0) {
        toast({
          title: "Please rate all skills",
          description: `Please select a skill level for: ${emptySkills.length > 3 ? 
            `${emptySkills.slice(0, 3).join(', ')} and ${emptySkills.length - 3} more` : 
            emptySkills.join(', ')}`,
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2 && responses.interests.length === 0) {
      toast({
        title: "Please select at least one interest",
        variant: "destructive",
      });
      return;
    } else if (currentStep === 3 && !responses.workStyle) {
      toast({
        title: "Please select a work style preference",
        variant: "destructive",
      });
      return;
    } else if (currentStep === 4 && !responses.educationLevel) {
      toast({
        title: "Please select your education level",
        variant: "destructive",
      });
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      console.log("Calling nextStep() after animation");
      nextStep();
      setIsAnimating(false);
    }, 300);
  }, [currentStep, nextStep, responses.educationLevel, responses.interests.length, responses.skills, responses.workStyle, toast]);

  const handlePrevStep = useCallback(() => {
    console.log("handlePrevStep called");
    setIsAnimating(true);
    setTimeout(() => {
      prevStep();
      setIsAnimating(false);
    }, 300);
  }, [prevStep]);

  const handleSubmit = useCallback(() => {
    console.log("Quiz handleSubmit called - preparing ML recommendation");
    // Show login prompt if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Create an account to save your results",
        description: "You can still view your results, but they won't be saved to your profile.",
      });
    }
    
    // Call the submitQuiz function with enhanced ML model
    submitQuiz();
  }, [isAuthenticated, submitQuiz, toast]);

  const renderStepContent = useCallback(() => {
    console.log("renderStepContent for step:", currentStep);
    switch (currentStep) {
      case 1:
        return (
          <SkillsStep 
            skills={responses.skills} 
            onSkillChange={setSkill} 
          />
        );
      case 2:
        return (
          <InterestsStep 
            interests={responses.interests} 
            onInterestToggle={toggleInterest} 
          />
        );
      case 3:
        return (
          <WorkStyleStep 
            workStyle={responses.workStyle} 
            onWorkStyleChange={setWorkStyle} 
          />
        );
      case 4:
        return (
          <EducationStep 
            educationLevel={responses.educationLevel} 
            onEducationChange={setEducationLevel} 
          />
        );
      case 5:
        return (
          <AdditionalInfoStep 
            preferredSalary={responses.preferredSalary || ''} 
            additionalNotes={responses.additionalNotes || ''} 
            onPreferredSalaryChange={setPreferredSalary} 
            onAdditionalNotesChange={setAdditionalNotes} 
          />
        );
      default:
        console.warn("Unknown step:", currentStep);
        return null;
    }
  }, [currentStep, responses.additionalNotes, responses.educationLevel, responses.interests, responses.preferredSalary, responses.skills, responses.workStyle, setAdditionalNotes, setEducationLevel, setPreferredSalary, setSkill, setWorkStyle, toggleInterest]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Career Path Finder</h1>
          <p className="mt-2 text-muted-foreground">
            Find your ideal career path in technology with our ML-powered recommendation engine
          </p>
        </div>

        <QuizProgress currentStep={currentStep} totalSteps={totalSteps} />

        <Card className={`w-full shadow-sm transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
          {renderStepContent()}
          <QuizNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            isLoading={isLoading}
            onPrevious={handlePrevStep}
            onNext={handleNextStep}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
