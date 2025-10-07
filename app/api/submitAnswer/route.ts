import { NextResponse } from "next/server";
import { geminiModel } from "../../../lib/gemini";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { sessionId, userAnswer } = await req.json();

    // 1. Fetch session (problem + correct answer)
    const { data: session, error: sessionError } = await supabase
      .from("math_problem_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (sessionError) throw sessionError;
    if (!session) throw new Error("Session not found");

    const isCorrect = Number(userAnswer) === session.correct_answer;

    // 2. Generate feedback with Gemini
    const feedbackPrompt = `
    The student was asked: "${session.problem_text}".
    Correct answer: ${session.correct_answer}.
    Student answered: ${userAnswer}.
    Give short, encouraging feedback in plain English (max 3 sentences).
    `;
    const result = await geminiModel.generateContent(feedbackPrompt);
    const response = await result.response;
    let feedback = response.text().trim();

    // 3. Save submission
    const { data, error } = await supabase
      .from("math_problem_submissions")
      .insert([
        {
          session_id: sessionId,
          user_answer: Number(userAnswer),
          is_correct: isCorrect,
          feedback_text: feedback,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ submission: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
