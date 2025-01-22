import mongoose, { Schema, Document,Model } from "mongoose";

// Define the TPC interface
export interface TPC extends Document {
    name: string;
    email: string;
    password: string;
    createdBy: mongoose.Types.ObjectId; 
    role: string; 
}

const TPCSchema: Schema<TPC> = new Schema({
    name: {
        type: String,
        required: [true, "TPC name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "TPC email is required"],
        unique: true,
       
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TPO",
        required: true,
    },
    role: {
        type: String,
        default: "tpc", 
       
        required: true,
    },
}, {
    timestamps: true, 
});


const TPCModel:Model<TPC> =
 mongoose.models.TPC || mongoose.model<TPC>("TPC", TPCSchema);

export default TPCModel;

