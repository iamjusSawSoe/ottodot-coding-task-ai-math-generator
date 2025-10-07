import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
  try {
    // Fetch all problem sessions with their submissions
    const { data: sessions, error: sessionsError } = await supabase
      .from("math_problem_sessions")
      .select(
        `
        id,
        problem_text,
        correct_answer,
        difficulty_level,
        created_at,
        math_problem_submissions (
          id,
          user_answer,
          is_correct,
          feedback_text,
          submitted_at
        )
      `
      )
      .order("created_at", { ascending: false })
      .limit(50); // Limit to last 50 problems

    if (sessionsError) throw sessionsError;

    // Format the data
    const formattedHistory =
      sessions?.map((session) => ({
        id: session.id,
        problem_text: session.problem_text,
        correct_answer: session.correct_answer,
        difficulty_level: session.difficulty_level,
        created_at: session.created_at,
        submissions: session.math_problem_submissions || [],
      })) || [];

    return NextResponse.json({ history: formattedHistory });
  } catch (err: any) {
    console.error("Problem history error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch problem history" },
      { status: 500 }
    );
  }
}
