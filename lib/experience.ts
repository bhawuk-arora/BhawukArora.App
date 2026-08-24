export interface Job {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string;
    highlights: string[];
}

export interface Education {
    degree: string;
    field: string;
    institution: string;
    period: string;
    location: string;
    grade: string;
    description: string;
    icon: string;
}

export interface Certification {
    name: string;
    issuer: string;
    icon: string;
    color: string;
    link: string;
}

export const workExperience: Job[] = [
    {
        title: "Software Engineer - DevOps and App Modernisation",
        company: "Celebal Technologies",
        period: "Nov 2025 - Present",
        location: "Jaipur, Rajasthan, India",
        description: "Working on DevOps practices and application modernization projects, implementing cloud infrastructure and CI/CD pipelines.",
        highlights: ["DevOps Implementation", "App Modernisation", "Cloud Infrastructure", "CI/CD Pipelines"]
    }
];

export const education: Education[] = [
    {
        degree: "Bachelor of Technology - BTech",
        field: "Artificial Intelligence and Data Science",
        institution: "Poornima College of Engineering",
        period: "November 2022 - May 2026 (Expected)",
        location: "Jaipur, Rajasthan, India",
        grade: "CGPA: 9.08",
        // COMMENTED OUT: Description removed per request
        // description: "Building a rigorous foundation in Machine Learning and Systems Engineering, with a specialized focus on the architectures that power modern AI at scale.",
        description: "",
        icon: "college"
    }
];

export const certifications: Certification[] = [
    {
        name: "Microsoft Certified: Azure Developer Associate",
        issuer: "Microsoft",
        icon: "azure",
        color: "blue",
        link: ""
    },
    {
        name: "Microsoft Certified: Azure Administrator Associate",
        issuer: "Microsoft",
        icon: "azure",
        color: "blue",
        link: ""
    },
    {
        name: "Microsoft Certified: Fabric Data Engineer Associate",
        issuer: "Microsoft",
        icon: "azure",
        color: "blue",
        link: ""
    },
    {
        name: "Microsoft Certified: Azure AI Engineer Associate",
        issuer: "Microsoft",
        icon: "azure",
        color: "blue",
        link: ""
    },
    {
        name: "Oracle Cloud Infrastructure Certified DevOps Professional",
        issuer: "Oracle",
        icon: "oracle",
        color: "red",
        link: ""
    },
    {
        name: "Oracle Cloud Infrastructure Certified Architect Associate",
        issuer: "Oracle",
        icon: "oracle",
        color: "red",
        link: ""
    },
    {
        name: "Databricks Certified Machine Learning Associate",
        issuer: "Databricks",
        icon: "databricks",
        color: "red",
        link: ""
    }
];
