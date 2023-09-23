import revalidateCache from "./revalidateCache";

jest.mock('silenzio-config')
jest.mock('next/cache', () => ({
  ...jest.requireActual('next/cache'),
  revalidateTag: jest.fn()
}))

import {describe} from "@jest/globals";
import {NextRequest} from "next/server";
import speak from "../utils/speak";


describe("NextJS revalidateCache", () => {

  const request: Partial<NextRequest> = {
    json(): Promise<any> {
      return Promise.resolve({
        secret: speak('cache.secret'),
        tags: 'test',
      })
    },
    get url(): string {
      const url = new URL('https://www.example.com')
      url.pathname = '/api/revalidate-cache'
      const search = new URLSearchParams()
      search.set('tags', 'test');

      url.search = search.toString()

      return url.toString();
    }

  }

  test('revalidateTag is called', async () => {
    await revalidateCache(request as NextRequest)
    expect(require('next/cache').revalidateTag).toBeCalled()
  })
})