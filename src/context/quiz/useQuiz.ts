
import { useContext, useEffect } from "react";
import { QuizContext } from "./QuizProvider";

// Hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  
  // Add debugging to trace when hook is used
  useEffect(() => {
    console.log("useQuiz hook called");
  }, []);
  
  if (!context) {
    console.error("useQuiz must be used within a QuizProvider");
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  
  return context;
};

// Helper function to save quiz reports to localStorage
export const saveQuizReport = (responses: any) => {
  try {
    // Get existing reports
    const existingReportsStr = localStorage.getItem('quizReports');
    const existingReports = existingReportsStr ? JSON.parse(existingReportsStr) : [];
    
    // Generate a new report ID
    const reportId = `report${existingReports.length + 1}`;
    
    // Create the new report with timestamp
    const newReport = {
      id: reportId,
      timestamp: new Date().toISOString(),
      responses
    };
    
    // Add the new report
    const updatedReports = [...existingReports, newReport];
    
    // Save back to localStorage
    localStorage.setItem('quizReports', JSON.stringify(updatedReports));
    
    console.log(`Quiz report saved as ${reportId}`);
    return reportId;
  } catch (error) {
    console.error("Error saving quiz report:", error);
    return null;
  }
};
