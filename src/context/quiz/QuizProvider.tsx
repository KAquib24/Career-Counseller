
import React, { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { predictCareers } from "../../utils/mlRecommendationService";
import careers from "../../data/careerData";
import { initialState } from "./quizConstants";
import { 
  QuizContextType, 
  SkillLevel, 
  InterestArea, 
  WorkStyle, 
  EducationLevel 
} from "../../types/quiz.types";

// Create the Quiz Context
export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log("🔄 currentStep updated:", state.currentStep);
  }, [state.currentStep]);
  

  // Set Skill Level with improved debugging
  const setSkill = useCallback((skill: string, level: SkillLevel) => {
    console.log(`QuizProvider setSkill called with: ${skill}, ${level}`);
    
    setState(prev => {
      const newSkills = { ...prev.responses.skills, [skill]: level };
      console.log(`New skills state will be:`, newSkills);
      
      return {
        ...prev,
        responses: {
          ...prev.responses,
          skills: newSkills,
        },
      };
    });
  }, []);

  // Toggle Interest Selection
  const toggleInterest = (interest: InterestArea) => {
    setState(prevState => {
      const newInterests = prevState.responses.interests.includes(interest)
        ? prevState.responses.interests.filter(i => i !== interest)
        : [...prevState.responses.interests, interest];

      return {
        ...prevState,
        responses: {
          ...prevState.responses,
          interests: newInterests,
        },
      };
    });
  };

  // Set Work Style
  const setWorkStyle = (style: WorkStyle) => {
    setState(prev => ({
      ...prev,
      responses: { ...prev.responses, workStyle: style },
    }));
  };

  // Set Education Level
  const setEducationLevel = (level: EducationLevel) => {
    setState(prev => ({
      ...prev,
      responses: { ...prev.responses, educationLevel: level },
    }));
  };

  // Set Preferred Salary
  const setPreferredSalary = (range: string) => {
    setState(prev => ({
      ...prev,
      responses: { ...prev.responses, preferredSalary: range },
    }));
  };

  // Set Additional Notes
  const setAdditionalNotes = (notes: string) => {
    setState(prev => ({
      ...prev,
      responses: { ...prev.responses, additionalNotes: notes },
    }));
  };

  // Move to Next Step
  const nextStep = () => {
    setState((prevState) => {
      const newStep = Math.min(prevState.currentStep + 1, prevState.totalSteps);
      console.log("✅ After update - currentStep should be:", newStep);
      return { ...prevState, currentStep: newStep };
    });
  };
  
  

  // Move to Previous Step
  const prevStep = useCallback(() => {
    console.log("prevStep called, current step:", state.currentStep);
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  }, [state.currentStep]);

  // Helper function to validate skills
  const validateSkills = () => {
    // Check if any skills are still empty
    const emptySkills = Object.entries(state.responses.skills)
      .filter(([_, level]) => level === '')
      .map(([skill]) => skill);
    
    if (emptySkills.length > 0) {
      console.log("Empty skills found:", emptySkills);
      toast({
        title: "Please rate all skills",
        description: `Please select a skill level for: ${emptySkills.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Save quiz report to localStorage
  const saveQuizReport = useCallback(() => {
    try {
      // Get existing reports
      const existingReportsStr = localStorage.getItem('careermagic_reports');
      const existingReports = existingReportsStr ? JSON.parse(existingReportsStr) : [];
      
      // Determine the new quiz number
      const quizNumber = existingReports.length + 1;
      
      // Create new report with timestamp and quiz number
      const newReport = {
        id: `report${quizNumber}`,
        quizNumber,
        timestamp: new Date().toISOString(),
        responses: state.responses,
        results: state.results.map(result => ({
          ...result,
          quizNumber
        }))
      };
      
      // Save to localStorage
      const updatedReports = [...existingReports, newReport];
      localStorage.setItem('careermagic_reports', JSON.stringify(updatedReports));
      
      console.log("Quiz report saved:", newReport.id);
      toast({
        title: "Report Saved",
        description: `Your quiz responses have been saved as ${newReport.id}`,
      });
      
      // Also save individual report
      localStorage.setItem(`careermagic_${newReport.id}`, JSON.stringify(newReport));
      
      return newReport.id;
    } catch (error) {
      console.error("Error saving quiz report:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your quiz report",
        variant: "destructive",
      });
      return null;
    }
  }, [state.responses, state.results, toast]);

  // Submit Quiz and Fetch Recommendations
  const submitQuiz = useCallback(async () => {
    console.log("submitQuiz called - starting process");
    
    // Validate all skills are rated
    if (!validateSkills()) {
      return;
    }
    
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      console.log("Fetching career recommendations");
      const recommendations = await predictCareers(state.responses, careers);
      console.log("Received recommendations:", recommendations);
      
      // Add quiz number to recommendations
      const existingReportsStr = localStorage.getItem('careermagic_reports');
      const existingReports = existingReportsStr ? JSON.parse(existingReportsStr) : [];
      const quizNumber = existingReports.length + 1;
      
      const recommendationsWithQuizNumber = recommendations.map(rec => ({
        ...rec,
        quizNumber
      }));
      
      setState(prev => ({ ...prev, results: recommendationsWithQuizNumber }));

      // Store in localStorage
      localStorage.setItem("careermagic_recent_results", JSON.stringify(recommendationsWithQuizNumber));
      
      // Save report
      saveQuizReport();

      // Navigate to results page
      console.log("Navigating to results page");
      navigate("/results");
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [navigate, saveQuizReport, toast]);

  // Reset Quiz
  const resetQuiz = useCallback(() => {
    setState(initialState);
  }, []);

  const value = {
    ...state,
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
  };

  console.log("QuizProvider rendering with state:", state);
  
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}; 
