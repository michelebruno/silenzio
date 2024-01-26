const config: Silenzio.Config = {
  // @ts-expect-error - used for testing purposes
  isMock: true,
  hostname: new URL("https://example.com"),
  cache: {
    domains: [new URL("https://example.com")],
    secret: "mock-secret",
  },
  templates: {
    "mock-document-type": {
      toUrl: (document: Silenzio.Document) =>
        `/mock-document-path/${document.slug.current}`,
    },
  },
};

export default config;
