import getPathname from "./getPathname";
import path from "path";

import {loadConfig} from "./loadConfig";
const config = loadConfig(path.resolve(__dirname, '../mock.config.ts'))

test('Url resolver', () => {
  expect(config?.templates.project.toUrl({slug: {current: 'test'}}))
    .toBe(getPathname({slug: {current: 'test'}}, 'project'))
})