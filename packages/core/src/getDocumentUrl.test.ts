jest.mock("silenzio-config");

import getDocumentUrl from "./getDocumentUrl";

import { loadConfig } from "./loadConfig";

const config: Silenzio.Config = loadConfig();

describe("getDocumentUrl", () => {
  test("resolves url if type is given", () => {
    expect(
      config?.templates &&
        "mock-document-type" in config?.templates &&
        config?.templates["mock-document-type"].toUrl({
          slug: { current: "test" },
        })
    ).toBe(getDocumentUrl({ slug: { current: "test" } }, "mock-document-type"));
  });

  test("throws error if type is missing", () => {
    expect(() => getDocumentUrl({ slug: { current: "test" } })).toThrowError();
  });

  test("throws error if resolver doesnt exists", () => {
    expect(() =>
      getDocumentUrl({ slug: { current: "test" } }, "unknown-document-type")
    ).toThrowError();
  });
});
