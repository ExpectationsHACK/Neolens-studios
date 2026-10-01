import { ImageResponse } from "next/og";

// iOS home-screen icon — same "N" mark as src/app/icon.svg and the header
// logo, on a full-bleed tile because iOS applies its own corner mask.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <svg width="120" height="120" viewBox="12 12 40 40">
          <path d="M17 48V16h9l12 18.5V16h9v32h-9L26 29.5V48z" fill="#0b0c0e" />
        </svg>
      </div>
    ),
    size,
  );
}
