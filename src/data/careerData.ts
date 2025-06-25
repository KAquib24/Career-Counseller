
export interface Career {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  requirements: {
    skills: string[];
    education: string;
    experience: string;
  };
  salaryRange: {
    us: string;
    europe: string;
    asia: string;
  };
  jobMarketDemand: "High" | "Medium" | "Low";
  growthRate: string;
  recommendedCourses: {
    name: string;
    provider: string;
    url: string;
  }[];
  certifications: string[];
  topEmployers: string[];
  skillLevel: "Entry" | "Mid-Level" | "Senior";
  icon: string;
}

const careers: Career[] = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Software Engineers design, develop, and maintain software systems and applications. They work on everything from web and mobile applications to operating systems and network control systems. They collaborate with cross-functional teams, write clean and efficient code, debug issues, and continuously improve software performance and user experience.",
    shortDescription: "Design and build applications and systems that power modern technology.",
    requirements: {
      skills: ["JavaScript", "Python", "Java", "C++", "SQL", "REST APIs", "Git", "Agile methodologies"],
      education: "Bachelor's degree in Computer Science or related field",
      experience: "Entry-level positions available with internship experience",
    },
    salaryRange: {
      us: "$75,000 - $150,000",
      europe: "€55,000 - €95,000",
      asia: "$30,000 - $80,000",
    },
    jobMarketDemand: "High",
    growthRate: "22% (Much faster than average)",
    recommendedCourses: [
      {
        name: "Computer Science: Programming with a Purpose",
        provider: "Coursera (Princeton)",
        url: "https://www.coursera.org/learn/cs-programming-java",
      },
      {
        name: "The Complete 2023 Web Development Bootcamp",
        provider: "Udemy",
        url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
      },
    ],
    certifications: [
      "AWS Certified Developer",
      "Microsoft Certified: Azure Developer Associate",
      "Oracle Certified Professional: Java SE Programmer",
    ],
    topEmployers: ["Google", "Microsoft", "Amazon", "Apple", "Facebook"],
    skillLevel: "Entry",
    icon: "code",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Data Scientists analyze large datasets to extract meaningful insights and patterns. They use statistical methods, machine learning algorithms, and data visualization techniques to solve complex business problems. Their work involves data cleaning, model development, hypothesis testing, and communicating findings to stakeholders.",
    shortDescription: "Analyze complex datasets to drive business decisions through statistical insights.",
    requirements: {
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics", "Data Visualization", "TensorFlow/PyTorch"],
      education: "Master's degree in Statistics, Computer Science, or related field",
      experience: "1-3 years in analytics or research roles preferred",
    },
    salaryRange: {
      us: "$90,000 - $160,000",
      europe: "€60,000 - €110,000",
      asia: "$40,000 - $90,000",
    },
    jobMarketDemand: "High",
    growthRate: "31% (Much faster than average)",
    recommendedCourses: [
      {
        name: "Data Science Specialization",
        provider: "Coursera (Johns Hopkins)",
        url: "https://www.coursera.org/specializations/jhu-data-science",
      },
      {
        name: "Machine Learning",
        provider: "Coursera (Stanford)",
        url: "https://www.coursera.org/learn/machine-learning",
      },
    ],
    certifications: [
      "IBM Data Science Professional Certificate",
      "Microsoft Certified: Azure Data Scientist Associate",
      "Google Professional Data Engineer",
    ],
    topEmployers: ["Amazon", "Meta", "Netflix", "IBM", "Spotify"],
    skillLevel: "Mid-Level",
    icon: "bar-chart",
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    description: "UX Designers focus on creating intuitive, enjoyable user experiences for digital products. They conduct user research, create wireframes and prototypes, perform usability testing, and collaborate with developers to implement designs. Their goal is to ensure products meet user needs while aligning with business objectives.",
    shortDescription: "Create intuitive, enjoyable experiences for users interacting with digital products.",
    requirements: {
      skills: ["User Research", "Wireframing", "Prototyping", "Figma/Sketch", "Information Architecture", "Usability Testing"],
      education: "Bachelor's degree in Design, Psychology, or related field",
      experience: "Portfolio demonstrating UX process and thinking",
    },
    salaryRange: {
      us: "$70,000 - $130,000",
      europe: "€45,000 - €85,000",
      asia: "$25,000 - $65,000",
    },
    jobMarketDemand: "Medium",
    growthRate: "8% (As fast as average)",
    recommendedCourses: [
      {
        name: "Google UX Design Professional Certificate",
        provider: "Coursera",
        url: "https://www.coursera.org/professional-certificates/google-ux-design",
      },
      {
        name: "User Experience: Research & Prototyping",
        provider: "Interaction Design Foundation",
        url: "https://www.interaction-design.org/courses/user-experience-the-beginner-s-guide",
      },
    ],
    certifications: [
      "Nielsen Norman Group UX Certification",
      "Certified Usability Analyst (CUA)",
      "UX Management Institute Certification",
    ],
    topEmployers: ["Apple", "Google", "Microsoft", "Airbnb", "Uber"],
    skillLevel: "Entry",
    icon: "layout",
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    description: "Cybersecurity Analysts monitor and protect organizations from digital threats and security breaches. They analyze security systems, investigate incidents, implement security measures, develop security protocols, and stay informed about emerging threats. Their role is critical in safeguarding sensitive information and maintaining business continuity.",
    shortDescription: "Protect organizations from digital threats and security breaches.",
    requirements: {
      skills: ["Network Security", "Security Frameworks", "Penetration Testing", "Threat Analysis", "Security Tools", "Incident Response"],
      education: "Bachelor's degree in Cybersecurity, Computer Science, or related field",
      experience: "2-4 years in IT or security roles preferred",
    },
    salaryRange: {
      us: "$85,000 - $150,000",
      europe: "€55,000 - €95,000",
      asia: "$35,000 - $75,000",
    },
    jobMarketDemand: "High",
    growthRate: "33% (Much faster than average)",
    recommendedCourses: [
      {
        name: "Introduction to Cybersecurity",
        provider: "edX (NYU)",
        url: "https://www.edx.org/professional-certificate/uwashingtonx-essentials-cybersecurity",
      },
      {
        name: "Cyber Security Specialization",
        provider: "Coursera (University of Maryland)",
        url: "https://www.coursera.org/specializations/cyber-security",
      },
    ],
    certifications: [
      "CompTIA Security+",
      "Certified Information Systems Security Professional (CISSP)",
      "Certified Ethical Hacker (CEH)",
    ],
    topEmployers: ["IBM", "Cisco", "Microsoft", "Amazon", "Government Agencies"],
    skillLevel: "Mid-Level",
    icon: "shield",
  },
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    description: "Cloud Architects design and implement cloud computing strategies for organizations. They evaluate cloud applications, oversee cloud adoption plans, design and migrate workloads, ensure security and compliance, and manage cloud infrastructure. They play a key role in helping businesses leverage cloud technologies efficiently and securely.",
    shortDescription: "Design and oversee cloud computing strategies and infrastructure for organizations.",
    requirements: {
      skills: ["AWS/Azure/GCP", "Infrastructure as Code", "Cloud Security", "Networking", "Containerization", "Microservices"],
      education: "Bachelor's degree in Computer Science or related field",
      experience: "5+ years in IT infrastructure or related roles",
    },
    salaryRange: {
      us: "$120,000 - $200,000",
      europe: "€80,000 - €130,000",
      asia: "$50,000 - $120,000",
    },
    jobMarketDemand: "High",
    growthRate: "15% (Faster than average)",
    recommendedCourses: [
      {
        name: "AWS Certified Solutions Architect",
        provider: "AWS Training",
        url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
      },
      {
        name: "Microsoft Azure Fundamentals",
        provider: "Microsoft Learn",
        url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
      },
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Microsoft Certified: Azure Solutions Architect",
      "Google Professional Cloud Architect",
    ],
    topEmployers: ["Amazon Web Services", "Microsoft", "Google Cloud", "IBM Cloud", "Oracle Cloud"],
    skillLevel: "Senior",
    icon: "cloud",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description: "DevOps Engineers bridge the gap between software development and IT operations. They implement automation, manage CI/CD pipelines, oversee infrastructure deployment, and ensure system reliability. Their work focuses on improving collaboration, increasing deployment frequency, and maintaining service stability for better business outcomes.",
    shortDescription: "Implement automation and streamline development and operations processes.",
    requirements: {
      skills: ["CI/CD", "Docker", "Kubernetes", "Infrastructure as Code", "Cloud Platforms", "Scripting", "Linux/Unix"],
      education: "Bachelor's degree in Computer Science or related field",
      experience: "3+ years in IT, development, or operations roles",
    },
    salaryRange: {
      us: "$95,000 - $165,000",
      europe: "€65,000 - €110,000",
      asia: "$40,000 - $95,000",
    },
    jobMarketDemand: "High",
    growthRate: "22% (Much faster than average)",
    recommendedCourses: [
      {
        name: "DevOps on AWS",
        provider: "Coursera",
        url: "https://www.coursera.org/specializations/aws-fundamentals",
      },
      {
        name: "Docker and Kubernetes: The Complete Guide",
        provider: "Udemy",
        url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
      },
    ],
    certifications: [
      "AWS Certified DevOps Engineer",
      "Docker Certified Associate",
      "Certified Kubernetes Administrator (CKA)",
    ],
    topEmployers: ["Amazon", "Google", "Microsoft", "Netflix", "Atlassian"],
    skillLevel: "Mid-Level",
    icon: "git-merge",
  },
];

export default careers;
