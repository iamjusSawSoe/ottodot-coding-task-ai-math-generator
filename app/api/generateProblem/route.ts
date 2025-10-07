import { NextResponse } from "next/server";
import { geminiModel } from "../../../lib/gemini";
import { supabase } from "../../../lib/supabaseClient";

const problemTypes = ["Addition", "Subtraction", "Multiplication", "Division"];

const generatePrompt = (difficulty: string, type: string) => {
  const difficultySpecs = {
    Easy: {
      Addition: "numbers up to 100, 2-3 numbers",
      Subtraction: "numbers up to 100, simple subtraction",
      Multiplication: "single digit × single/double digit",
      Division: "simple division with no remainders, numbers up to 50",
    },
    Medium: {
      Addition: "numbers up to 1000, 3-4 numbers or multi-step",
      Subtraction: "numbers up to 1000, multi-step problems",
      Multiplication: "double digit × double digit, up to 1000",
      Division: "division with remainders, numbers up to 500",
    },
    Hard: {
      Addition: "large numbers (1000+), complex multi-step",
      Subtraction: "large numbers (1000+), complex multi-step",
      Multiplication: "large numbers, 3-digit multiplication",
      Division: "complex division, decimals, multi-step",
    },
  };

  const spec = difficultySpecs[difficulty][type];

  return `
Generate ONE math word problem for a Primary 5 student at ${difficulty.toUpperCase()} difficulty.

The problem MUST focus on ${type} with these specifications:
${spec}

Create a real-world scenario (buying items, sharing things, measuring, etc.) that requires ${type.toLowerCase()}.

Return only JSON (no markdown, no code fences) in this format:
{
  "problem_text": "string",
  "final_answer": number
}

Make sure the problem is engaging and age-appropriate for Primary 5 students.
`;
};

export async function POST(request: Request) {
  try {
    let { difficulty, type } = await request.json();

    // Validate difficulty
    if (!difficulty || !["Easy", "Medium", "Hard"].includes(difficulty)) {
      return NextResponse.json(
        { error: "Invalid difficulty level" },
        { status: 400 }
      );
    }

    // Handle "Random" type logic
    if (type === "Random") {
      const randomIndex = Math.floor(Math.random() * problemTypes.length);
      type = problemTypes[randomIndex];
      console.log("Randomly selected problem type:", type);
    }

    // Validate problem type again
    if (!problemTypes.includes(type)) {
      return NextResponse.json(
        { error: "Invalid problem type" },
        { status: 400 }
      );
    }

    // Generate prompt based on difficulty and type
    const prompt = generatePrompt(difficulty, type);
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;

    let raw = response.text();

    // Clean JSON (remove code fences if Gemini adds them)
    raw = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let problem;
    try {
      problem = JSON.parse(raw);
    } catch {
      throw new Error("Invalid JSON from Gemini: " + raw);
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from("math_problem_sessions")
      .insert([
        {
          problem_text: problem.problem_text,
          correct_answer: problem.final_answer,
          difficulty_level: difficulty,
          problem_type: type,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ session: data });
  } catch (err: any) {
    console.error("Generate problem error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
