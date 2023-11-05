import speak from "./speak";

import mockConfig from "../../../__mocks__/@silenzio/app-config";

jest.mock("@silenzio/app-config");

describe("speak function", () => {
  test("is a function", () => {
    expect(typeof speak).toBe("function");
  });

  test("returns a correct values", () => {
    expect(speak("hostname")).toBe(mockConfig.hostname);

    const toUrl = speak("templates.mock-document-type.toUrl");

    expect(toUrl({ slug: "test" })).toBe(
      mockConfig.templates &&
        "mock-document-type" in mockConfig.templates &&
        mockConfig.templates["mock-document-type"].toUrl({ slug: "test" })
    );
  });
});
