
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { 
  Briefcase, 
  Code, 
  Search,
  LineChart, 
  Shield, 
  Users, 
  ArrowRight 
} from "lucide-react";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary animate-pulse-slow">
                  Find Your Path in Tech
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover Your Perfect Career in Technology
              </h1>
              <p className="text-lg text-muted-foreground">
                Personalized career recommendations based on your skills, interests, and educational background.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/quiz">
                  <Button size="lg" className="w-full sm:w-auto">
                    Take the Quiz <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Create Account
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl overflow-hidden p-6 shadow-lg">
                <div className="glass-card absolute top-8 left-4 rounded-xl p-4 animate-fade-in animate-delay-100">
                  <Code className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-medium">Software Development</h3>
                </div>
                <div className="glass-card absolute top-1/3 right-4 rounded-xl p-4 animate-fade-in animate-delay-200">
                  <LineChart className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-medium">Data Science</h3>
                </div>
                <div className="glass-card absolute bottom-8 left-1/4 rounded-xl p-4 animate-fade-in animate-delay-300">
                  <Shield className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-medium">Cybersecurity</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our personalized recommendation system helps you find the best career path in technology based on your unique profile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm card-hover">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Take the Quiz</h3>
              <p className="text-muted-foreground">
                Answer questions about your skills, interests, education level, and work preferences.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm card-hover">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-muted-foreground">
                Receive personalized career suggestions that match your profile and preferences.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm card-hover">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Explore Details</h3>
              <p className="text-muted-foreground">
                Learn about salary expectations, required skills, and recommended learning resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 lg:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Career?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Take our comprehensive career quiz and discover technology career paths that perfectly match your profile.
            </p>
            <Link to="/quiz">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Start the Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


