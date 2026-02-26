import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "edge";

export const alt = "FormGuard Blog";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: "#09090b",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          FormGuard Blog
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          color: "white",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa", // zinc-400
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            {post.category?.toUpperCase() || "BLOG"}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 24,
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#d4d4d8", // zinc-300
              lineHeight: 1.5,
              fontWeight: 400,
              maxWidth: "90%",
            }}
          >
            {post.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Avatar placeholder if needed */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#27272a", // zinc-800
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {post.author.charAt(0)}
            </div>
            <div style={{ fontSize: 24, fontWeight: 500 }}>{post.author}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
             <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 12 }}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
            <div style={{ fontSize: 28, fontWeight: 700 }}>FormGuard</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
