
const config: Silenzio.Config = {
  hostname: 'https://example.com',
  templates: {
    project: {
      toUrl: (document: any) => `/projects/${document.slug.current}`,
    }
  }
}

export default config