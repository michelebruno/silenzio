import {loadConfig} from "./loadConfig";
import getDocumentUrl from "./getDocumentUrl";
import path from "path";
import {Silenzio} from "../default.config";

const config = loadConfig(path.resolve(__dirname, '../mock.config.ts'))



test('Config loads right', () => {
  // Load config from mockConfig.ts

  // Check if default config is loaded
  expect(config?.hostname).toBe('https://example.com')

  // Check if default config is loaded
  expect(config).toHaveProperty('test', 'testoo')

  expect(false).toBe(true)
})

