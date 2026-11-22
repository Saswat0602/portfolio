import { NextResponse } from "next/server";
import { getGitHubReposMap } from "@/features/projects/services/github";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repoQuery = searchParams.get("repo");

  try {
    const reposMap = await getGitHubReposMap("Saswat0602");

    if (repoQuery) {
      const cleanName = repoQuery.includes("/")
        ? repoQuery.split("/").pop()?.toLowerCase() || ""
        : repoQuery.toLowerCase();

      const single = reposMap[cleanName] || null;
      return NextResponse.json(single, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }

    return NextResponse.json(reposMap, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub repository data", details: String(err) },
      { status: 500 }
    );
  }
}
