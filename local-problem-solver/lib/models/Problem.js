import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: {
      address: String,
    },
    category: String,
    urgency: String,
    clerkId: String,
    userName: String,
    status: {
      type: String,
      default: "pending",
    },
    summary: String,
    severityScore: Number,
    mapLink: String,
    imageURL: String,
  },
  { timestamps: true }
);

export default mongoose.models.Problem ||
  mongoose.model("Problem", problemSchema);