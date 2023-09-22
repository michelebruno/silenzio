
const config: Silenzio.Config = {
  isMock: true,
  hostname: 'https://example.com',
  templates: {
    'mock-document-type': {
      toUrl: (document: any) => `/mock-document-path/${document.slug.current}`,
    }
  }
}

function loadConfig(_: Silenzio.Config | string) {
  return jest.requireActual('../loadConfig').loadConfig(config)
}

module.exports = {
  loadConfig,
  searchConfig : jest.requireActual('../loadConfig').searchConfig
}