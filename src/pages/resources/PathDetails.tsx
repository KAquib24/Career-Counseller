import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Code, 
  Database, 
  ExternalLink, 
  FileText, 
  Layers, 
  CheckCircle, 
  Building, 
  Award,
  Shield,
  Server,
  Smartphone,
  Globe,
  PenTool,
  Bot
} from "lucide-react";

// Data for different learning paths
const pathsData = {
  "web-development": {
    title: "Web Development Path",
    icon: <Code size={24} className="text-primary" />,
    category: "Frontend",
    description: "Master modern web development technologies and build responsive, interactive web applications.",
    duration: "30+ Hours",
    modules: 12,
    projectCount: 8,
    overview: "The Web Development learning path takes you from the basics of HTML and CSS to advanced frontend frameworks like React. You'll learn how to build responsive, accessible, and interactive web applications that work across different devices and browsers.",
    skills: ["HTML5 & CSS3", "JavaScript (ES6+)", "React", "Redux", "TypeScript", "Responsive Design", "Web Performance", "Web Accessibility", "Version Control (Git)"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "HTML5 Structure & Semantics", duration: "2 hours" },
          { name: "CSS Layouts & Flexbox", duration: "3 hours" },
          { name: "CSS Grid & Responsive Design", duration: "2 hours" },
          { name: "JavaScript Basics & DOM Manipulation", duration: "4 hours" }
        ]
      },
      {
        stage: "Intermediate",
        topics: [
          { name: "JavaScript ES6+ Features", duration: "3 hours" },
          { name: "Working with APIs & Fetch", duration: "2 hours" },
          { name: "Introduction to React", duration: "4 hours" },
          { name: "React Hooks & State Management", duration: "3 hours" }
        ]
      },
      {
        stage: "Advanced",
        topics: [
          { name: "TypeScript for React Applications", duration: "3 hours" },
          { name: "Redux & Global State Management", duration: "3 hours" },
          { name: "Web Performance Optimization", duration: "2 hours" },
          { name: "Testing & Deployment", duration: "2 hours" }
        ]
      }
    ],
    projects: [
      { name: "Personal Portfolio Website", difficulty: "Beginner" },
      { name: "Interactive Dashboard", difficulty: "Intermediate" },
      { name: "E-commerce Product Page", difficulty: "Intermediate" },
      { name: "Social Media Application", difficulty: "Advanced" }
    ],
    courses: [
      { name: "The Complete Web Developer in 2025", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "React - The Complete Guide", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "JavaScript: Understanding the Weird Parts", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Frontend Masters Complete Intro to React", provider: "Frontend Masters", url: "https://frontendmasters.com" }
    ],
    companies: ["Google", "Meta", "Amazon", "Microsoft", "Shopify", "Airbnb", "Uber"]
  },
  "data-science": {
    title: "Data Science Path",
    icon: <Database size={24} className="text-primary" />,
    category: "Backend",
    description: "Dive into data analysis, visualization, statistical modeling, and machine learning algorithms.",
    duration: "25+ Hours",
    modules: 10,
    projectCount: 6,
    overview: "The Data Science learning path teaches you how to extract insights from data, build predictive models, and communicate your findings effectively. From statistical analysis to machine learning algorithms, you'll learn to solve real-world problems with data.",
    skills: ["Python", "Pandas & NumPy", "Data Visualization", "Statistical Analysis", "Machine Learning", "SQL", "Data Cleaning", "Feature Engineering", "Model Deployment"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "Python Programming Basics", duration: "3 hours" },
          { name: "Data Manipulation with Pandas", duration: "3 hours" },
          { name: "Data Visualization with Matplotlib & Seaborn", duration: "2 hours" },
          { name: "SQL for Data Scientists", duration: "2 hours" }
        ]
      },
      {
        stage: "Intermediate",
        topics: [
          { name: "Statistical Analysis & Hypothesis Testing", duration: "3 hours" },
          { name: "Introduction to Machine Learning", duration: "3 hours" },
          { name: "Supervised Learning Algorithms", duration: "3 hours" },
          { name: "Unsupervised Learning & Clustering", duration: "2 hours" }
        ]
      },
      {
        stage: "Advanced",
        topics: [
          { name: "Feature Engineering & Selection", duration: "2 hours" },
          { name: "Model Evaluation & Tuning", duration: "2 hours" },
          { name: "Time Series Analysis", duration: "2 hours" },
          { name: "Model Deployment & Production", duration: "2 hours" }
        ]
      }
    ],
    projects: [
      { name: "Exploratory Data Analysis Project", difficulty: "Beginner" },
      { name: "Customer Segmentation", difficulty: "Intermediate" },
      { name: "Predictive Modeling Competition", difficulty: "Intermediate" },
      { name: "Recommendation System", difficulty: "Advanced" }
    ],
    courses: [
      { name: "Data Science A-Z™", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Python for Data Science and Machine Learning Bootcamp", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Applied Data Science with Python", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "Machine Learning by Stanford University", provider: "Coursera", url: "https://www.coursera.org" }
    ],
    companies: ["Google", "Amazon", "Microsoft", "Netflix", "Spotify", "Airbnb", "IBM"]
  },
  "cybersecurity": {
    title: "Cybersecurity Path",
    icon: <Shield size={24} className="text-primary" />,
    category: "Security",
    description: "Learn network security, ethical hacking, threat detection, and security best practices.",
    duration: "35+ Hours",
    modules: 14,
    projectCount: 5,
    overview: "The Cybersecurity learning path prepares you to protect digital assets from various threats. You'll learn about network security, vulnerability assessment, threat detection, and how to implement effective security measures across different systems.",
    skills: ["Network Security", "Ethical Hacking", "Security Operations", "Vulnerability Assessment", "Incident Response", "Cryptography", "Security Compliance", "Threat Intelligence"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "Introduction to Cybersecurity", duration: "2 hours" },
          { name: "Networking Fundamentals", duration: "3 hours" },
          { name: "Operating System Security", duration: "3 hours" },
          { name: "Introduction to Cryptography", duration: "2 hours" }
        ]
      },
      {
        stage: "Intermediate",
        topics: [
          { name: "Network Security & Firewalls", duration: "3 hours" },
          { name: "Vulnerability Assessment", duration: "3 hours" },
          { name: "Web Application Security", duration: "3 hours" },
          { name: "Ethical Hacking Methodologies", duration: "4 hours" }
        ]
      },
      {
        stage: "Advanced",
        topics: [
          { name: "Penetration Testing", duration: "4 hours" },
          { name: "Incident Response", duration: "3 hours" },
          { name: "Security Operations Center", duration: "3 hours" },
          { name: "Security Compliance & Standards", duration: "2 hours" }
        ]
      }
    ],
    projects: [
      { name: "Network Security Assessment", difficulty: "Beginner" },
      { name: "Web Application Penetration Test", difficulty: "Intermediate" },
      { name: "Security Incident Response Simulation", difficulty: "Advanced" },
      { name: "Secure Coding Project", difficulty: "Intermediate" }
    ],
    courses: [
      { name: "CompTIA Security+ Certification", provider: "CompTIA", url: "https://www.comptia.org" },
      { name: "Ethical Hacking Course", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Cyber Security Specialist", provider: "Pluralsight", url: "https://www.pluralsight.com" },
      { name: "Web Security: OAuth and OpenID Connect", provider: "LinkedIn Learning", url: "https://www.linkedin.com/learning" }
    ],
    companies: ["Cisco", "Crowdstrike", "Palo Alto Networks", "IBM Security", "Microsoft", "Google", "Amazon"]
  },
  "cloud-engineering": {
    title: "Cloud Engineering Path",
    icon: <Server size={24} className="text-primary" />,
    category: "DevOps",
    description: "Learn to design, deploy, and manage cloud infrastructure with DevOps practices.",
    duration: "28+ Hours",
    modules: 8,
    projectCount: 7,
    overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    skills: ["Cloud Infrastructure", "AWS/Azure/GCP", "DevOps", "CI/CD", "Kubernetes", "Terraform", "Docker", "Infrastructure as Code"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "Introduction to Cloud Computing", duration: "2 hours" },
          { name: "Linux Fundamentals", duration: "3 hours" },
          { name: "AWS/Azure/GCP Core Services", duration: "4 hours" },
          { name: "Introduction to Docker", duration: "2 hours" }
        ]
      },
      {
        stage: "Intermediate",
        topics: [
          { name: "Advanced Cloud Services", duration: "3 hours" },
          { name: "Infrastructure as Code with Terraform", duration: "3 hours" },
          { name: "CI/CD Pipeline Implementation", duration: "3 hours" },
          { name: "Kubernetes Fundamentals", duration: "3 hours" }
        ]
      },
      {
        stage: "Advanced",
        topics: [
          { name: "Advanced Kubernetes", duration: "3 hours" },
          { name: "Cloud Security & Compliance", duration: "2 hours" },
          { name: "Monitoring & Observability", duration: "2 hours" },
          { name: "Cost Optimization", duration: "2 hours" }
        ]
      }
    ],
    projects: [
      { name: "Deploy a Web Application to AWS", difficulty: "Beginner" },
      { name: "Create Infrastructure as Code with Terraform", difficulty: "Intermediate" },
      { name: "Build a CI/CD Pipeline", difficulty: "Intermediate" },
      { name: "Kubernetes Cluster Management", difficulty: "Advanced" }
    ],
    courses: [
      { name: "AWS Certified Solutions Architect", provider: "A Cloud Guru", url: "https://acloudguru.com" },
      { name: "Terraform: Getting Started", provider: "Pluralsight", url: "https://www.pluralsight.com" },
      { name: "Docker and Kubernetes: The Complete Guide", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "DevOps Engineer Learning Path", provider: "LinkedIn Learning", url: "https://www.linkedin.com/learning" }
    ],
    companies: ["Amazon AWS", "Microsoft Azure", "Google Cloud", "IBM Cloud", "Datadog", "HashiCorp", "Red Hat"]
  },
  "mobile-development": {
    title: "Mobile App Development Path",
    icon: <Smartphone size={24} className="text-primary" />,
    category: "Mobile",
    description: "Build native and cross-platform mobile applications for iOS and Android.",
    duration: "22+ Hours",
    modules: 9,
    projectCount: 5,
    overview: "Learn to develop mobile applications for iOS and Android platforms using modern frameworks and best practices.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Mobile UI/UX", "App Distribution", "Mobile APIs", "State Management"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "Introduction to Mobile Development", duration: "2 hours" },
          { name: "Setting Up Development Environment", duration: "2 hours" },
          { name: "UI Components and Layouts", duration: "3 hours" },
          { name: "Navigation and Routing", duration: "2 hours" }
        ]
      },
      {
        stage: "Intermediate",
        topics: [
          { name: "State Management", duration: "3 hours" },
          { name: "Working with APIs", duration: "2 hours" },
          { name: "Device Features & Permissions", duration: "3 hours" },
          { name: "Local Storage & Offline Support", duration: "2 hours" }
        ]
      },
      {
        stage: "Advanced",
        topics: [
          { name: "Performance Optimization", duration: "2 hours" },
          { name: "Testing Mobile Applications", duration: "2 hours" },
          { name: "Publishing to App Stores", duration: "2 hours" },
          { name: "Analytics & Monitoring", duration: "1 hour" }
        ]
      }
    ],
    projects: [
      { name: "Weather App", difficulty: "Beginner" },
      { name: "Task Management App", difficulty: "Intermediate" },
      { name: "Social Media Client", difficulty: "Intermediate" },
      { name: "E-commerce Mobile App", difficulty: "Advanced" }
    ],
    courses: [
      { name: "React Native - The Practical Guide", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Flutter & Dart - The Complete Guide", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "iOS & Swift - The Complete iOS App Development Bootcamp", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Android App Development Masterclass using Kotlin", provider: "Udemy", url: "https://www.udemy.com" }
    ],
    companies: ["Google", "Apple", "Meta", "Uber", "Airbnb", "Twitter", "Spotify"]
  },
  "full-stack": {
    title: "Full-Stack Development Path",
    icon: <Layers size={24} className="text-primary" />,
    category: "Full-Stack",
    description: "Master both frontend and backend technologies to build complete web applications.",
    duration: "40+ Hours",
    modules: 15,
    projectCount: 10,
    overview: "The Full-Stack Development path equips you with skills in both frontend and backend technologies, enabling you to build complete web applications from UI design to database management and server configuration.",
    skills: ["JavaScript/TypeScript", "React", "Node.js", "Express", "SQL/NoSQL Databases", "REST/GraphQL APIs", "DevOps Basics", "Testing", "Authentication"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "HTML, CSS & JavaScript Basics", duration: "3 hours" },
          { name: "Introduction to Node.js", duration: "2 hours" },
          { name: "Database Fundamentals", duration: "3 hours" },
          { name: "RESTful API Design", duration: "2 hours" }
        ]
      },
      {
        stage: "Frontend Stack",
        topics: [
          { name: "Modern JavaScript (ES6+)", duration: "3 hours" },
          { name: "React Fundamentals", duration: "4 hours" },
          { name: "State Management", duration: "3 hours" },
          { name: "CSS Frameworks & UI Libraries", duration: "2 hours" }
        ]
      },
      {
        stage: "Backend Stack",
        topics: [
          { name: "Server-side Programming with Node.js", duration: "3 hours" },
          { name: "Express.js Framework", duration: "3 hours" },
          { name: "SQL & NoSQL Databases", duration: "4 hours" },
          { name: "Authentication & Authorization", duration: "3 hours" }
        ]
      },
      {
        stage: "Advanced Topics",
        topics: [
          { name: "Testing & CI/CD", duration: "3 hours" },
          { name: "GraphQL APIs", duration: "3 hours" },
          { name: "Deployment & DevOps", duration: "2 hours" },
          { name: "Performance Optimization", duration: "2 hours" }
        ]
      }
    ],
    projects: [
      { name: "Personal Portfolio Website", difficulty: "Beginner" },
      { name: "Task Management Application", difficulty: "Intermediate" },
      { name: "E-commerce Platform", difficulty: "Advanced" },
      { name: "Social Media Application", difficulty: "Advanced" }
    ],
    courses: [
      { name: "The Web Developer Bootcamp", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "MERN Stack Front To Back", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "JavaScript: The Advanced Concepts", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Full Stack Open", provider: "University of Helsinki", url: "https://fullstackopen.com" }
    ],
    companies: ["Google", "Facebook", "Amazon", "Microsoft", "Netflix", "Airbnb", "Shopify"]
  },
  "ux-ui-design": {
    title: "UX/UI Design Path",
    icon: <PenTool size={24} className="text-primary" />,
    category: "Design",
    description: "Learn to create intuitive and visually appealing user interfaces.",
    duration: "24+ Hours",
    modules: 8,
    projectCount: 6,
    overview: "The UX/UI Design path teaches you how to design digital products that are both functional and beautiful. You'll learn user research, wireframing, prototyping, visual design, and usability testing.",
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Design Systems", "Usability Testing", "Interaction Design", "Design Tools (Figma, Sketch)"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "Introduction to UX/UI Design", duration: "2 hours" },
          { name: "Design Thinking Process", duration: "2 hours" },
          { name: "User Research Methods", duration: "3 hours" },
          { name: "Information Architecture", duration: "2 hours" }
        ]
      },
      {
        stage: "UI Design Skills",
        topics: [
          { name: "Visual Design Principles", duration: "3 hours" },
          { name: "Typography & Color Theory", duration: "2 hours" },
          { name: "UI Components & Patterns", duration: "3 hours" },
          { name: "Design Tools (Figma, Sketch)", duration: "3 hours" }
        ]
      },
      {
        stage: "Advanced UX",
        topics: [
          { name: "Wireframing & Prototyping", duration: "3 hours" },
          { name: "Usability Testing", duration: "2 hours" },
          { name: "Design Systems", duration: "3 hours" },
          { name: "Responsive & Mobile Design", duration: "2 hours" }
        ]
      }
    ],
    projects: [
      { name: "Mobile App Redesign", difficulty: "Beginner" },
      { name: "E-commerce Website", difficulty: "Intermediate" },
      { name: "Design System Creation", difficulty: "Intermediate" },
      { name: "UX Case Study", difficulty: "Advanced" }
    ],
    courses: [
      { name: "UI/UX Design Bootcamp", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Learn UI Design", provider: "Learn UI Design", url: "https://learnui.design" },
      { name: "Design Fundamentals", provider: "Interaction Design Foundation", url: "https://www.interaction-design.org" },
      { name: "UX Design Institute Professional Diploma", provider: "UX Design Institute", url: "https://www.uxdesigninstitute.com" }
    ],
    companies: ["Google", "Apple", "Airbnb", "Figma", "Adobe", "Microsoft", "Spotify"]
  },
  "ai-machine-learning": {
    title: "AI & Machine Learning Path",
    icon: <Bot size={24} className="text-primary" />,
    category: "Emerging",
    description: "Dive into the world of artificial intelligence and machine learning.",
    duration: "32+ Hours",
    modules: 12,
    projectCount: 4,
    overview: "The AI & Machine Learning path explores the theories and practical applications of artificial intelligence. From foundational algorithms to deep learning, you'll gain the skills to build intelligent systems.",
    skills: ["Python", "Statistics", "Machine Learning Algorithms", "Deep Learning", "Neural Networks", "Natural Language Processing", "Computer Vision", "Data Preprocessing"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "Python for Data Science", duration: "3 hours" },
          { name: "Statistics & Probability", duration: "3 hours" },
          { name: "Data Manipulation & Visualization", duration: "3 hours" },
          { name: "Introduction to Machine Learning", duration: "2 hours" }
        ]
      },
      {
        stage: "Machine Learning",
        topics: [
          { name: "Supervised Learning", duration: "4 hours" },
          { name: "Unsupervised Learning", duration: "3 hours" },
          { name: "Feature Engineering", duration: "2 hours" },
          { name: "Model Evaluation & Validation", duration: "2 hours" }
        ]
      },
      {
        stage: "Deep Learning",
        topics: [
          { name: "Neural Networks Fundamentals", duration: "3 hours" },
          { name: "Deep Learning Frameworks", duration: "3 hours" },
          { name: "Natural Language Processing", duration: "3 hours" },
          { name: "Computer Vision", duration: "3 hours" }
        ]
      },
      {
        stage: "Applied AI",
        topics: [
          { name: "Building AI Products", duration: "2 hours" },
          { name: "Ethics in AI", duration: "1 hour" },
          { name: "Deploying ML Models", duration: "2 hours" },
          { name: "AI Project Management", duration: "1 hour" }
        ]
      }
    ],
    projects: [
      { name: "Image Classification Model", difficulty: "Intermediate" },
      { name: "Sentiment Analysis System", difficulty: "Intermediate" },
      { name: "Recommendation Engine", difficulty: "Advanced" },
      { name: "Computer Vision Application", difficulty: "Advanced" }
    ],
    courses: [
      { name: "Machine Learning by Stanford University", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "Deep Learning Specialization", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "Practical Deep Learning for Coders", provider: "fast.ai", url: "https://www.fast.ai" },
      { name: "TensorFlow Developer Certificate", provider: "TensorFlow", url: "https://www.tensorflow.org/certificate" }
    ],
    companies: ["Google", "OpenAI", "Meta AI", "Microsoft", "NVIDIA", "IBM Watson", "Amazon"]
  },
  "blockchain": {
    title: "Blockchain Development Path",
    icon: <Globe size={24} className="text-primary" />,
    category: "Web3",
    description: "Learn to build decentralized applications on blockchain technology.",
    duration: "26+ Hours",
    modules: 9,
    projectCount: 5,
    overview: "The Blockchain Development path introduces you to distributed ledger technology and smart contracts. You'll learn how to build decentralized applications on platforms like Ethereum and explore the Web3 ecosystem.",
    skills: ["Blockchain Fundamentals", "Smart Contracts", "Solidity", "Web3.js/Ethers.js", "Decentralized Apps", "Tokenomics", "Security", "Testing"],
    roadmap: [
      {
        stage: "Fundamentals",
        topics: [
          { name: "Blockchain Fundamentals", duration: "3 hours" },
          { name: "Cryptography Basics", duration: "2 hours" },
          { name: "Introduction to Ethereum", duration: "2 hours" },
          { name: "Smart Contract Basics", duration: "3 hours" }
        ]
      },
      {
        stage: "Smart Contract Development",
        topics: [
          { name: "Solidity Programming", duration: "4 hours" },
          { name: "Testing Smart Contracts", duration: "2 hours" },
          { name: "Smart Contract Patterns", duration: "2 hours" },
          { name: "Security Best Practices", duration: "3 hours" }
        ]
      },
      {
        stage: "Decentralized Applications",
        topics: [
          { name: "Web3.js/Ethers.js", duration: "3 hours" },
          { name: "Connecting Frontend to Blockchain", duration: "3 hours" },
          { name: "IPFS & Decentralized Storage", duration: "2 hours" },
          { name: "Token Standards (ERC20, ERC721)", duration: "2 hours" }
        ]
      }
    ],
    projects: [
      { name: "Simple Token Contract", difficulty: "Beginner" },
      { name: "NFT Collection", difficulty: "Intermediate" },
      { name: "Decentralized Exchange", difficulty: "Advanced" },
      { name: "DAO Governance System", difficulty: "Advanced" }
    ],
    courses: [
      { name: "Ethereum and Solidity: The Complete Developer's Guide", provider: "Udemy", url: "https://www.udemy.com" },
      { name: "Blockchain Specialization", provider: "Coursera", url: "https://www.coursera.org" },
      { name: "Crypto Zombies", provider: "CryptoZombies", url: "https://cryptozombies.io" },
      { name: "Blockchain Developer Bootcamp", provider: "ConsenSys Academy", url: "https://consensys.net/academy" }
    ],
    companies: ["ConsenSys", "Ethereum Foundation", "Coinbase", "Binance", "Polygon", "Uniswap", "Chainlink"]
  }
};

