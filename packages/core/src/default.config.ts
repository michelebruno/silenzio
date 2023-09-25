export declare const HttpMethods: readonly [
  'GET',
  'HEAD',
  'OPTIONS',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
];
/**
 * A type representing the valid HTTP methods that can be implemented by
 * Next.js's Custom App Routes.
 */
export type HttpMethod = (typeof HttpMethods)[number];

const silenzioConfigDefault: Silenzio.Config = {
  // @ts-expect-error - This is a mock config property, it's not supposed to be used in real life.
  wasDefaultConfigLoaded: true,
  hostname: 'https://example.com',
  cache: {
    secret:
      process.env.SANITY_STUDIO_SILENZIO_REVALIDATE_CACHE_SECRET ||
      process.env.SILENZIO_REVALIDATE_CACHE_SECRET,
    domains:
      process.env.SANITY_STUDIO_SILENZIO_DOMAINS?.split(',').map(
        (u) => new URL(u)
      ) ||
      process.env.SILENZIO_DOMAINS?.split(',').map((u) => new URL(u)) ||
      [],
    revalidateApiPath: '/api/revalidate-cache',
    method: 'POST',
  },
};

export default silenzioConfigDefault;
