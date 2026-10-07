import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../middleware";

describe("Domain-based language routing", () => {
  it("redirects / to /el on sgmsoftware.gr", () => {
    const request = new NextRequest("https://www.sgmsoftware.gr/", {
      headers: new Headers({ host: "www.sgmsoftware.gr" }),
    });

    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.sgmsoftware.gr/el");
  });

  it("redirects / to /en on sgmsoftware.com", () => {
    const request = new NextRequest("https://www.sgmsoftware.com/", {
      headers: new Headers({ host: "www.sgmsoftware.com" }),
    });

    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.sgmsoftware.com/en");
  });

  it("redirects / to /en on localhost", () => {
    const request = new NextRequest("http://localhost:3000/", {
      headers: new Headers({ host: "localhost:3000" }),
    });

    const response = middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/en");
  });

  it("allows /el on sgmsoftware.com", () => {
    const request = new NextRequest("https://www.sgmsoftware.com/el", {
      headers: new Headers({ host: "www.sgmsoftware.com" }),
    });

    const response = middleware(request);

    expect(response instanceof NextResponse).toBe(true);
    expect(response.status).not.toBe(307);
  });

  it("allows /en on sgmsoftware.gr", () => {
    const request = new NextRequest("https://www.sgmsoftware.gr/en", {
      headers: new Headers({ host: "www.sgmsoftware.gr" }),
    });

    const response = middleware(request);

    expect(response instanceof NextResponse).toBe(true);
    expect(response.status).not.toBe(307);
  });
});
