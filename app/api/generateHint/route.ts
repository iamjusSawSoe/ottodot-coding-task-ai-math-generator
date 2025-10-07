import { NextResponse } from "next/server";
import { geminiModel } from "../../../lib/gemini";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Fetch the problem from database
    const { data: session, error: fetchError } = await supabase
      .from("math_problem_sessions")
      .select("problem_text, correct_answer, difficulty_level")
      .eq("id", sessionId)
      .single();

    if (fetchError || !session) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    // Generate hint using Gemini
    const prompt = `You are a helpful math tutor for Primary 5 students. A student is working on this problem:

"${session.problem_text}"

The correct answer is ${session.correct_answer}.

Please provide a helpful hint that guides the student toward the solution WITHOUT giving away the answer directly. Your hint should:
1. Break down the problem into smaller steps
2. Remind them of relevant math concepts or formulas
3. Give them a starting point or strategy
4. Be encouraging and supportive

Keep the hint concise (2-3 sentences) and educational.

Return only the hint text (no JSON, no formatting, just plain text).`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const hintText = response.text().trim();

    return NextResponse.json({
      hint: hintText,
      sessionId,
    });
  } catch (err: any) {
    console.error("Generate hint error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate hint" },
      { status: 500 }
    );
  }
}
