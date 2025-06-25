
import React from "react";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInfoStepProps {
  preferredSalary: string;
  additionalNotes: string;
  onPreferredSalaryChange: (salary: string) => void;
  onAdditionalNotesChange: (notes: string) => void;
}

const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({
  preferredSalary,
  additionalNotes,
  onPreferredSalaryChange,
  onAdditionalNotesChange,
}) => {
  return (
    <div className="space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl">Step 5: Additional Information</CardTitle>
        <CardDescription>
          Help us refine your recommendations with a few more details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="salary">Preferred Salary Range (Optional)</Label>
          <Input
            id="salary"
            placeholder="e.g. $60,000 - $80,000"
            value={preferredSalary}
            onChange={(e) => onPreferredSalaryChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">
            Anything else we should know about your career goals? (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Share your career goals, preferences, or any other details..."
            value={additionalNotes}
            onChange={(e) => onAdditionalNotesChange(e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </div>
  );
};

export default AdditionalInfoStep;
