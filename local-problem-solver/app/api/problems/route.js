import { categorizeProblem } from "../../../lib/ai.js";
import { ConnectDB } from "../../../lib/ConnectDB.js";
import Problem from "@/lib/models/Problem";

export async function POST(req) {
  await ConnectDB();

  try {
    const body = await req.json();

    const aiData = await categorizeProblem(body.description);

    console.log("AI DATA:", aiData); 

    const problem = await Problem.create({
       ...body,          
       ...aiData,
    });

    console.log(problem);

    return Response.json(problem);
  } catch (error) {
    return new Response("Error creating problem", { status: 500 });
  }
}

