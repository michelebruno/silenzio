import revalidateCache from "./revalidateCache";
import nextCache from "next/cache";

jest.mock("silenzio-config");
jest.mock("next/cache", () => ({
  ...jest.requireActual("next/cache"),
  revalidateTag: jest.fn(),
}));

import { describe, jest } from "@jest/globals";
import { NextRequest } from "next/server";
import { speak } from "@silenzio/core";

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

    expect(revalidateCache(getReq as NextRequest)).rejects.toThrowError();
  });
});
