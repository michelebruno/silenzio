import {loadConfig} from "../src/util/loadConfig";
import getPathname from "../src/util/getPathname";



test('Config loads right', () => {
  // Load config from mockConfig.ts
  const config = loadConfig('./test/mockConfig.ts')

  // Check if default config is loaded
  expect(config?.hostname).toBe('https://example.com')

  // Check if default config is loaded
  expect(config).toHaveProperty('test', 'testoo')

})

test('Url resolver', () => {
  const config = loadConfig('./test/mockConfig.ts')
  expect(config?.templates.project.toUrl({slug: {current: 'test'}}))
    .toBe(getPathname({slug: {current: 'test'}}, 'project'))


})