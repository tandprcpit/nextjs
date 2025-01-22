import mongoose, { Schema, Document, Model } from "mongoose";

export interface TPO extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

const TPOSchema: Schema<TPO> = new Schema(
    {
        name: {
            type: String,
            required: [true, "TPO name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "TPO email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            default: "tpo",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);


const TPOModel: Model<TPO> =
    mongoose.models.TPO || mongoose.model<TPO>("TPO", TPOSchema);

export default TPOModel;
