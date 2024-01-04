export declare const HttpMethods: readonly [
  "GET",
  "HEAD",
  "OPTIONS",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
];
/**
 * A type representing the valid HTTP methods that can be implemented by
 * Next.js's Custom App Routes.
 */
export type HttpMethod = (typeof HttpMethods)[number];

const silenzioConfigDefault: Silenzio.Config = {
  // @ts-expect-error - This is a mock config property, it's not supposed to be used in real life.
  wasDefaultConfigLoaded: true,
  cache: {
    secret:
      process.env.SILENZIO_REVALIDATE_CACHE_SECRET ||
      process.env.SANITY_STUDIO_SILENZIO_REVALIDATE_CACHE_SECRET ||
      process.env.NEXT_PUBLIC_SILENZIO_REVALIDATE_CACHE_SECRET,
    domains:
      (
        process.env.NEXT_PUBLIC_SILENZIO_HOSTNAMES ||
        process.env.SANITY_STUDIO_SILENZIO_HOSTNAMES ||
        process.env.SILENZIO_HOSTNAMES
      )
        ?.split(",")
        .map((u) => new URL(u)) || [],
    revalidateApiPath: "/api/revalidate-cache",
    method: "POST",
  },
};

export default silenzioConfigDefault;
