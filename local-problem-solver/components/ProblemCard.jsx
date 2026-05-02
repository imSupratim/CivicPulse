"use client";

import Link from "next/link";

export default function ProblemCard({ problem }) {
  const formattedDate = problem.updatedAt
    ? new Date(problem.updatedAt).toLocaleString()
    : "";

  return (
    <Link href={`/specific_problem_page/${problem._id}`} className="block">
      <div className="relative bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-200 flex flex-col justify-between">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-1 line-clamp-1">
          {problem.title}
        </h2>

        {problem.imageURL && (
          <img
            src={problem.imageURL}
            alt="problem"
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
        )}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {problem.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs mb-3">
          {problem.category && (
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {problem.category}
            </span>
          )}

          {problem.urgency && (
            <span
              className={`px-2 py-1 rounded-full ${
                problem.urgency === "high"
                  ? "bg-red-100 text-red-600"
                  : problem.urgency === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-600"
              }`}
            >
              {problem.urgency}
            </span>
          )}

          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {problem.status}
          </span>
        </div>

        {/* AI Summary */}
        {problem.summary && (
          <p className="text-sm text-gray-500 mb-3 italic">
            🤖 {problem.summary}
          </p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t text-xs text-gray-500">
          {/* Address */}
          {problem.location?.address && (
            <span className="truncate max-w-[60%]">
              📍 {problem.location.address}
            </span>
          )}

          {/* Score */}
          {problem.severityScore && (
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              ⚠️ {problem.severityScore}
            </span>
          )}
        </div>

        {/* Map Link */}
        {problem.mapLink && (
          <a
            href={problem.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-blue-600 text-sm font-medium hover:underline"
          >
            📍 Open in Google Maps
          </a>
        )}

        <div className="text-sm text-gray-600">
          {/* {problem.clerkId} */}
          Posted by: {problem.userName}
        </div>

        <div className="text-xs text-gray-400 mt-2">
          🕒 Updated: {formattedDate}
        </div>
      </div>
    </Link>
  );
}
