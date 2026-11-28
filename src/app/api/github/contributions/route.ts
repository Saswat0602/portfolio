import { NextResponse } from "next/server";
import { getGitHubContributions } from "@/features/projects/services/github";

// Force dynamic serverless execution so Vercel NEVER caches this at build time
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceFresh = searchParams.get("refresh") === "true";

    const data = await getGitHubContributions("Saswat0602", forceFresh);

    if (!data) {
      return NextResponse.json(
        { error: "Could not retrieve contribution telemetry" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        // 5-minute CDN edge cache, 15-minute stale-while-revalidate, prevents stale deployments
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
