import mongoose, { Schema, Document } from "mongoose";

export interface Company extends Document {
  name: string;
  description: string;
  salary: string;
  bond: string;
  location: string;
  criteria: {
    overallCGPA: number;
    gender: string[];
    passoutYear: number;
    anyLiveKTs: string;
    anyGapDuringEducation: string[];
    department: string[];
    tenthMarks: number;
    twelfthPercentage: number;
    diplomaPercentage: number;
    skills: string[];
  };
  rounds: {
    roundNumber: number;
    roundName: string;
    selectedStudents: mongoose.Types.ObjectId[];
  }[];
  placedStudents: {
    student: mongoose.Schema.Types.ObjectId; 
    internshipPackage?: number;
    fullTimePackage?: number;
    positionInternship?: string;
    positionFullTime?: string;
  }[];
  willingnessRequests: {
    students: mongoose.Types.ObjectId[];
    deadline: Date;
  };
  notWillingStudents: {
    student: mongoose.Schema.Types.ObjectId;
    reason: string;
  }[];
  createdBy: mongoose.Types.ObjectId;
}

const CompanySchema: Schema<Company> = new Schema(
  {
    name: { type: String, required: [true, "Company name is required"] },
    description: { type: String },
    salary: { type: String },
    bond: { type: String },
    location: { type: String },
    criteria: {
      overallCGPA: { type: Number },
      gender: { type: [String] },
      passoutYear: { type: Number },
      anyLiveKTs: { type: String },
      anyGapDuringEducation: { type: [String] },
      department: { type: [String] },
      tenthMarks: { type: Number },
      twelfthPercentage: { type: Number },
      diplomaPercentage: { type: Number },
      skills: { type: [String] },
    },
    rounds: [
      {
        roundNumber: { type: Number, required: true },
        roundName: { type: String, required: true },
        selectedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      },
    ],
    placedStudents: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        internshipPackage: { type: Number, required: false },
        fullTimePackage: { type: Number, required: false },
        positionInternship: { type: String, required: false },
        positionFullTime: { type: String, required: false },
      },
    ],
    willingnessRequests: {
      students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      deadline: { type: Date},
    },
    notWillingStudents: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: { type: String, required: true },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TPC", 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const CompanyModel = mongoose.models.Company || mongoose.model<Company>("Company", CompanySchema);

export default CompanyModel;

