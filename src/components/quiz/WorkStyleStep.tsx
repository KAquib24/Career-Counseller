
import React from "react";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WorkStyle } from "../../context/QuizContext";

interface WorkStyleStepProps {
  workStyle: WorkStyle;
  onWorkStyleChange: (style: WorkStyle) => void;
}

const workStyles = [
  { id: "Remote", label: "Remote" },
  { id: "Hybrid", label: "Hybrid" },
  { id: "On-site", label: "On-site" },
];

const WorkStyleStep: React.FC<WorkStyleStepProps> = ({ workStyle, onWorkStyleChange }) => {
  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl">Step 3: Work Preferences</CardTitle>
        <CardDescription>
          What's your preferred work environment?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={workStyle}
          onValueChange={(value) => onWorkStyleChange(value as WorkStyle)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {workStyles.map((style) => (
            <div
              key={style.id}
              className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                workStyle === style.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onWorkStyleChange(style.id as WorkStyle)}
            >
              <RadioGroupItem
                value={style.id}
                id={style.id}
                className="sr-only"
              />
              <Label
                htmlFor={style.id}
                className="cursor-pointer text-center"
              >
                <div className="font-medium text-lg mb-1">{style.label}</div>
                <p className="text-sm text-muted-foreground">
                  {style.id === "Remote"
                    ? "Work from anywhere"
                    : style.id === "Hybrid"
                    ? "Mix of office and remote"
                    : "Work in office"}
                </p>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </div>
  );
};

export default WorkStyleStep;
