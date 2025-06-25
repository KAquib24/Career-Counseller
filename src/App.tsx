import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import { QuizProvider } from "./context/quiz";
import { BookmarkProvider } from "./context/bookmark";
import { useAuth } from "./context/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CareerDetails from "./pages/CareerDetails";

// Resource pages
import LearningPaths from "./pages/resources/LearningPaths";
import PathDetails from "./pages/resources/PathDetails";

// Legal pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <BookmarkProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="results" element={<Results />} />
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="career/:id" element={<CareerDetails />} />
                
                {/* Resource Pages */}
                <Route path="resources/learning-paths" element={<LearningPaths />} />
                <Route path="resources/learning-paths/:pathId" element={<PathDetails />} />
                
                {/* Legal Pages */}
                <Route path="legal/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="legal/terms-of-service" element={<TermsOfService />} />
                <Route path="legal/cookie-policy" element={<CookiePolicy />} />
                
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </BookmarkProvider>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
