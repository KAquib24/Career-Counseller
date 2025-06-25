import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useBookmark } from "../context/bookmark";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { Shield, BookOpen, Briefcase, ArrowRight, Bookmark, BookmarkCheck, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface QuizResult {
  id: string | number;
  quizNumber: string;
  career: string;
  match: number;
  date: string;
  customName?: string;
  reportId?: string;
  skills?: Record<string, string>;
  workStyle?: string;
}

interface CareerSalaryData {
  name: string;
  salary: number;
}

const Dashboard = () => {
  const { user, getUserStorageKey } = useAuth();
  const { toast } = useToast();
  const { bookmarkedCareers, toggleBookmark, isBookmarked } = useBookmark();
  
  const [savedResults, setSavedResults] = useState<QuizResult[]>([]);
  const [skillsData, setSkillsData] = useState<{ name: string; value: number }[]>([]);
  const [careerData, setCareerData] = useState<CareerSalaryData[]>([]);
  
  const [quizToDelete, setQuizToDelete] = useState<string | number | null>(null);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadSavedResults();
      loadSkillsData();
    }
  }, [user]);

  const loadSavedResults = () => {
    if (!user) return;
    
    try {
      const userStorageKey = getUserStorageKey(user.id);
      const reportsString = localStorage.getItem(userStorageKey);
      
      if (reportsString) {
        const reports = JSON.parse(reportsString);
        const savedReports = reports.filter((report: any) => report.id.startsWith('saved-'));
        
        const formattedResults = savedReports
          .map((report: any, index: number) => ({
            id: report.id,
            reportId: report.id,
            quizNumber: report.name || `Saved Careers ${index + 1}`,
            career: report.results?.[0]?.title || `Career Collection ${index + 1}`,
            match: report.results?.[0]?.matchPercentage || 0,
            date: new Date(report.timestamp).toISOString().split('T')[0],
            customName: report.name
          }))
          .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setSavedResults(formattedResults);
      }
    } catch (error) {
      console.error("Error loading saved results:", error);
    }
  };

  const loadSkillsData = () => {
    try {
      // Load skills data from any saved career matches if available
      const reportsString = localStorage.getItem('careermagic_reports');
      if (reportsString) {
        const reports = JSON.parse(reportsString);
        const latestReportWithSkills = reports.find((report: any) => 
          report.responses?.skills && Object.keys(report.responses.skills).length > 0
        );
        
        if (latestReportWithSkills && latestReportWithSkills.responses?.skills) {
          const skills = Object.entries(latestReportWithSkills.responses.skills)
            .filter(([_, level]) => level !== '')
            .map(([skill, level]) => {
              const skillValue = mapSkillLevelToValue(level as string);
              return { name: skill, value: skillValue };
            })
            .sort((a, b) => b.value - a.value)
            .slice(0, 4);
          
          setSkillsData(skills);
        }
        
        // Get salary data from all career names for salary chart
        const allCareers = reports.flatMap((report: any) => 
          report.results ? report.results.map((result: any) => result.title) : []
        );
        
        const uniqueCareers = Array.from(new Set(allCareers)).slice(0, 5);
        
        const careerSalaryData = uniqueCareers.map(careerTitle => {
          const baseSalary = getBaseSalaryForCareer(String(careerTitle));
          return {
            name: String(careerTitle),
            salary: baseSalary
          };
        });
        
        setCareerData(careerSalaryData);
      }
    } catch (error) {
      console.error("Error loading skills data:", error);
    }
  };

  const deleteQuizResult = (id: string | number) => {
    try {
      const reportsString = localStorage.getItem('careermagic_reports');
      if (reportsString) {
        const reports = JSON.parse(reportsString);
        
        const updatedReports = reports.filter((report: any) => report.id !== id);
        
        localStorage.setItem('careermagic_reports', JSON.stringify(updatedReports));
        
        localStorage.removeItem(`careermagic_${id}`);
        
        loadSavedResults();
        
        toast({
          title: "Saved Result Deleted",
          description: `Saved career match has been deleted successfully`,
        });
        
        setShowDeleteConfirmDialog(false);
        setQuizToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting saved result:", error);
      toast({
        title: "Error",
        description: "There was a problem deleting the saved career match",
        variant: "destructive",
      });
    }
  };

  const mapSkillLevelToValue = (level: string): number => {
    switch (level) {
      case "Expert": return 100;
      case "Advanced": return 75;
      case "Intermediate": return 50;
      case "Beginner": return 25;
      case "None": return 0;
      default: return 0;
    }
  };

  const getBaseSalaryForCareer = (careerTitle: string): number => {
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
    
    if (baseSalaries[careerTitle]) {
      baseSalary = baseSalaries[careerTitle];
    } else {
      for (const [title, salary] of Object.entries(baseSalaries)) {
        if (careerTitle.toLowerCase().includes(title.toLowerCase())) {
          baseSalary = salary;
          break;
        }
      }
    }
    
    return baseSalary;
  };

  const handleBookmarkToggle = (result: QuizResult) => {
    toggleBookmark({
      id: result.id,
      title: result.career,
      matchPercentage: result.match,
      date: result.date
    });
    
    toast({
      title: isBookmarked(result.id) 
        ? "Career removed from bookmarks" 
        : "Career bookmarked",
      description: isBookmarked(result.id)
        ? `${result.career} has been removed from your bookmarks`
        : `${result.career} has been added to your bookmarks`
    });
  };

  const navigateToCareerDetails = (resultId: string | number) => {
    if (typeof resultId === 'string') {
      if (resultId.startsWith('report') || resultId.startsWith('saved-')) {
        navigate(`/results?reportId=${resultId}`);
      } else {
        navigate(`/career/${resultId}`);
      }
    } else {
      navigate(`/career/${resultId}`);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.displayName || "User"}!
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0" 
          onClick={() => navigate("/quiz")}
        >
          Take Career Quiz
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="saved">Career Matches</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarked Careers</TabsTrigger>
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Saved Career Matches
                </CardTitle>
                <CardDescription>
                  Saved career collections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{savedResults.length}</div>
                <div className="flex mt-4 text-sm text-muted-foreground">
                  <Save className="mr-2 h-4 w-4" />
                  Custom saved career matches
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Bookmarked Careers
                </CardTitle>
                <CardDescription>
                  Individual saved careers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookmarkedCareers.length}</div>
                <div className="flex mt-4 text-sm text-muted-foreground">
                  <BookmarkCheck className="mr-2 h-4 w-4" />
                  Saved for future reference
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Career Matches</CardTitle>
              <CardDescription>
                Your most recently saved career recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedResults.length > 0 ? (
                  savedResults
                    .slice(0, 3)
                    .map((result) => (
                      <div key={result.id} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {result.customName ? result.customName : result.quizNumber}
                            {result.customName && <span className="ml-2 text-xs text-muted-foreground">(Saved)</span>}
                          </h4>
                          <p className="text-sm">
                            {result.customName ? 'Custom saved careers' : `Best match: ${result.career}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(result.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {!result.customName && <span className="mr-4 font-medium">{result.match}% match</span>}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleBookmarkToggle(result)}
                            className="mr-2"
                          >
                            {isBookmarked(result.id) ? 
                              <BookmarkCheck className="h-5 w-5 text-primary" /> : 
                              <Bookmark className="h-5 w-5" />
                            }
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => result.reportId ? navigateToCareerDetails(result.reportId) : null}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center py-6 text-muted-foreground">
                    You haven't saved any career matches yet. Take a quiz and save your results to see them here!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Career Matches</CardTitle>
              <CardDescription>
                Custom saved career collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedResults.length > 0 ? (
                <div className="space-y-6">
                  {savedResults.map((result) => (
                    <div 
                      key={result.id} 
                      className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 rounded-lg border"
                    >
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">{result.customName || result.quizNumber}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Saved on {new Date(result.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setQuizToDelete(result.id);
                            setShowDeleteConfirmDialog(true);
                          }}
                          className="mr-2"
                        >
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                        <Button 
                          onClick={() => result.reportId ? navigateToCareerDetails(result.reportId) : null}
                        >
                          View Saved Results
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No saved career matches yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    When you take a quiz, you can save the results with a custom name to view them later.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Careers</CardTitle>
              <CardDescription>
                Careers you've saved for future reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              {bookmarkedCareers.length > 0 ? (
                <div className="space-y-6">
                  {bookmarkedCareers.map((career) => (
                    <div 
                      key={career.id} 
                      className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 rounded-lg border"
                    >
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-lg">{career.title}</h3>
                          <span className="ml-3 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {career.matchPercentage}% match
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Bookmarked on {new Date(career.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleBookmark(career)}
                          className="mr-2"
                        >
                          <BookmarkCheck className="h-5 w-5 text-primary" />
                        </Button>
                        <Button 
                          onClick={() => navigateToCareerDetails(career.id)}
                        >
                          View Career Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No bookmarked careers yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    When you find a career you're interested in, click the bookmark icon to save it for future reference.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Analysis</CardTitle>
                <CardDescription>
                  Your skills based on quiz responses
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {skillsData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Take a quiz to see your skills analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Career Salary Comparison</CardTitle>
                <CardDescription>
                  Average salary ranges for recommended careers
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {careerData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={careerData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 150000]} tickFormatter={(value) => `$${value / 1000}k`} />
                      <YAxis dataKey="name" type="category" scale="band" width={100} />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Avg. Salary']} />
                      <Bar dataKey="salary" fill="#8884d8" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Take a quiz to see career salary comparisons</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Saved Result</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this saved career match? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setQuizToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => quizToDelete && deleteQuizResult(quizToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
