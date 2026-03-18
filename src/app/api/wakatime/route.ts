/** @format */

import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

  if (!WAKATIME_API_KEY) {
    console.log("WAKATIME_API_KEY is missing, returning mock online status");
    // Return mock data if key is missing (for demo purposes)
    return NextResponse.json({
      status: "online",
      editor: "VS Code",
      lastUpdate: "just now",
      timeToday: "4h 20m",
      timeYesterday: "6h 15m",
      project: "portfolio",
      isMock: true,
    });
  }

  try {
    const statusUrl =
      "https://wakatime.com/api/v1/users/current/status_bar/heartbeat?api_key=" +
      WAKATIME_API_KEY;
    const statsUrl =
      "https://wakatime.com/api/v1/users/current/summaries?start=yesterday&end=today&api_key=" +
      WAKATIME_API_KEY;

    console.log("Fetching WakaTime data...");
    const [statusRes, statsRes] = await Promise.all([
      fetch(statusUrl, { next: { revalidate: 60 } }),
      fetch(statsUrl, { next: { revalidate: 3600 } }),
    ]);

    let lastHeartbeat = null;
    let isCoding = false;
    let projectName = "n/a";
    let editorName = "VS Code";

    if (statusRes.ok) {
      const statusData = await statusRes.json();
      lastHeartbeat = statusData.data?.created_at;
      isCoding = statusData.data?.is_coding;
      projectName = statusData.data?.project || "n/a";
      editorName = statusData.data?.editor?.name || "VS Code";
    } else {
      // Fallback: Try to get the last heartbeat from today's heartbeats
      console.warn(
        "WakaTime status endpoint failed, trying heartbeats list...",
      );
      try {
        const today = new Date().toISOString().split("T")[0];
        const heartbeatsUrl = `https://wakatime.com/api/v1/users/current/heartbeats?date=${today}&api_key=${WAKATIME_API_KEY}`;
        const heartbeatsRes = await fetch(heartbeatsUrl, {
          next: { revalidate: 60 },
        });
        if (heartbeatsRes.ok) {
          const hbData = await heartbeatsRes.json();
          if (hbData.data && hbData.data.length > 0) {
            // Get the very last heartbeat
            const last = hbData.data[hbData.data.length - 1];
            projectName = last.project || "n/a";
            editorName = last.editor || "VS Code";
            // WakaTime heartbeats time is a specific timestamp (float usually)
            if (last.time) {
              // Convert to ISO string or keep as timestamp for comp
              lastHeartbeat = new Date(last.time * 1000).toISOString();
            }
          }
        }
      } catch (e) {
        console.error("Fallback to heartbeats failed", e);
      }
    }

    const statsData = await statsRes.json();

    // Calculate time difference in minutes
    let isOnline = false;
    if (isCoding) {
      isOnline = true;
    } else if (lastHeartbeat) {
      const diffMinutes =
        (new Date().getTime() - new Date(lastHeartbeat).getTime()) / 1000 / 60;
      isOnline = diffMinutes < 15; // Set to 15 mins for better accuracy
      console.log(
        `Last heartbeat: ${lastHeartbeat}, Diff: ${diffMinutes.toFixed(2)} mins, isOnline: ${isOnline}`,
      );
    }

    const today = statsData.data?.[statsData.data.length - 1]; // Get today's data (last item)

    return NextResponse.json({
      status: isOnline ? "online" : "offline",
      editor: editorName,
      project: projectName,
      lastUpdate: lastHeartbeat,
      timeToday: today?.grand_total?.text || "0m",
      isMock: false,
    });
  } catch (error) {
    console.error("Error in WakaTime route:", error);
    return NextResponse.json(
      { error: "Failed to fetch WakaTime data" },
      { status: 500 },
    );
  }
}
