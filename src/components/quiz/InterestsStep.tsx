
import React from "react";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Code, Database, Layout, Server, Shield } from "lucide-react";
import { InterestArea } from "../../context/QuizContext";

interface InterestsStepProps {
  interests: InterestArea[];
  onInterestToggle: (interest: InterestArea) => void;
}

const interestAreas = [
  { id: "Programming", label: "Programming", icon: Code },
  { id: "Data", label: "Data & Analytics", icon: Database },
  { id: "Design", label: "Design & UX", icon: Layout },
  { id: "Infrastructure", label: "Infrastructure & Cloud", icon: Server },
  { id: "Security", label: "Security", icon: Shield },
];

const InterestsStep: React.FC<InterestsStepProps> = ({ interests, onInterestToggle }) => {
  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl">Step 2: Select Your Interests</CardTitle>
        <CardDescription>
          Which technology areas interest you the most? (Select one or more)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interestAreas.map((interest) => {
            const Icon = interest.icon;
            const isSelected = interests.includes(interest.id as InterestArea);
            
            return (
              <Button
                key={interest.id}
                type="button"
                variant={isSelected ? "default" : "outline"}
                className={`h-auto py-4 px-4 justify-start text-left ${
                  isSelected 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
                onClick={() => onInterestToggle(interest.id as InterestArea)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${isSelected ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
                    <Icon className={`h-5 w-5 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <span>{interest.label}</span>
                </div>
                {isSelected && (
                  <CheckCircle className="h-5 w-5 ml-auto text-primary-foreground" />
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </div>
  );
};

export default InterestsStep;
