//server side rendered compononent
export const dynamic = "force-dynamic";

import ProblemCard from "../../../components/ProblemCard.jsx";
import { ConnectDB } from "../../../lib/ConnectDB.js";
import Problem from "../../../lib/models/Problem.js";

const dashboard = async () => {
  await ConnectDB();
  const problems = await Problem.find().sort({ updatedAt: -1 }).lean();
  console.log(problems);
  const formatted = problems.map((p) => ({
    ...p,
    _id: p._id.toString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));
  return (
    <div className="p-6 mt-14  min-w-screen mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex gap-1 items-center ">
        <img
          src="https://images.vexels.com/media/users/3/205965/isolated/preview/746864a197dde979ee1a73548317f1f0-clipboard-paper-stroke-icon.png"
          alt="clipboard"
          className="size-8"
        />{" "}
        <span>All Reported Problems</span>
      </h1>

      {problems.length === 0 ? (
        <p>No problems found</p>
      ) : (
        <div className="md:px-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {problems.map((problem) => (
            <ProblemCard key={problem._id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default dashboard;
