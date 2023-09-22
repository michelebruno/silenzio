import getDocumentUrl from "./getDocumentUrl";

import {loadMockConfig} from "./loadConfig";
import {describe} from "@jest/globals";

const config: Silenzio.Config = loadMockConfig()

test('Url resolver', () => {
  expect(config?.templates.project.toUrl({slug: {current: 'test'}}))
    .toBe(getDocumentUrl({slug: {current: 'test'}}, 'project'))
})


describe('Missing information in getDocumentUrl', () => {
  test('Url resolver with no document type', () => {
    expect(() => getDocumentUrl({slug: {current: 'test'}}))
      .toThrowError();
  })

  test('No template for post type', () => {
    expect(() => getDocumentUrl({slug: {current: 'test'}}, 'unknown-document-type'))
      .toThrowError();
  })
})