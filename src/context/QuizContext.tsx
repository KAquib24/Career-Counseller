
// Re-export all quiz-related exports from the new files
export * from "./quiz";
export * from "../types/quiz.types";

// Add bookmark-related types
export type BookmarkedCareer = {
  id: string | number;
  title: string;
  matchPercentage: number;
  date: string;
  customName?: string;
};

export type BookmarkContextType = {
  bookmarkedCareers: BookmarkedCareer[];
  toggleBookmark: (career: BookmarkedCareer) => void;
  isBookmarked: (careerId: string | number) => boolean;
  saveResults: (careers: BookmarkedCareer[], customName: string) => void;
};
