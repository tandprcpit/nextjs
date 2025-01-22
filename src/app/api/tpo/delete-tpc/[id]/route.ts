import dbConnect from "@/lib/dbConnect";
import TPCModel from "@/model/Tpc";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const token = await getToken({ req: request });
    if (!token || !token._id) {
      return NextResponse.json(
        { success: false, message: "TPO is not logged in, please login first" },
        { status: 401 }
      );
    }

    const { id } = params;  

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid TPC ID" },
        { status: 400 }
      );
    }

    const tpc = await TPCModel.findById(id);
    if (!tpc) {
      return NextResponse.json(
        { success: false, message: "TPC not found" },
        { status: 404 }
      );
    }

    if (tpc.createdBy.toString() !== token._id) {
      return NextResponse.json(
        { success: false, message: "You do not have permission to delete this TPC" },
        { status: 403 }
      );
    }

    await TPCModel.deleteOne({ _id: id });

    return NextResponse.json({
      success: true,
      message: "TPC deleted successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Error deleting TPC:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting TPC" },
      { status: 500 }
    );
  }
}
