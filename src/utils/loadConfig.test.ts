jest.mock("silenzio-config");

import {loadConfig, searchConfig} from "./loadConfig";

const config = loadConfig()

describe('Config loader', () => {

  it('loads mock config', () => {
    expect(config).toHaveProperty('isMock', true)
  })

  test('loads default config', () => {
    // Check if default config is loaded
    expect(config).toHaveProperty('wasDefaultConfigLoaded', true)
  })
  test('loads object config', () => {
    // Check if default config is loaded
    expect(loadConfig({loadsObjects: true})).toHaveProperty('loadsObjects', true)
  })
})


describe.skip('Mock config', () => {

  // Doens't work since jest doesn't allow to mock require.resolve
  test('is found', () => {
    const spy = jest.spyOn(require('process'), 'cwd');

    spy.mockReturnValue('/Users/michelebruno/coding/skp');

    expect(searchConfig()).toHaveProperty('name', 'SK Progetti')
  })
})




