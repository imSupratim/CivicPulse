import React from "react";
import { ConnectDB } from "../../../../../lib/ConnectDB.js";
import Problem from "../../../../../lib/models/Problem";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const page = async (props) => {
  const Params = await props.params;
  const problemId = Params.id;
  const {userId} = await auth();



  await ConnectDB();

  const problem = await Problem.findById(problemId).lean();


  if (!problem) {
    return <div className="mt-20 text-center">Problem not found</div>;
  }

  if(problem.clerkId != userId){
    return <div className="min-h-screen min-w-screen flex justify-center items-center text-red-600 text-3xl">You are not the author of this article you cannot change it !!</div>
  }

  // ✅ server action
  async function updateProblem(formData) {
    "use server";

    await ConnectDB();

    const updatedData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      urgency: formData.get("urgency"),
      status: formData.get("status"),
    };

    await Problem.findByIdAndUpdate(problemId, updatedData);

    redirect(`/specific_problem_page/${problemId}`);
  }

  return (
    <div className="w-5/6 text-black mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Edit Problem</h1>

      {/* ✅ No useState, no useEffect */}
      <form action={updateProblem} className="flex flex-col gap-3">
        <input
          name="title"
          defaultValue={problem.title}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          defaultValue={problem.description}
          className="border p-2 rounded"
        />

        <input
          name="category"
          defaultValue={problem.category}
          className="border p-2 rounded"
        />

        <input
          name="mapLink"
          defaultValue={problem.mapLink}
          className="border p-2 rounded"
        />

        <select
          name="urgency"
          defaultValue={problem.urgency}
          className="border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="status"
          defaultValue={problem.status}
          className="border p-2 rounded"
        >
          <option value="open">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <div className="flex justify-center items-center">
          <button className="bg-gradient-to-b from-gray-300 font-bold to-gray-400 shadow-2xl text-black py-2 px-3  rounded cursor-pointer transition-transform duration-200 ease-in-out  hover:scale-105 ">
            Update Problem
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
