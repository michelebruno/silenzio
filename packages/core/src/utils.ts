export function isDebugMode() {
  return Boolean(
    process.env.SILENZIO_DEBUG ||
      process.env.NEXT_PUBLIC_SILENZIO_DEBUG ||
      process.env.SANITY_STUDIO_SILENZIO_DEBUG
  );
}

export default { isDebugMode };
