
import React from "react";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EducationLevel } from "../../context/QuizContext";

interface EducationStepProps {
  educationLevel: EducationLevel;
  onEducationChange: (level: EducationLevel) => void;
}

const educationLevels = [
  { id: "High School", label: "High School" },
  { id: "Associate's", label: "Associate's Degree" },
  { id: "Bachelor's", label: "Bachelor's Degree" },
  { id: "Master's", label: "Master's Degree" },
  { id: "PhD", label: "Doctorate (PhD)" },
];

const EducationStep: React.FC<EducationStepProps> = ({ educationLevel, onEducationChange }) => {
  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl">Step 4: Education Level</CardTitle>
        <CardDescription>
          What is your highest level of education completed or in progress?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={educationLevel}
          onValueChange={(value) => onEducationChange(value as EducationLevel)}
          className="space-y-3"
        >
          {educationLevels.map((level) => (
            <div
              key={level.id}
              className={`flex items-center space-x-3 rounded-md border p-4 cursor-pointer transition-all ${
                educationLevel === level.id
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => onEducationChange(level.id as EducationLevel)}
            >
              <RadioGroupItem
                value={level.id}
                id={level.id}
                className="sr-only"
              />
              <Label
                htmlFor={level.id}
                className="flex flex-1 cursor-pointer justify-between"
              >
                {level.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
};

export default EducationStep;
