
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Code, Database, Lock, Shield } from "lucide-react";

const SkillAssessment = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Skill Assessment</h1>
        <p className="text-muted-foreground text-lg">
          Test your knowledge in various tech domains and identify areas for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code size={20} /> Frontend Development Assessment
            </CardTitle>
            <CardDescription>Test your HTML, CSS, JavaScript, and React skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>HTML & CSS</span>
                  <span className="text-muted-foreground">6/10 complete</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>JavaScript</span>
                  <span className="text-muted-foreground">Not started</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>React</span>
                  <span className="text-muted-foreground">Not started</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <Button className="w-full">
                Continue Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} /> Data Science Assessment
            </CardTitle>
            <CardDescription>Test your Python, SQL, and data analysis skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>Python Fundamentals</span>
                  <Badge className="ml-auto">85%</Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span>SQL & Database</span>
                  <Badge className="ml-auto">92%</Badge>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock size={16} />
                  <span>Statistical Analysis</span>
                  <Badge variant="outline" className="ml-auto">Locked</Badge>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock size={16} />
                  <span>Machine Learning</span>
                  <Badge variant="outline" className="ml-auto">Locked</Badge>
                </div>
              </div>
              
              <Button className="w-full">
                Continue Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} /> Cybersecurity Assessment
            </CardTitle>
            <CardDescription>Test your network security and threat detection skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Lock size={24} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                This assessment is available for registered users.
              </p>
              <Button>
                Sign in to Start
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-muted/50">
          <CardHeader>
            <CardTitle className="text-muted-foreground">More Assessments Coming Soon</CardTitle>
            <CardDescription>We're constantly adding new skill assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Future assessments will include:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Cloud Computing</li>
                <li>• DevOps & CI/CD</li>
                <li>• Mobile Development</li>
                <li>• Blockchain Technology</li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Notified <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="p-6 border-primary/20 bg-primary/5">
          <CardContent className="space-y-4 p-0">
            <h3 className="text-xl font-semibold">Why take our skill assessments?</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                <span>Identify knowledge gaps and areas for improvement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                <span>Get personalized learning recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                <span>Validate your skills with industry-standard assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                <span>Share your results with potential employers</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillAssessment;
