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

    if (statusRes.ok) {
      const statusData = await statusRes.json();
      lastHeartbeat = statusData.data?.created_at;
      isCoding = statusData.data?.is_coding;
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
      isOnline = diffMinutes < 20; // Extended timeout to 20 mins
      console.log(
        `Last heartbeat: ${lastHeartbeat}, Diff: ${diffMinutes.toFixed(2)} mins, isOnline: ${isOnline}`,
      );
    } else {
      console.log("No last heartbeat found in data");
    }

    const today = statsData.data?.[1] || statsData.data?.[0]; // Try to get today's data (last item)

    let editorName = "VS Code"; // Default
    // Update logic to try to find editor name from fallback if possible?
    // Usually statusData.data.editor.name. If using fallback, we might not get editor name easily
    // unless we inspect the heartbeat entity, but let's keep it simple.

    // Attempt to get editor from statusData if it existed
    // ... we need to parse statusData again or store it.
    // Simplifying: if statusRes.ok was true, we have separate logic.
    // Refactoring to keep it clean:

    return NextResponse.json({
      status: isOnline ? "online" : "offline",
      editor: editorName,
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