const PathDetails = () => {
  const { pathId } = useParams();
  const [pathData, setPathData] = useState<any>(null);
  
  useEffect(() => {
    if (pathId && pathsData[pathId as keyof typeof pathsData]) {
      setPathData(pathsData[pathId as keyof typeof pathsData]);
    }
  }, [pathId]);

  if (!pathData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Path not found</h2>
        <Link to="/resources/learning-paths">
          <Button>
            <ArrowLeft className="mr-2" size={16} /> Back to Learning Paths
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/resources/learning-paths" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2" size={16} /> Back to Learning Paths
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <Badge className="mb-4">{pathData.category}</Badge>
            <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
              {pathData.icon} {pathData.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              {pathData.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-muted-foreground" /> 
                <span>{pathData.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText size={16} className="text-muted-foreground" /> 
                <span>{pathData.modules} Modules</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Code size={16} className="text-muted-foreground" /> 
                <span>{pathData.projectCount || pathData.projects?.length || 0} Projects</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {pathData.overview}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skills You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pathData.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="py-1.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Learning Roadmap</CardTitle>
                <CardDescription>Follow this step-by-step path to master the skills</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {pathData.roadmap.map((stage: any, index: number) => (
                    <AccordionItem key={index} value={`stage-${index}`}>
                      <AccordionTrigger className="text-lg font-medium">
                        {stage.stage}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pl-4 border-l-2 border-muted">
                          {stage.topics.map((topic: any, idx: number) => (
                            <div key={idx} className="relative pl-6">
                              <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-background border-2 border-muted"></div>
                              <div className="flex justify-between">
                                <p className="font-medium">{topic.name}</p>
                                <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-1">
                                  {topic.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Hands-on Projects</CardTitle>
                <CardDescription>Apply your knowledge with real-world projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pathData.projects.map((project: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div>
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <Badge variant="outline" className="mt-1">
                          {project.difficulty}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Courses</CardTitle>
              <CardDescription>Curated resources to help you learn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pathData.courses.map((course: any, index: number) => (
                  <a 
                    key={index} 
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.provider}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Companies Hiring</CardTitle>
              <CardDescription>Companies looking for these skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pathData.companies.map((company: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{company}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PathDetails;
