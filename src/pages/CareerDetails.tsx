
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Briefcase, 
  Building2, 
  ChevronLeft, 
  GraduationCap, 
  LineChart, 
  MapPin, 
  Share2 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import careers, { Career } from "@/data/careerData";

const CareerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [salaryData, setSalaryData] = useState<any[]>([]);

  useEffect(() => {
    // Find the career from our data using the URL id parameter
    const fetchCareer = () => {
      setLoading(true);
      
      setTimeout(() => {
        if (id) {
          const foundCareer = careers.find(c => c.id === id);
          
          if (foundCareer) {
            setCareer(foundCareer);
            
            // Generate salary data for chart based on the career's salary ranges
            const generatedSalaryData = generateSalaryData(foundCareer);
            setSalaryData(generatedSalaryData);
          }
        }
        
        setLoading(false);
      }, 500);
    };

    fetchCareer();
  }, [id]);

  // Generate salary data for the chart based on career data
  const generateSalaryData = (careerData: Career) => {
    // Parse salary ranges to get approximate values
    const usRange = careerData.salaryRange.us.replace(/[^0-9,-]/g, '').split('-');
    const europeRange = careerData.salaryRange.europe.replace(/[^0-9,-]/g, '').split('-');
    const asiaRange = careerData.salaryRange.asia.replace(/[^0-9,-]/g, '').split('-');
    
    // Calculate averages for each region
    const usAvg = (parseInt(usRange[0]) + parseInt(usRange[1])) / 2;
    const europeAvg = (parseInt(europeRange[0]) + parseInt(europeRange[1])) / 2;
    const asiaAvg = (parseInt(asiaRange[0]) + parseInt(asiaRange[1])) / 2;
    
    return [
      { country: "United States", salary: usAvg },
      { country: "Europe", salary: europeAvg },
      { country: "Asia", salary: asiaAvg },
      { country: "Global Average", salary: (usAvg + europeAvg + asiaAvg) / 3 }
    ];
  };

  const handleShare = () => {
    toast({
      title: "Share feature",
      description: "This feature is coming soon!",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading career details...</p>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Career not found</h2>
        <p className="mb-6">Sorry, we couldn't find the career details you're looking for.</p>
        <Button onClick={() => navigate('/results')}>
          Return to Results
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{career.title}</h1>
              <Badge className="bg-primary/90">
                95% Match
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              Remote / Hybrid • {career.growthRate}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              Save to Profile
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-lg leading-relaxed">
            {career.description}
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Career Overview</CardTitle>
                <CardDescription>
                  Key information about a career as a {career.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="font-medium mb-3">Salary by Region</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={salaryData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Average Salary']} />
                        <Bar dataKey="salary" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Job Outlook</h3>
                  <div className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-green-500" />
                    <p>{career.growthRate}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Market Demand</h3>
                  <div className="flex items-center">
                    <Badge className={`mr-2 ${
                      career.jobMarketDemand === "High" ? "bg-green-500" : 
                      career.jobMarketDemand === "Medium" ? "bg-yellow-500" : "bg-red-500"
                    }`}>
                      {career.jobMarketDemand}
                    </Badge>
                    <p>{career.jobMarketDemand === "High" ? "Excellent job prospects" : 
                       career.jobMarketDemand === "Medium" ? "Good job prospects" : "Limited job prospects"}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Experience Level</h3>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <p>{career.skillLevel}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
                <CardDescription>
                  Skills you'll need to succeed as a {career.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="font-medium mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {career.requirements.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Problem Solving", "Communication", "Teamwork", "Adaptability", "Critical Thinking"].map((skill: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Recommended Certifications</h3>
                  <ul className="space-y-3">
                    {career.certifications.map((cert: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-3 text-primary/70" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education & Learning</CardTitle>
                <CardDescription>
                  Educational paths and resources to become a {career.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="font-medium mb-3">Education Requirement</h3>
                  <div className="flex items-center mb-4">
                    <GraduationCap className="h-5 w-5 mr-3 text-primary/70" />
                    <span>{career.requirements.education}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-3 text-primary/70" />
                    <span>Experience: {career.requirements.experience}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Recommended Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {career.recommendedCourses.map((course, index) => (
                      <a 
                        key={index} 
                        href={course.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <BookOpen className="h-5 w-5 mr-3 text-primary/70" />
                        <div>
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-muted-foreground">{course.provider}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle>Top Companies</CardTitle>
                <CardDescription>
                  Major companies that hire {career.title}s
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {career.topEmployers.map((company: string, index: number) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Building2 className="h-5 w-5 text-primary/70" />
                      </div>
                      <div>
                        <div className="font-medium">{company}</div>
                        <div className="text-xs text-muted-foreground">Top Employer</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium mb-3">Related Job Titles</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Senior " + career.title, "Lead " + career.title, career.title + " Manager", "Principal " + career.title].map((title, index) => (
                      <Badge key={index} variant="outline">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerDetails;
