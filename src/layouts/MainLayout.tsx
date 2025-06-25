
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  // Page transition effect
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => setIsLoaded(true), 100);
    window.scrollTo(0, 0); // Scroll to top on route change
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main 
        className={`flex-grow transition-opacity duration-300 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
