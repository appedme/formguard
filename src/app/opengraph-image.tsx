import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "FormGuard - The AI-Powered Form Backend";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b", // zinc-950
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {/* Simple Shield Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
          }}
        >
          FormGuard
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            opacity: 0.8,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          The AI-Powered Form Backend
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
