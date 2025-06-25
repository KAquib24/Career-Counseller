
import React, { useCallback } from "react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface QuizNavigationProps {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}



const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentStep,
  totalSteps,
  isLoading,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  console.log("QuizNavigation - currentStep:", currentStep, "totalSteps:", totalSteps);
  
  const handleNext = useCallback(() => {
    console.log("Next button clicked, calling onNext"); // ✅ Log before calling
    onNext();
  }, [onNext]);
  
  
  const handlePrevious = useCallback(() => {
    console.log("Previous button clicked, calling onPrevious");
    onPrevious();
  }, [onPrevious]);
  
  const handleSubmit = useCallback(() => {
    console.log("Submit button clicked, calling onSubmit");
    onSubmit();
  }, [onSubmit]);
  
  return (
    <CardFooter className="flex justify-between pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 1}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      {currentStep < totalSteps ? (
        <Button type="button" onClick={handleNext}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={handleSubmit} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Get Results <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </CardFooter>
  );
};

export default QuizNavigation; 
