import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Code, 
  Database, 
  Lock, 
  Shield, 
  Server, 
  Smartphone, 
  Globe, 
  Layers, 
  PenTool, 
  Bot
} from "lucide-react";

const LearningPaths = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Learning Paths</h1>
        <p className="text-muted-foreground text-lg">
          Structured learning journeys to help you develop the skills needed for your desired tech career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Frontend</Badge>
            <CardTitle className="flex items-center gap-2">
              <Code size={20} /> Web Development Path
            </CardTitle>
            <CardDescription>Master modern web development technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Learn HTML, CSS, JavaScript, React, and other essential tools for building responsive and interactive web applications.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">12 Modules</Badge>
                <Badge variant="outline" className="text-xs">8 Projects</Badge>
                <Badge variant="outline" className="text-xs">30+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/web-development">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Backend</Badge>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} /> Data Science Path
            </CardTitle>
            <CardDescription>From data analysis to machine learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Dive into data analysis, visualization, statistical modeling, and machine learning algorithms with Python and specialized libraries.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">10 Modules</Badge>
                <Badge variant="outline" className="text-xs">6 Projects</Badge>
                <Badge variant="outline" className="text-xs">25+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/data-science">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Security</Badge>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} /> Cybersecurity Path
            </CardTitle>
            <CardDescription>Protect systems and networks from threats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Learn network security, ethical hacking, threat detection, and security best practices to protect digital assets.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">14 Modules</Badge>
                <Badge variant="outline" className="text-xs">5 Labs</Badge>
                <Badge variant="outline" className="text-xs">35+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/cybersecurity">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">DevOps</Badge>
            <CardTitle className="flex items-center gap-2">
              <Server size={20} /> Cloud Engineering Path
            </CardTitle>
            <CardDescription>Master cloud infrastructure and DevOps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Learn to design, deploy, and manage cloud infrastructure with AWS, Azure, or GCP, along with CI/CD pipelines and container orchestration.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">8 Modules</Badge>
                <Badge variant="outline" className="text-xs">7 Projects</Badge>
                <Badge variant="outline" className="text-xs">28+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/cloud-engineering">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Mobile</Badge>
            <CardTitle className="flex items-center gap-2">
              <Smartphone size={20} /> Mobile App Development
            </CardTitle>
            <CardDescription>Build native and cross-platform mobile apps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Master technologies like React Native, Flutter, iOS (Swift), and Android (Kotlin) to build powerful mobile applications.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">9 Modules</Badge>
                <Badge variant="outline" className="text-xs">5 Projects</Badge>
                <Badge variant="outline" className="text-xs">22+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/mobile-development">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Full-Stack</Badge>
            <CardTitle className="flex items-center gap-2">
              <Layers size={20} /> Full-Stack Development
            </CardTitle>
            <CardDescription>Become a versatile developer across all layers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Develop skills in frontend, backend, databases, and deployment to become a complete full-stack developer.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">15 Modules</Badge>
                <Badge variant="outline" className="text-xs">10 Projects</Badge>
                <Badge variant="outline" className="text-xs">40+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/full-stack">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Design</Badge>
            <CardTitle className="flex items-center gap-2">
              <PenTool size={20} /> UX/UI Design Path
            </CardTitle>
            <CardDescription>Create intuitive and beautiful interfaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Learn user research, wireframing, prototyping, and design systems to create engaging digital experiences.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">8 Modules</Badge>
                <Badge variant="outline" className="text-xs">6 Projects</Badge>
                <Badge variant="outline" className="text-xs">24+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/ux-ui-design">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Emerging</Badge>
            <CardTitle className="flex items-center gap-2">
              <Bot size={20} /> AI & Machine Learning
            </CardTitle>
            <CardDescription>Dive into artificial intelligence technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Explore machine learning algorithms, neural networks, natural language processing, and AI frameworks.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">12 Modules</Badge>
                <Badge variant="outline" className="text-xs">4 Projects</Badge>
                <Badge variant="outline" className="text-xs">32+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/ai-machine-learning">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Web3</Badge>
            <CardTitle className="flex items-center gap-2">
              <Globe size={20} /> Blockchain Development
            </CardTitle>
            <CardDescription>Build decentralized applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Learn blockchain fundamentals, smart contracts, and how to build decentralized applications with Ethereum and other platforms.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">9 Modules</Badge>
                <Badge variant="outline" className="text-xs">5 Projects</Badge>
                <Badge variant="outline" className="text-xs">26+ Hours</Badge>
              </div>
              <Link to="/resources/learning-paths/blockchain">
                <Button className="w-full mt-4">
                  Explore Path <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningPaths;
