export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { ConnectDB } from "@/lib/ConnectDB";
import Problem from "@/lib/models/Problem";
import ProblemCard from "@/components/ProblemCard";

export default async function MyPostsPage() {

  const { userId } = await auth();

  console.log(userId);

  if (!userId) {
    return (
      <div className="p-6 text-center text-red-500">
        Please login to view your posts
      </div>
    );
  }

  await ConnectDB();

  const problems = await Problem.find({ clerkId: userId })
    .sort({ createdAt: -1 })
    .lean();

  const formatted = problems.map((p) => ({
    ...p,
    _id: p._id.toString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

  return (
    <div className="mt-14 p-5 min-w-screen mx-auto">
      <h1 className="text-2xl font-bold mb-6">👤 My Posts</h1>

      {formatted.length === 0 ? (
        <p className="text-gray-500">You haven’t posted anything yet.</p>
      ) : (
        <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {formatted.map((problem) => (
            <ProblemCard key={problem._id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
}