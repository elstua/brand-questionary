import { NextRequest, NextResponse } from "next/server";
import { saveSubmission, getSubmissions } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.answers || !Array.isArray(body.answers)) {
      return NextResponse.json(
        { error: "Invalid format: answers should be an array" },
        { status: 400 }
      );
    }

    const saved = await saveSubmission(body.answers);

    return NextResponse.json({
      success: true,
      id: saved.id,
      message: "Answers saved",
    });
  } catch (error) {
    console.error("Error saving answers:", error);
    return NextResponse.json(
      { error: "Failed to process answers" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
