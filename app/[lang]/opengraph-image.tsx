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
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #dbeafe 100%)",
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
            top: "20%",
            right: "15%",
            width: 400,
            height: 400,
            background: "rgba(99, 102, 241, 0.2)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />
        
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "15%",
            width: 350,
            height: 350,
            background: "rgba(59, 130, 246, 0.15)",
            borderRadius: "50%",
            filter: "blur(70px)",
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
              color: "#0f172a",
              textAlign: "center",
              marginBottom: 20,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#4338ca" }}>SGM</span> Software Developers
          </h1>

          <p
            style={{
              fontSize: 36,
              color: "#475569",
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
              color: "#64748b",
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
            color: "#94a3b8",
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
