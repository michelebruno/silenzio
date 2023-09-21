const config: Silenzio.Config = {
  hostname: 'https://example.com',
  templates: {
    project: {
      toUrl: (document) => `/projects/${document.slug.current}`,
    }
  }
}

export default config