
import React, { createContext, useState, useEffect } from "react";
import { BookmarkContextType, BookmarkedCareer } from "../QuizContext";

// Create Bookmark Context
export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarkedCareers, setBookmarkedCareers] = useState<BookmarkedCareer[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("careermagic_bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarkedCareers(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Error loading bookmarks from localStorage:", error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("careermagic_bookmarks", JSON.stringify(bookmarkedCareers));
  }, [bookmarkedCareers]);

  // Toggle a career in bookmarks
  const toggleBookmark = (career: BookmarkedCareer) => {
    setBookmarkedCareers(prev => {
      // Check if already bookmarked
      const isAlreadyBookmarked = prev.some(item => item.id === career.id);
      
      if (isAlreadyBookmarked) {
        // Remove from bookmarks
        return prev.filter(item => item.id !== career.id);
      } else {
        // Add to bookmarks
        return [...prev, { ...career, date: new Date().toISOString().split('T')[0] }];
      }
    });
  };

  // Save multiple careers at once with a custom name
  const saveResults = (careers: BookmarkedCareer[], customName: string) => {
    // Generate a unique report ID for these saved results
    const reportId = `saved-${Date.now()}`;
    
    // Process the careers to add the custom name and reportId
    const careersWithMetadata = careers.map(career => ({
      ...career,
      customName,
      reportId, // Add the reportId to link all these careers together
      date: new Date().toISOString().split('T')[0]
    }));
    
    // Add to bookmarks, avoiding duplicates
    setBookmarkedCareers(prev => {
      // Filter out any careers that would be duplicates
      const filteredPrev = prev.filter(prevCareer => 
        !careersWithMetadata.some(newCareer => newCareer.id === prevCareer.id)
      );
      
      // Return combined array
      return [...filteredPrev, ...careersWithMetadata];
    });
    
    // Also save this collection as a report
    try {
      // Create a report object with all the career data
      const report = {
        id: reportId,
        name: customName,
        timestamp: new Date().toISOString(),
        results: careersWithMetadata
      };
      
      // Save to localStorage
      localStorage.setItem(`careermagic_${reportId}`, JSON.stringify(report));
      
      // Update the reports list
      const existingReportsStr = localStorage.getItem('careermagic_reports');
      const existingReports = existingReportsStr ? JSON.parse(existingReportsStr) : [];
      
      // Add the new report to the list
      const updatedReports = [...existingReports, report];
      localStorage.setItem('careermagic_reports', JSON.stringify(updatedReports));
      
      console.log("Saved results with custom name:", customName, "and reportId:", reportId);
    } catch (error) {
      console.error("Error saving custom results:", error);
    }
  };

  // Check if a career is bookmarked
  const isBookmarked = (careerId: string | number) => {
    return bookmarkedCareers.some(item => item.id === careerId);
  };

  const value = {
    bookmarkedCareers,
    toggleBookmark,
    isBookmarked,
    saveResults,
  };

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};
