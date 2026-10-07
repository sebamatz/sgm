import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SGM Software Developers";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const title =
    lang === "el"
      ? "SGM Software Developers"
      : "SGM Software Developers";

  const subtitle =
    lang === "el"
      ? "Επαγγελματική Ανάπτυξη Λογισμικού"
      : "Professional Software Development";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Grid pattern background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.4,
          }}
        />
        
        {/* Soft accent glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "20%",
            width: 400,
            height: 400,
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: "50%",
            filter: "blur(120px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              marginBottom: 20,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#3B82F6" }}>SGM</span> Software Developers
          </h1>

          <p
            style={{
              fontSize: 36,
              color: "#a1a1aa",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {subtitle}
          </p>

          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 40,
              fontSize: 24,
              color: "#71717a",
              fontFamily: "monospace",
            }}
          >
            <span>React</span>
            <span>·</span>
            <span>Next.js</span>
            <span>·</span>
            <span>TypeScript</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#52525b",
            fontFamily: "monospace",
          }}
        >
          www.sgmsoftware.gr
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
