import { NextResponse } from "next/server";
import { getGitHubContributions } from "@/features/projects/services/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getGitHubContributions("Saswat0602");

    if (!data) {
      return NextResponse.json(
        { error: "Could not retrieve contribution telemetry" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
