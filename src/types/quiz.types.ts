
// Define quiz types
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "";
export type InterestArea = "Programming" | "Data" | "Design" | "Infrastructure" | "Security";
export type WorkStyle = "Remote" | "Hybrid" | "On-site" | "";
export type EducationLevel = "High School" | "Associate's" | "Bachelor's" | "Master's" | "PhD" | "";

export interface QuizResponses {
  skills: { [key: string]: SkillLevel };
  interests: InterestArea[];
  workStyle: WorkStyle;
  educationLevel: EducationLevel;
  preferredSalary?: string;
  additionalNotes?: string;
}

export interface QuizState {
  currentStep: number;
  totalSteps: number;
  responses: QuizResponses;
  results: any[]; // Using any[] here as the Career type is imported from elsewhere
  isLoading: boolean;
}

export interface QuizContextType extends QuizState {
  setSkill: (skill: string, level: SkillLevel) => void;
  toggleInterest: (interest: InterestArea) => void;
  setWorkStyle: (style: WorkStyle) => void;
  setEducationLevel: (level: EducationLevel) => void;
  setPreferredSalary: (range: string) => void;
  setAdditionalNotes: (notes: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}
