import nextCache from "next/cache";

import { NextRequest } from "next/server";
import { speak } from "@silenzio/core";
import revalidateCache from "./revalidateCache";

jest.mock("@silenzio/app-config");

jest.mock("next/cache", () => ({
  ...jest.requireActual("next/cache"),
  revalidateTag: jest.fn(),
}));

describe("NextJS revalidateCache", () => {
  const request: Partial<NextRequest> = {
    json(): Promise<object> {
      return Promise.resolve({
        secret: speak("cache.secret"),
        tags: "mock-document-type",
      });
    },
    get url(): string {
      const url = new URL("https://www.example.com");
      url.pathname = speak("cache.revalidateApiPath");
      return url.toString();
    },
    method: "POST",
  };

  // TODO: test for OPTIONS and HEAD methods, and check if they have cors headers

  test("revalidateTag is called", async () => {
    const spy = jest.spyOn(nextCache, "revalidateTag");

    const res = await revalidateCache(request as NextRequest);

    expect(spy).toBeCalled();
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(res.status).toBe(200);
  });

  test("preflight requests work is called", async () => {
    const res = await revalidateCache({
      ...request,
      method: "OPTIONS",
    } as NextRequest);

    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(res.status).toBe(200);
  });

  test("doesn't allow GET requests", () => {
    const getReq: Partial<NextRequest> = {
      ...request,
      method: "GET",
    };

    return revalidateCache(getReq as NextRequest).catch((error) =>
      expect(error).toMatch("error")
    );
  });
});
