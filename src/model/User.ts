import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isProfileComplete: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    mobileNumber: string;
    birthDate: Date;
    gender: string;
    // confirmPassword: string;
    bloodGroup: string;
    adharNumber: string;
    cast: string;
    fatherName: string;
    fatherMobileNumber: string;
    fatherOccupation: string;
    motherName: string;
    motherMobileNumber: string;
    motherOccupation: string;
    localAddress: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    prnNumber: string;
    tenthMarks: string;
    twelfthDiploma: string;
    twelfthDiplomaPercentage: string;
    admissionBasedOn: string;
    department: string;
    division: string;
    passoutYear: number;
    lgName: string;
    sem1SGPA: number;
    sem1CGPA: number;
    sem1Backlog: number;
    sem2SGPA: number;
    sem2CGPA: number;
    sem2Backlog: number;
    sem3SGPA: number;
    sem3CGPA: number;
    sem3Backlog: number;
    sem4SGPA: number;
    sem4CGPA: number;
    sem4Backlog: number;
    sem5SGPA: number;
    sem5CGPA: number;
    sem5Backlog: number;
    sem6SGPA: number;
    sem6CGPA: number;
    sem6Backlog: number;
    overallCGPA: number;
    anyLiveKTs: number;
    anyGapDuringEducation: string;
    gapReason: string;
    areaOfInterest: string;
    aboutYou: string;
    projectTitle1: string;
    projectLink1: string;
    projectDescription1: string;
    projectTitle2: string;
    projectLink2: string;
    projectDescription2: string;
    personalPortfolioLink: string;
    resumeLink: string;
    githubLink: string;
    linkedinLink: string;
    instagramLink: string;
    twitterLink: string;
    leetcodeLink: string;
    geeksForGeeksLink: string;
    codechefLink: string;
    hackerRankLink: string;
    image: string;
    skills: string[];
    role: string;
    placedCompanies: {
        company: mongoose.Schema.Types.ObjectId;
        internshipPackage?: number;
        fullTimePackage?: number;
        positionInternship?: string;
        positionFullTime?: string;
    }[];
    requestedCompanies: mongoose.Schema.Types.ObjectId[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        required: false,
    },
    verifyCodeExpiry: {
        type: Date,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
    mobileNumber: {
        type: String,
        required: false,
    },
    birthDate: {
        type: Date,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    // confirmPassword: {
    //     type: String,
    //     required: false,
    // },
    bloodGroup: {
        type: String,
        required: false,
    },
    adharNumber: {
        type: String,
        required: false,
    },
    cast: {
        type: String,
        required: false,
    },
    fatherName: {
        type: String,
        required: false,
    },
    fatherMobileNumber: {
        type: String,
        required: false,
    },
    fatherOccupation: {
        type: String,
        required: false,
    },
    motherName: {
        type: String,
        required: false,
    },
    motherMobileNumber: {
        type: String,
        required: false,
    },
    motherOccupation: {
        type: String,
        required: false,
    },
    localAddress: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    district: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    pincode: {
        type: String,
        required: false,
    },
    prnNumber: {
        type: String,
        required: false,
    },
    tenthMarks: {
        type: String,
        required: false,
    },
    twelfthDiploma: {
        type: String,
        required: false,
    },
    twelfthDiplomaPercentage: {
        type: String,
        required: false,
    },
    admissionBasedOn: {
        type: String,
        required: false,
    },
    department: {
        type: String,
        required: false,
    },
    division: {
        type: String,
        required: false,
    },
    passoutYear: {
        type: Number,
        required: false,
    },
    lgName: {
        type: String,
        required: false,
    },
    sem1SGPA: {
        type: Number,
        required: false,
    },
    sem1CGPA: {
        type: Number,
        required: false,
    },
    sem1Backlog: {
        type: Number,
        required: false,
    },
    sem2SGPA: {
        type: Number,
        required: false,
    },
    sem2CGPA: {
        type: Number,
        required: false,
    },
    sem2Backlog: {
        type: Number,
        required: false,
    },
    sem3SGPA: {
        type: Number,
        required: false,
    },
    sem3CGPA: {
        type: Number,
        required: false,
    },
    sem3Backlog: {
        type: Number,
        required: false,
    },
    sem4SGPA: {
        type: Number,
        required: false,
    },
    sem4CGPA: {
        type: Number,
        required: false,
    },
    sem4Backlog: {
        type: Number,
        required: false,
    },
    sem5SGPA: {
        type: Number,
        required: false,
    },
    sem5CGPA: {
        type: Number,
        required: false,
    },
    sem5Backlog: {
        type: Number,
        required: false,
    },
    sem6SGPA: {
        type: Number,
        required: false,
    },
    sem6CGPA: {
        type: Number,
        required: false,
    },
    sem6Backlog: {
        type: Number,
        required: false,
    },
    overallCGPA: {
        type: Number,
        required: false,
    },
    anyLiveKTs: {
        type: Number,
        required: false,
    },
    anyGapDuringEducation: {
        type: String,
        required: false,
    },
    gapReason: {
        type: String,
        required: false,
    },

    areaOfInterest: {
        type: String,
        required: false,
    },
    aboutYou: {
        type: String,
        required: false,
    },
    projectTitle1: {
        type: String,
        required: false,
    },
    projectLink1: {
        type: String,
        required: false,
    },
    projectDescription1: {
        type: String,
        required: false,
    },
    projectTitle2: {
        type: String,
        required: false,
    },
    projectLink2: {
        type: String,
        required: false,
    },
    projectDescription2: {
        type: String,
        required: false,
    },
    personalPortfolioLink: {
        type: String,
        required: false,
    },
    githubLink: {
        type: String,
        required: false,
    },
    resumeLink: {
        type: String,
        required: false,
    },
    linkedinLink: {
        type: String,
        required: false,
    },
    instagramLink: {
        type: String,
        required: false,
    },
    twitterLink: {
        type: String,
        required: false,
    },
    leetcodeLink: {
        type: String,
        required: false,
    },
    geeksForGeeksLink: {
        type: String,
        required: false,
    },
    codechefLink: {
        type: String,
        required: false,
    },
    hackerRankLink: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    image: {
        type: String,
    },
    skills: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        default: "student",
        required: true,
    },
    placedCompanies: [
        {
            company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
            internshipPackage: { type: Number, required: false },
            fullTimePackage: { type: Number, required: false },
            positionInternship: { type: String, required: false },
            positionFullTime: { type: String, required: false },
        },
    ],
    requestedCompanies: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
    ],
}, {
    timestamps: true
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;
