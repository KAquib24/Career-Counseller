
// ML-based recommendation service
// This simulates an ML model with more sophisticated recommendation mechanisms
// In a production environment, this would connect to a backend ML service

import { Career } from "../data/careerData";
import { QuizResponses } from "../types/quiz.types";

// TF-IDF inspired weighting for text content matching
const calculateContentSimilarity = (userContent: string[], careerContent: string[]): number => {
  let similarity = 0;
  const userTerms = userContent.flatMap(text => text.toLowerCase().split(/\s+/));
  
  // Count term frequency in user content
  const userTermFreq: Record<string, number> = {};
  userTerms.forEach(term => {
    if (term.length > 2) { // Ignore short terms
      userTermFreq[term] = (userTermFreq[term] || 0) + 1;
    }
  });
  
  // Calculate similarity using a TF-IDF inspired approach
  careerContent.forEach(text => {
    const careerTerms = text.toLowerCase().split(/\s+/);
    careerTerms.forEach(term => {
      if (userTermFreq[term] && term.length > 2) {
        // Give higher weight to less common terms
        similarity += userTermFreq[term] * (1 + Math.log(1 + (1 / userTermFreq[term])));
      }
    });
  });
  
  return similarity;
};

// Convert skill level to numerical value - with more granular scoring
const skillLevelToScore = (level: string): number => {
  switch (level) {
    case "Beginner": return 1;
    case "Intermediate": return 3;
    case "Advanced": return 5;
    default: return 0;
  }
};

// Convert education level to numerical value - weighted more precisely
const educationLevelToScore = (level: string): number => {
  switch (level) {
    case "High School": return 1;
    case "Associate's": return 2;
    case "Bachelor's": return 3.5;
    case "Master's": return 4.5;
    case "PhD": return 5.5;
    default: return 0;
  }
};

// K-means inspired clustering calculation
const calculateClusterSimilarity = (userProfile: number[], careerProfile: number[]): number => {
  if (userProfile.length !== careerProfile.length) return 0;
  
  let distance = 0;
  for (let i = 0; i < userProfile.length; i++) {
    distance += Math.pow(userProfile[i] - careerProfile[i], 2);
  }
  
  // Convert distance to similarity (inverse relationship)
  return 100 / (1 + Math.sqrt(distance));
};

// Simulates a machine learning model prediction using a hybrid approach
export const predictCareers = async (
  responses: QuizResponses,
  availableCareers: Career[]
): Promise<Career[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("ML model processing quiz responses:", responses);

  // Feature extraction from user responses
  const userFeatures = {
    // Content-based features
    skills: Object.entries(responses.skills)
      .filter(([_, level]) => level !== '')
      .map(([skill, _]) => skill),
    interests: responses.interests,
    additionalNotes: responses.additionalNotes ? [responses.additionalNotes] : [],
    
    // Numeric features for clustering
    skillScores: Object.entries(responses.skills)
      .map(([_, level]) => skillLevelToScore(level)),
    educationScore: educationLevelToScore(responses.educationLevel),
    workStylePreference: responses.workStyle === "Remote" ? 1 : 
                         responses.workStyle === "Hybrid" ? 0.5 : 0,
  };

  console.log("Extracted user features:", userFeatures);

  // Score careers using a hybrid approach (content-based + collaborative-inspired)
  const scoredCareers = availableCareers.map(career => {
    // --- Content-Based Filtering (TF-IDF inspired) ---
    
    // Extract career text content
    const careerContent = [
      career.title,
      career.description,
      ...career.requirements.skills,
      career.requirements.education,
    ];
    
    // Calculate content similarity between user profile and career
    const userContent = [
      ...userFeatures.skills,
      ...userFeatures.interests,
      ...userFeatures.additionalNotes,
    ];
    
    const contentSimilarity = calculateContentSimilarity(userContent, careerContent);
    
    // --- Collaborative Filtering (K-means clustering inspired) ---
    
    // Create numeric profile vectors for clustering
    const userProfile = [
      ...userFeatures.skillScores,
      userFeatures.educationScore,
      userFeatures.workStylePreference,
    ];
    
    // Create career profile (simplified representation)
    const careerProfile = [
      // Skill level approximation (entry=1, mid=3, senior=5)
      career.skillLevel === "Entry" ? 1 : 
      career.skillLevel === "Mid-Level" ? 3 : 5,
      
      // Education requirement approximation
      career.requirements.education.includes("Bachelor") ? 3 :
      career.requirements.education.includes("Master") ? 4.5 : 
      career.requirements.education.includes("PhD") ? 5.5 : 1,
      
      // Work environment approximation (default to 0.5 since we don't have this info)
      0.5
    ];
    
    const clusterSimilarity = calculateClusterSimilarity(userProfile, careerProfile);
    
    // --- Combine Approaches (Ensemble method) ---
    
    // Base score (0-100)
    let score = 30;
    
    // Add content-based score (max 40 points)
    score += Math.min(contentSimilarity * 2, 40);
    
    // Add collaborative filtering score (max 20 points)
    score += Math.min(clusterSimilarity / 5, 20);
    
    // Additional business rules
    
    // Education level exact match
    const educationMatch = {
      "Entry": ["High School", "Associate's"],
      "Mid-Level": ["Bachelor's"],
      "Senior": ["Master's", "PhD"]
    };
    
    if (educationMatch[career.skillLevel]?.includes(responses.educationLevel)) {
      score += 5;
    }
    
    // Job market demand factor
    if (career.jobMarketDemand === "High") {
      score += 5;
    }
    
    // Calculate final match percentage (capped at 100%)
    const matchPercentage = Math.min(Math.round(score), 100);
    
    // Generate personalized strength matches
    const strengthsMatch = generateStrengthMatches(responses, career, contentSimilarity);
    
    return { 
      ...career, 
      matchPercentage,
      strengthsMatch
    };
  });

  console.log("Careers scored, sorting by match percentage");
  
  // Sort by match percentage and return top 5
  return scoredCareers
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 5);
};

