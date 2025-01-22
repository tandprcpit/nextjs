

export type Option = {
    value: string;
    label: string;
};

export const castOptions: string[] = [
    "OBC", 
    "SC", 
    "ST", 
    "General", 
    "EBC", 
    "NT", 
    "VJ", 
    "MBC", 
    "Other", 
];


export const departmentOptions: string[] = [
    "Computer",
    "Data Science",
    "AIML",
    "E&TC",
    "Mechanical",
    "Civil",
    "Electrical",
    "AIDS",
    "IT"
];

export const liveKTOptions: Option[] = [
    { value: '0', label: 'No Any live ATKT' },
    { value: '1', label: 'One live ATKT' },
    { value: '2', label: 'Two live ATKT' },
    { value: '3', label: 'Three live ATKT' },
    { value: '4', label: 'Four live ATKT' },
    { value: '5', label: 'Five or more than five live ATKT' },
];

export const divisionOptions: string[] = ["A", "B", "C"];

export const twelfthDiplomaOptions: string[] = [
    "12th",
    "Diploma"
];

export const occupationOptions: string[] = [
    "Private Service",
    "Business/Entrepreneur",
    "Agriculture/Farming",
    "Doctor",
    "Engineer",
    "Lawyer",
    "Retired",
    "Government Service",
    "Self-Employed",
    "Freelancer",
    "Teacher/Educator",
    "Housewife",
    "Laborer/Skilled Worker",
    "Student",
    "Scientist/Researcher",
    "Artist/Performer",
    "Shopkeeper/Trader",
    "Healthcare Worker (Nurse, Pharmacist, etc.)",
    "Security Services",
    "Driver/Chauffeur",
    "Construction Worker",
    "IT Professional/Software Engineer",
    "Journalist/Media",
    "Banking/Finance",
    "Real Estate",
    "Architect",
    "Fashion Designer",
    "Government Contractor",
    "NGO Worker",
    "Mechanic",
    "Chef/Caterer",
    "Sportsperson",
    "Civil Services (IAS, IPS, etc.)",
    "Clerical/Administrative",
    "Others",
];


export const genderOptions: Option[] = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
];

export const bloodGroupOptions: Option[] = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
];

export const areaOfInterestOptions: Option[] = [
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Full Stack Developer', label: 'Full Stack Developer' },
    { value: 'Mobile App Developer', label: 'Mobile App Developer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Web Developer', label: 'Web Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'QA Engineer (Quality Assurance)', label: 'QA Engineer (Quality Assurance)' },
    { value: 'DevOps Engineer', label: 'DevOps Engineer' },
    { value: 'Game Developer', label: 'Game Developer' },
    { value: 'Cybersecurity Engineer', label: 'Cybersecurity Engineer' },
    { value: 'Cloud Developer', label: 'Cloud Developer' },
    { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer' },
    { value: 'API Developer', label: 'API Developer' },
];

export const admissionBasedOnOptions: string[] = [
    "TFWS",
    "MHT CET",
    "JEE Main",
    "Management",
    "Diploma"
];

export const semBacklog: Option[] = [
    { value: '0', label: 'No Backlog' },
    { value: '1', label: 'One Backlog' },
    { value: '2', label: 'Two Backlog' },
    { value: '3', label: 'Three Backlog' },
    { value: '4', label: 'Four Backlog' },
    { value: '5', label: 'Five or more than five Backlog' },
];

export const gapOptions: string[] = ['Yes', 'No'];
