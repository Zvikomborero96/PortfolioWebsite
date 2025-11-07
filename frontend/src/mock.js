// Mock data for Ashley Z Hove Portfolio

export const personalInfo = {
  name: "Ashley Z Hove",
  title: "System Administrator & Web Developer",
  email: "AshleyZH96@outlook.com",
  phone: "0638928074",
  github: "https://github.com/Zvikomborero96",
  linkedin: "https://www.linkedin.com/in/ashley-z-hove-691701376",
  location: "South Africa",
  tagline: "Building robust systems and elegant web solutions",
  bio: "Passionate System Administrator and Web Developer with expertise in both infrastructure management and full-stack development. I believe in mastering fundamentals before diving into complex abstractions – from SQL before ORM, to Linux before Docker. With a strong foundation in networking, system administration, and modern web technologies, I deliver scalable, maintainable solutions."
};

export const skills = {
  frontend: [
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 88 },
    { name: "JavaScript", level: 92 },
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Redux", level: 82 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Bootstrap", level: 85 }
  ],
  backend: [
    { name: "Python", level: 88 },
    { name: "Django", level: 85 },
    { name: "FastAPI", level: 90 },
    { name: "Java", level: 80 },
    { name: "Spring Boot", level: 78 },
    { name: "MySQL", level: 92 },
    { name: "PostgreSQL", level: 88 },
    { name: "REST APIs", level: 90 }
  ],
  systemAdmin: [
    { name: "Linux", level: 92 },
    { name: "Windows Server", level: 88 },
    { name: "Networking", level: 90 },
    { name: "CCTV Systems", level: 85 },
    { name: "Office 365", level: 88 },
    { name: "Remote Support", level: 92 },
    { name: "Troubleshooting", level: 95 },
    { name: "Server Maintenance", level: 90 }
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 82 },
    { name: "Wireshark", level: 85 },
    { name: "tcpdump", level: 80 },
    { name: "Agile", level: 88 },
    { name: "Microservices", level: 80 }
  ]
};

export const experience = [
  {
    id: 1,
    company: "UNICA PLASTIC MOULDERS (PTY) LTD",
    position: "System Administrator / Web Developer",
    duration: "March 2024 - Present",
    location: "South Africa",
    responsibilities: [
      "Managed hardware inventory for all physical assets within data center",
      "Upgraded hardware components to enhance system efficiency",
      "Troubleshot network connectivity issues in LAN and WAN using Wireshark and tcpdump",
      "Monitored system performance to detect potential issues and implement solutions",
      "Delivered technical support to end users for IT-related inquiries and issues",
      "Coordinated administrative tasks and data capturing operations"
    ],
    technologies: ["Linux", "Networking", "Wireshark", "Hardware Management", "Technical Support"]
  },
  {
    id: 2,
    company: "UNICA IRON & STEEL (PTY) LTD",
    position: "Junior System Administrator / Web Developer",
    duration: "March 2022 - September 2023",
    location: "South Africa",
    responsibilities: [
      "Maintained detailed documentation of systems, configurations, and procedures",
      "Delivered local and remote Tier 1 IT support for hardware and software",
      "Installed, configured, and provided ongoing support for CCTV & Security Systems",
      "Performed server maintenance, backup, and management",
      "Developed an IT software Ticketing System for improved issue tracking"
    ],
    technologies: ["Windows Server", "CCTV Systems", "Remote Support", "Ticketing Systems", "Server Management"]
  }
];

