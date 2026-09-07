import { ImageResponse } from "next/og";

export const alt = "Neo Lens Studios — Film & Video Production, Lagos";
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
          background: "#0b0d10",
          padding: 80,
          color: "#f4f2ed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              border: "3px solid #e8a34c",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1, display: "flex" }}>
            NEO <span style={{ color: "#e8a34c", marginLeft: 10 }}>LENS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05, maxWidth: 920 }}>
            Film & video production, Lagos
          </div>
          <div style={{ fontSize: 26, color: "#9a9d9f" }}>
            Documentaries · Commercials · Corporate · Live Production · Brand Content
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
