import { ConnectDB } from "@/lib/ConnectDB";
import Problem from "@/lib/models/Problem";
import { auth } from "@clerk/nextjs/server";

export async function GET(req, context) {
    const { id } = await context.params;

  return Response.json({
    message: "Route works",
    id,
  });
}

export async function DELETE(req, context) {
    const { id } = await context.params;

  await ConnectDB();

  const { userId } = await auth();

  const problem = await Problem.findById(id);

  if (!problem) {
    return Response.json(
      { message: "Problem not found" },
      { status: 404 }
    );
  }

  
  if (problem.clerkId !== userId) {
    return Response.json(
      { message: "Unauthorized" },
      { status: 403 }
    );
  }

  await Problem.findByIdAndDelete(id);

  return Response.json({
    success: true,
    message: "Problem deleted",
  });
}