export const projects = [
  {
    id: 1,
    title: "E-commerce Database Architecture",
    description: "Designed and implemented a fully normalized MySQL database system for an e-commerce platform. Structured modular SQL files for schema creation, sample data, stored procedures, triggers, and views.",
    longDescription: "A comprehensive database solution showcasing expertise in data modeling and relational integrity. The project includes automated setup via Bash scripting for streamlined deployment and demonstrates scalable backend design principles.",
    technologies: ["MySQL", "SQL", "Bash", "Database Design", "Stored Procedures"],
    features: [
      "Fully normalized database schema",
      "Modular SQL architecture",
      "Automated deployment scripts",
      "Triggers and stored procedures",
      "Scalable design patterns"
    ],
    category: "Backend"
  },
  {
    id: 2,
    title: "Real-time Chat Application",
    description: "Modern chat application with user authentication, multiple chat rooms, and live messaging capabilities. Features real-time updates and seamless user experience.",
    longDescription: "A full-stack real-time messaging platform built with modern web technologies. Includes user authentication, multiple chat rooms, online status indicators, and instant message delivery.",
    technologies: ["React", "WebSocket", "Node.js", "MongoDB", "JWT"],
    features: [
      "User authentication and authorization",
      "Multiple chat rooms",
      "Real-time message updates",
      "Online status indicators",
      "Message history and persistence"
    ],
    category: "Full-Stack"
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Data visualization dashboard with interactive charts and real-time data updates. Provides comprehensive insights through intuitive visual representations.",
    longDescription: "An advanced analytics platform featuring interactive data visualizations, customizable widgets, and real-time data processing. Built to handle large datasets efficiently.",
    technologies: ["React", "D3.js", "FastAPI", "PostgreSQL", "Redux"],
    features: [
      "Interactive data visualizations",
      "Real-time data updates",
      "Customizable dashboard widgets",
      "Export functionality",
      "Responsive design"
    ],
    category: "Full-Stack"
  },
  {
    id: 4,
    title: "Task Management Application",
    description: "Collaborative task management system with real-time updates. Enables teams to organize, track, and complete tasks efficiently.",
    longDescription: "A comprehensive project management tool featuring task assignment, progress tracking, team collaboration, and deadline management. Designed for seamless team productivity.",
    technologies: ["React", "Django", "PostgreSQL", "REST API", "WebSocket"],
    features: [
      "Task creation and assignment",
      "Real-time collaboration",
      "Progress tracking",
      "Deadline management",
      "Team notifications"
    ],
    category: "Full-Stack"
  },
  {
    id: 5,
    title: "IT Ticketing System",
    description: "Custom-built IT support ticketing system for tracking and resolving technical issues. Streamlines support workflows and improves response times.",
    longDescription: "A professional IT service management solution with ticket creation, assignment, tracking, and resolution workflows. Includes priority management and SLA tracking.",
    technologies: ["Python", "Django", "MySQL", "Bootstrap", "JavaScript"],
    features: [
      "Ticket creation and tracking",
      "Priority and status management",
      "Assignment workflows",
      "SLA monitoring",
      "Reporting and analytics"
    ],
    category: "Full-Stack"
  }
];

export const education = {
  institution: "Boston City Campus",
  degree: "Diploma in Systems Development NQL 6",
  year: "2021",
  courses: [
    "Systems Development",
    "Technical Systems Support",
    "Database Programming",
    "IT Systems Management",
    "System Analysis & Design",
    "Project Management",
    "Software Testing",
    "Workflow Management"
  ]
};

export const philosophy = [
  {
    principle: "Fundamentals First",
    description: "Master SQL before ORM, CSS before Tailwind, Linux before Docker. Strong foundations lead to better solutions."
  },
  {
    principle: "Continuous Learning",
    description: "Technology evolves rapidly. I stay current with industry trends while maintaining deep expertise in core concepts."
  },
  {
    principle: "Practical Solutions",
    description: "Every project is an opportunity to solve real problems with elegant, maintainable code and reliable infrastructure."
  },
  {
    principle: "Quality & Performance",
    description: "From database optimization to system monitoring, I prioritize performance and reliability in everything I build."
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Technical Manager",
    company: "Unica Plastic Moulders",
    text: "Ashley's technical expertise and problem-solving skills have been invaluable to our operations. His ability to quickly diagnose and resolve complex network issues has minimized downtime significantly.",
    role: "Manager"
  },
  {
    id: 2,
    name: "IT Team Lead",
    company: "Unica Iron & Steel",
    text: "A dedicated professional who brings both system administration expertise and development skills to the table. The ticketing system Ashley developed has greatly improved our support efficiency.",
    role: "Team Lead"
  }
];