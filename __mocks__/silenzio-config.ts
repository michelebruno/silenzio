const config: Silenzio.Config = {
  isMock: true,
  hostname: 'https://example.com',
  cache: {
    domains: ['http://example.com'],
  },
  templates: {
    'mock-document-type': {
      toUrl: (document: Silenzio.Document) =>
        `/mock-document-path/${document.slug.current}`,
    },
  },
};

export default config;
