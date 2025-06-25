
import React, { useEffect } from "react";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SkillLevel } from "../../types/quiz.types";

interface SkillsStepProps {
  skills: { [key: string]: SkillLevel };
  onSkillChange: (skill: string, level: SkillLevel) => void;
}

const skillLevels: SkillLevel[] = ["Beginner", "Intermediate", "Advanced"];

const SkillsStep: React.FC<SkillsStepProps> = ({ skills, onSkillChange }) => {
  // Add debugging useEffect to track skills prop changes
  useEffect(() => {
    console.log("SkillsStep rendered with skills:", skills);
  }, [skills]);

  const handleSkillChange = (skill: string, value: string) => {
    console.log(`Attempting to change skill ${skill} to: ${value}`);
    
    // Make sure value is a valid SkillLevel
    if (skillLevels.includes(value as SkillLevel)) {
      // Explicitly cast the value to SkillLevel
      const skillLevel = value as SkillLevel;
      console.log(`Calling onSkillChange with: ${skill}, ${skillLevel}`);
      onSkillChange(skill, skillLevel);
    } else {
      console.error(`Invalid skill level: ${value}`);
    }
  };

  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl">Step 1: Rate Your Skills</CardTitle>
        <CardDescription>
          Please select your proficiency level for each skill
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 max-h-[60vh] overflow-y-auto pr-4">
        {Object.entries(skills).map(([skill, level]) => {
          console.log(`Rendering skill: ${skill} with level: ${level}`);
          return (
            <div key={skill} className="space-y-2">
              <Label>{skill}</Label>
              <RadioGroup
                value={level || undefined}
                onValueChange={(value) => handleSkillChange(skill, value)}
                className="flex space-x-4"
              >
                {skillLevels.map((skillLevel) => (
                  <div key={skillLevel} className="flex items-center space-x-2">
                    <RadioGroupItem value={skillLevel} id={`${skill}-${skillLevel}`} />
                    <Label htmlFor={`${skill}-${skillLevel}`} className="cursor-pointer">
                      {skillLevel}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          );
        })}
      </CardContent>
    </div>
  );
};

export default SkillsStep;