// Generate personalized strength matches based on analytics
const generateStrengthMatches = (
  responses: QuizResponses, 
  career: Career,
  contentSimilarity: number
): string[] => {
  const strengths: string[] = [];
  
  // Add strengths based on skill matches with better descriptors
  const highSkills = Object.entries(responses.skills)
    .filter(([_, level]) => level === "Intermediate" || level === "Advanced")
    .map(([skill]) => skill);
    
  // Check for specific skill matches
  for (const skill of highSkills) {
    if (career.requirements.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
      // Use different wording based on skill level
      const level = responses.skills[skill];
      if (level === "Advanced") {
        strengths.push(`Your advanced ${skill} expertise is highly valuable for this role`);
      } else {
        strengths.push(`Your ${skill} skills align well with this career path`);
      }
      
      // Limit to 2 skill strengths at most
      if (strengths.length >= 2) break;
    }
  }
  
  // Add interest alignment strength if applicable
  for (const interest of responses.interests) {
    const interestLower = interest.toLowerCase();
    if (
      career.title.toLowerCase().includes(interestLower) || 
      career.description.toLowerCase().includes(interestLower)
    ) {
      strengths.push(`Your interest in ${interest} matches this career's focus`);
      break; // Only add one interest match
    }
  }
  
  // Add education match with better wording
  const educationToCareerLevel = {
    "High School": "Entry",
    "Associate's": "Entry",
    "Bachelor's": "Mid-Level",
    "Master's": "Senior",
    "PhD": "Senior",
  };
  
  if (educationToCareerLevel[responses.educationLevel] === career.skillLevel) {
    if (responses.educationLevel === "Master's" || responses.educationLevel === "PhD") {
      strengths.push(`Your advanced education is ideal for this ${career.skillLevel} position`);
    } else {
      strengths.push(`Your ${responses.educationLevel} education aligns with this career level`);
    }
  }
  
  // Add content-based match strength if we have high similarity
  if (contentSimilarity > 15 && strengths.length < 3) {
    strengths.push("Your overall profile shows strong alignment with this career path");
  }
  
  // Add job market strength if applicable
  if (career.jobMarketDemand === "High" && strengths.length < 3) {
    strengths.push("This field has high market demand for qualified professionals");
  }
  
  // Ensure we have at least 3 strengths with fallbacks
  if (strengths.length < 3) {
    const defaultStrengths = [
      "This career path complements your overall skillset",
      "Your combination of skills and interests align with this role",
      "This career offers growth opportunities matching your profile",
      "Your technical foundation provides a good starting point for this path",
      "This role leverages your current abilities while offering growth"
    ];
    
    let index = 0;
    while (strengths.length < 3 && index < defaultStrengths.length) {
      if (!strengths.includes(defaultStrengths[index])) {
        strengths.push(defaultStrengths[index]);
      }
      index++;
    }
  }
  
  return strengths.slice(0, 3); // Return only top 3 strengths
};
