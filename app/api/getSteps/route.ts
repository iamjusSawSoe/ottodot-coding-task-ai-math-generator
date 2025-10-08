import { NextResponse } from "next/server";
import { geminiModel } from "../../../lib/gemini";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { problemId } = await request.json();

    if (!problemId) {
      return NextResponse.json(
        { error: "Problem ID is required" },
        { status: 400 }
      );
    }

    const { data: problem, error: fetchError } = await supabase
      .from("math_problem_sessions")
      .select(
        "problem_text, correct_answer, problem_type, difficulty_level, step_by_step_solution"
      )
      .eq("id", problemId)
      .single();

    if (fetchError || !problem) {
      throw new Error("Problem not found");
    }

    if (problem.step_by_step_solution) {
      return NextResponse.json({ steps: problem.step_by_step_solution });
    }

    const stepsPrompt = `
You are a helpful math tutor for Primary 5 students. Create a detailed step-by-step solution for this problem.

Problem: ${problem.problem_text}
Correct Answer: ${problem.correct_answer}
Problem Type: ${problem.problem_type}
Difficulty: ${problem.difficulty_level}

Generate a clear, detailed step-by-step solution that:
1. Breaks down the problem into logical steps
2. Explains WHY each step is needed
3. Shows the calculation for each step
4. Uses simple, age-appropriate language for Primary 5 students
5. Includes 3-5 steps (depending on problem complexity)

Each step should have:
- A title (brief description of what this step does)
- An explanation (why we do this step)
- The calculation or action taken
- The result of this step

Return only JSON (no markdown, no code fences) in this format:
{
  "steps": [
    {
      "step_number": 1,
      "title": "Identify what we need to find",
      "explanation": "We need to figure out...",
      "calculation": "No calculation needed for this step",
      "result": "We need to find the total cost"
    },
    {
      "step_number": 2,
      "title": "Calculate...",
      "explanation": "Because we have..., we need to...",
      "calculation": "5 × 3 = 15",
      "result": "15 items total"
    }
  ],
  "final_answer": ${problem.correct_answer}
}

Make it educational and easy to understand for a 10-11 year old student.
`;

    const result = await geminiModel.generateContent(stepsPrompt);
    const response = await result.response;

    let raw = response.text();
    raw = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let solutionData;
    try {
      solutionData = JSON.parse(raw);
    } catch {
      throw new Error("Invalid JSON from Gemini: " + raw);
    }

    const { error: updateError } = await supabase
      .from("math_problem_sessions")
      .update({ step_by_step_solution: solutionData.steps })
      .eq("id", problemId);

    if (updateError) {
      console.error("Failed to save steps:", updateError);
    }

    return NextResponse.json({
      steps: solutionData.steps,
      final_answer: solutionData.final_answer,
    });
  } catch (err: any) {
    console.error("Get steps error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
