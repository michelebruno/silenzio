import revalidateCache from "./revalidateCache";

jest.mock('next/cache', () => ({
  ...jest.requireActual('next/cache'),
  revalidateTag: jest.fn()
}))

import {describe} from "@jest/globals";
import {NextRequest} from "next/server";
import {Blob} from "buffer";
import {Request} from "next/dist/compiled/@edge-runtime/primitives";
import {RequestCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {NextURL} from "next/dist/server/web/next-url";


describe("NextJS revalidateCache", () => {

  const request: Partial<NextRequest> = {
    get url(): string {
      const url = new URL('https://www.example.com')
      url.pathname = '/api/revalidate-cache'
      const search = new URLSearchParams()
      search.set('tags', 'test');

      url.search = search.toString()

      return url.toString();
    }

  }
  revalidateCache(request as NextRequest)
})