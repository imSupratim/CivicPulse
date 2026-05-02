import React from "react";
import { ConnectDB } from "../../../../lib/ConnectDB.js";
import Problem from "../../../../lib/models/Problem.js";
import Link from "next/link.js";
import { auth } from "@clerk/nextjs/server";

const page = async (props) => {
  const Params = await props.params;
  const problemId = Params.id;
  // console.log(id);

  const { userId } = await auth();
  // console.log(userId);

  await ConnectDB();

  const problem = await Problem.findById(problemId).lean();

  if (!problem) {
    return <div className="mt-20 text-center">Problem not found</div>;
  }

  let isAuthor = false;
  isAuthor = problem.clerkId === userId;
  console.log(isAuthor);

  return (
    <div className="w-2/3 mx-auto mt-20 p-6  bg-white shadow-lg rounded-xl">
      {/* Title */}
      <h1 className="text-2xl text-black font-bold mb-3">{problem.title}</h1>

      {problem.imageURL && (
        <a href={problem.imageURL} target="_blank">
          <img
          src={problem.imageURL}
          alt="problem"
          className="w-full h-100 object-cover rounded-xl mb-3"
        />
        </a>
      )}

      {/* Description */}
      <p className="text-gray-700 mb-4">{problem.description}</p>

      {/* Category & Urgency */}
      <div className="flex gap-2 mb-4">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
          {problem.category}
        </span>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            problem.urgency === "high"
              ? "bg-red-100 text-red-600"
              : problem.urgency === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-600"
          }`}
        >
          {problem.urgency}
        </span>

        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
          {problem.status}
        </span>
      </div>

      {/* AI Summary */}
      {problem.summary && (
        <p className="italic text-gray-500 mb-4">🤖 {problem.summary}</p>
      )}

      {/* Location */}
      {problem.location?.address && (
        <p className="mb-2 text-black">📍 {problem.location.address}</p>
      )}

      {/* Severity */}
      {problem.severityScore && (
        <p className="text-black mb-2">⚠️ Severity: {problem.severityScore}</p>
      )}

      {/* Map */}
      {problem.mapLink && (
        <a
          href={problem.mapLink}
          target="_blank"
          className="text-blue-600 underline block mb-4"
        >
          Open in Google Maps
        </a>
      )}

      {/* User */}
      <p className="text-sm text-gray-600">Posted by: {problem.userName}</p>

      {/* Dates */}
      <p className="text-xs text-gray-400 mt-2">
        Created: {new Date(problem.createdAt).toLocaleString()}
      </p>

      <p className="text-xs text-gray-400">
        Updated: {new Date(problem.updatedAt).toLocaleString()}
      </p>

      <div className="p-5">
        {isAuthor && (
          <Link
            href={`/problems/${problem._id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            ✏️ Edit
          </Link>
        )}
      </div>
    </div>
  );
};

export default page;
