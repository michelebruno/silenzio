// @ts-ignore
const config: Silenzio.Config = {
  isMock: true,
  hostname: 'https://example.com',
  templates: {
    'mock-document-type': {
      toUrl: (document: any) => `/mock-document-path/${document.slug.current}`,
    }
  }
}

export default config