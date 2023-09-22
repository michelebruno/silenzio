import {HTTP_METHOD} from "next/dist/server/web/http";

export namespace Silenzio {
  export interface Config {
    hostname: string | string[];

    test?: string;

    templates?: {
      [key: string]: {
        path?: string;
        toUrl: (document: any) => string;
      }
    };

    cache?: {
      secret?: string;

      /**
       * The domains that are allowed to revalidate the cache
       *
       * @remarks
       *
       * @defaultValue process.env.SANITY_STUDIO_SILENZIO_DOMAINS?.split(',') || process.env.SILENZIO_DOMAINS?.split(',') || []
       */
      domains?: string[];
      /**
       * The path to the API endpoint that revalidates the cache
       *
       * @defaultValue /api/revalidate-cache
       */
      revalidateApiPath?: string;
      /**
       * Which HTTP method to use when revalidating the cache
       *
       * @remarks
       *
       * @defaultValue HTTP_METHOD.POST
       */
      method?: HTTP_METHOD;
    }
  }
}

const silenzioConfigDefault: Silenzio.Config = {
  test: 'testoo',
  hostname: 'https://example.com',

  cache: {
    secret: process.env.SANITY_STUDIO_SILENZIO_REVALIDATE_CACHE_SECRET || process.env.SILENZIO_REVALIDATE_CACHE_SECRET,
    domains: process.env.SANITY_STUDIO_SILENZIO_DOMAINS?.split(',') || process.env.SILENZIO_DOMAINS?.split(',') || [],
    revalidateApiPath: '/api/revalidate-cache',
    method: 'POST',
  }
}

export default silenzioConfigDefault