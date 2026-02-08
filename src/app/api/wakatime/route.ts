import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

  if (!WAKATIME_API_KEY) {
    // Return mock data if key is missing (for demo purposes)
    return NextResponse.json({
      status: "online",
      editor: "VS Code",
      lastUpdate: "just now",
      timeToday: "4h 20m",
      timeYesterday: "6h 15m",
      isMock: true,
    });
  }

  try {
    const [statusRes, statsRes] = await Promise.all([
      fetch(
        "https://wakatime.com/api/v1/users/current/status_bar/heartbeat?api_key=" +
          WAKATIME_API_KEY,
        { next: { revalidate: 60 } }
      ),
      fetch(
        "https://wakatime.com/api/v1/users/current/summaries?start=yesterday&end=today&api_key=" +
          WAKATIME_API_KEY,
        { next: { revalidate: 3600 } }
      ),
    ]);

    const statusData = await statusRes.json();
    const statsData = await statsRes.json();

    const isOnline =
      statusData.data?.is_coding ||
      (new Date().getTime() -
        new Date(statusData.data?.created_at).getTime()) /
        1000 /
        60 <
        10; // Considered online if heartbeat in last 10 mins

    const today = statsData.data?.[1] || statsData.data?.[0]; // Try to get today's data (last item)

    let editorName = statusData.data?.editor?.name || "VS Code";
    if (editorName === "Cursor") editorName = "VS Code";

    return NextResponse.json({
      status: isOnline ? "online" : "offline",
      editor: editorName,
      lastUpdate: statusData.data?.created_at,
      timeToday: today?.grand_total?.text || "0m",
      isMock: false,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch WakaTime data" },
      { status: 500 }
    );
  }
}
