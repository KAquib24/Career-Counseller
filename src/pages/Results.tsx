import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuiz } from "../context/quiz/useQuiz";
import { useBookmark } from "../context/bookmark";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Check, 
  ChevronRight, 
  DownloadCloud, 
  Share2, 
  BrainCircuit, 
  Bookmark, 
  BookmarkCheck, 
  Save 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Results = () => {
  const { results, resetQuiz } = useQuiz();
  const { toggleBookmark, isBookmarked, saveResults } = useBookmark();
  const { user, getUserStorageKey } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [animatedResults, setAnimatedResults] = useState<Array<any>>([]);
  const [specificReport, setSpecificReport] = useState<any>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [customName, setCustomName] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const reportId = searchParams.get('reportId');
    
    if (reportId) {
      try {
        const reportData = localStorage.getItem(`careermagic_${reportId}`);
        if (reportData) {
          const parsedReport = JSON.parse(reportData);
          setSpecificReport(parsedReport);
          
          console.log("Loaded specific report:", parsedReport);
        } else {
          toast({
            title: "Report not found",
            description: "The requested report could not be found",
            variant: "destructive",
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error loading specific report:", error);
        navigate('/dashboard');
      }
    } else if (!results || results.length === 0) {
      navigate('/quiz');
    }
  }, [location.search, navigate, results, toast]);

  useEffect(() => {
    let resultsToAnimate;
    if (specificReport) {
      resultsToAnimate = specificReport.results;
    } else {
      resultsToAnimate = results;
    }
    if (resultsToAnimate && resultsToAnimate.length > 0) {
      const timer = setTimeout(() => {
        setAnimatedResults([resultsToAnimate[0]]);
      }, 500);
      resultsToAnimate.slice(1).forEach((result: any, index: number) => {
        setTimeout(() => {
          setAnimatedResults(prev => [...prev, result]);
        }, (index + 1) * 700 + 500);
      });
      return () => clearTimeout(timer);
    }
  }, [results, specificReport]);

  const handleShare = () => {
    toast({
      title: "Share feature",
      description: "This feature is coming soon!",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download results",
      description: "Your results will be available to download soon!",
    });
  };

  const handleTryAgain = () => {
    resetQuiz();
    navigate('/quiz');
  };

  const handleBookmarkToggle = (result: any) => {
    const resultId = result.id || `career-${result.title}`;
    toggleBookmark({
      id: resultId,
      title: result.title,
      matchPercentage: result.matchPercentage || 95,
      date: new Date().toISOString().split('T')[0]
    });
    toast({
      title: isBookmarked(resultId) 
        ? "Career removed from bookmarks" 
        : "Career bookmarked",
      description: isBookmarked(resultId)
        ? `${result.title} has been removed from your bookmarks`
        : `${result.title} has been added to your bookmarks`
    });
  };

  const handleSaveAllResults = () => {
    if (!customName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for these results",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to save your results",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    const resultsToSave = animatedResults.map(result => ({
      id: result.id || `career-${result.title}`,
      title: result.title,
      matchPercentage: result.matchPercentage || 95,
      date: new Date().toISOString().split('T')[0],
    }));

    saveResults(resultsToSave, customName);
    
    try {
      const userStorageKey = getUserStorageKey(user.id);
      const savedResultId = `saved-${Date.now()}`;
      
      const savedResultData = {
        id: savedResultId,
        timestamp: new Date().toISOString(),
        name: customName,
        results: resultsToSave
      };
      
      const existingDataStr = localStorage.getItem(userStorageKey);
      const existingData = existingDataStr ? JSON.parse(existingDataStr) : [];
      
      const updatedData = [...existingData, savedResultData];
      
      localStorage.setItem(userStorageKey, JSON.stringify(updatedData));
      
      localStorage.setItem(`careermagic_${savedResultId}`, JSON.stringify(savedResultData));
      
    } catch (error) {
      console.error("Error saving to user storage:", error);
    }
    
    setSaveDialogOpen(false);
    setCustomName("");
    
    toast({
      title: "Results saved",
      description: `Your results have been saved as "${customName}"`,
    });
    
    navigate('/dashboard');
  };

  const getSalaryRange = (result: any) => {
    const baseSalaries: {[key: string]: number} = {
      "Software Engineer": 95000,
      "Software Developer": 92000,
      "Data Scientist": 120000,
      "UX Designer": 85000,
      "Cybersecurity Analyst": 105000,
      "Cloud Architect": 135000,
      "DevOps Engineer": 110000,
      "Product Manager": 115000,
      "Machine Learning Engineer": 125000,
      "Full Stack Developer": 98000,
      "Frontend Developer": 90000,
      "Backend Developer": 95000,
      "Mobile Developer": 95000,
      "Database Administrator": 100000,
      "Network Engineer": 88000
    };
    
    let baseSalary = 85000;
    
    if (baseSalaries[result.title]) {
      baseSalary = baseSalaries[result.title];
    } else {
      for (const [title, salary] of Object.entries(baseSalaries)) {
        if (result.title.toLowerCase().includes(title.toLowerCase())) {
          baseSalary = salary;
          break;
        }
      }
    }
    
    if (result.skillLevel) {
      switch (result.skillLevel) {
        case "Entry":
          baseSalary = baseSalary * 0.85;
          break;
        case "Mid-Level":
          break;
        case "Senior":
          baseSalary = baseSalary * 1.4;
          break;
      }
    }
    
    const min = Math.round((baseSalary - (baseSalary * 0.15)) / 1000) * 1000;
    const max = Math.round((baseSalary + (baseSalary * 0.25)) / 1000) * 1000;
    
    return {
      min,
      max,
      average: baseSalary
    };
  };

  if ((!results || results.length === 0) && !specificReport) {
    return <div className="container mx-auto px-4 py-24 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center text-primary mb-3">
            <BrainCircuit className="h-8 w-8 mr-2" />
            <span className="text-sm font-medium">AI-Powered Results</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {specificReport ? 
              specificReport.name ? 
                `${specificReport.name}` : 
                `Quiz Results - ${new Date(specificReport.timestamp).toLocaleDateString()}` 
              : "Your Career Match Results"}
          </h1>
          <p className="text-muted-foreground">
            Based on your profile, our machine learning model has identified these career matches.
          </p>
          <div className="flex justify-center mt-6 space-x-4">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <DownloadCloud className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save to Career Matches
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Save Results</DialogTitle>
                  <DialogDescription>
                    Enter a name to save these career matches to your dashboard.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="col-span-3"
                      placeholder="My Ideal Careers"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" onClick={handleSaveAllResults}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-8">
          {animatedResults.map((result, index) => {
            const salaryRange = getSalaryRange(result);
            const resultId = result.id || `career-${index}`;
            
            return (
              <div 
                key={resultId}
                className="animate-reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card className="overflow-hidden card-hover">
                  <CardHeader className="bg-primary/5 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          {result.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {result.shortDescription || "A perfect career path based on your profile"}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleBookmarkToggle(result)}
                          className="h-8 w-8"
                        >
                          {isBookmarked(resultId) ? 
                            <BookmarkCheck className="h-5 w-5 text-primary" /> : 
                            <Bookmark className="h-5 w-5" />
                          }
                        </Button>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{result.matchPercentage || 95}%</div>
                          <div className="text-xs text-muted-foreground">match</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Match Score</h3>
                        <Progress value={result.matchPercentage || 95} className="h-2" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Salary Range</h3>
                          <p className="text-lg font-semibold">
                            ${salaryRange.min.toLocaleString()} - ${salaryRange.max.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Avg: ${Math.round(salaryRange.average).toLocaleString()}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Job Outlook</h3>
                          <p className="text-lg font-semibold">
                            {result.growthRate || result.growth || "Growing"}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Work Environment</h3>
                          <p className="text-lg font-semibold">
                            {result.workEnvironment || "Remote / Hybrid"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t bg-muted/20 px-6 py-4">
                    <Button 
                      className="w-full"
                      onClick={() => navigate(`/career/${result.id || index + 1}`)}
                    >
                      Explore This Career
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center space-x-4">
          <Button variant="outline" onClick={handleTryAgain}>
            Take the Quiz Again
          </Button>
          
          {specificReport && (
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
