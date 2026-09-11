import { ImageResponse } from "next/og";

export const alt = "Neo Lens Studios, Film & Video Production, Lagos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 80,
          color: "#14161a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1, display: "flex" }}>
          NEO <span style={{ color: "#e4392e", marginLeft: 10 }}>LENS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05, maxWidth: 920 }}>
            Film & video production, Lagos
          </div>
          <div style={{ fontSize: 26, color: "#6b7280" }}>
            Documentaries · Commercials · Corporate · Live Production · Brand Content
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
