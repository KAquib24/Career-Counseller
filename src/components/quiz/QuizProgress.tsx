
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ currentStep, totalSteps }) => {
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    console.log("QuizProgress: updating for step", currentStep, "of", totalSteps);
    
    // Calculate progress percentage
    const progressPercentage = (currentStep / totalSteps) * 100;
    // console.log("Progress percentage calculated:", progressPercentage);
    
    // Start with current value
    const startValue = progressValue;
    const endValue = progressPercentage;
    const duration = 300; // ms
    const startTime = performance.now();
    
    const animateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = startValue + (endValue - startValue) * progress;
      
      setProgressValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    requestAnimationFrame(animateProgress);
  }, [currentStep, totalSteps, progressValue]);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center text-sm font-medium">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progressValue)}% Complete</span>
      </div>
      <Progress 
        value={progressValue} 
        className="h-2 mt-2"
      />
    </div>
  );
};

export default QuizProgress; 
