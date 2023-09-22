jest.mock('./loadConfig')

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

  test('can find config file', () => {
    const spy = jest.spyOn(require('process'), 'cwd');
    spy.mockReturnValue('/Users/michelebruno/coding/skp');
    expect(searchConfig()).toHaveProperty('name', 'SK Progetti')
  })

})





