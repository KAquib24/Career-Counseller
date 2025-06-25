
import { QuizState, SkillLevel } from "../../types/quiz.types";

// Initial skills to populate - with empty values to allow user selection
export const initialSkills: { [key: string]: SkillLevel } = {
  "JavaScript": "" as SkillLevel,
  "Python": "" as SkillLevel,
  "SQL": "" as SkillLevel,
  "Cloud Computing": "" as SkillLevel,
  "UI/UX Design": "" as SkillLevel,
  "Database Fundamentals": "" as SkillLevel,
  "Computer Architecture": "" as SkillLevel,
  "Distributed Computing Systems": "" as SkillLevel,
  "Cyber Security": "" as SkillLevel,
  "Computer Networking": "" as SkillLevel,
  "Software Development": "" as SkillLevel,
  "Project Management": "" as SkillLevel,
  "Computer Forensic Fundamentals": "" as SkillLevel,
  "Technical Communication Skills": "" as SkillLevel,
  "Data Science": "" as SkillLevel,
  "Troubleshooting": "" as SkillLevel,
  "Graphics Design": "" as SkillLevel,
};

// Initial State
export const initialState: QuizState = {
  currentStep: 1,
  totalSteps: 5,
  responses: {
    skills: initialSkills,
    interests: [],
    workStyle: "" as any, // Cast to fix type issue
    educationLevel: "" as any, // Cast to fix type issue
    preferredSalary: "",
    additionalNotes: "",
  },
  results: [],
  isLoading: false,
};
