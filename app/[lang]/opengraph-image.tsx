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
          background: "linear-gradient(135deg, #0a0a0c 0%, #1e293b 100%)",
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
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
              fontWeight: 900,
              color: "white",
              textAlign: "center",
              marginBottom: 20,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
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
            }}
          >
            <span>React</span>
            <span>•</span>
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#52525b",
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
