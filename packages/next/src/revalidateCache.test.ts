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
        tags: "test",
      });
    },
    get url(): string {
      const url = new URL("https://www.example.com");
      url.pathname = "/api/revalidate-cache";
      const search = new URLSearchParams();
      search.set("tags", "test");

      url.search = search.toString();

      return url.toString();
    },
  };

  test("revalidateTag is called", async () => {
    const spy = jest.spyOn(nextCache, "revalidateTag");

    await revalidateCache(request as NextRequest);

    expect(spy).toBeCalled();
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
