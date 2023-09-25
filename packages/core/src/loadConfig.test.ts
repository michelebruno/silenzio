jest.mock("silenzio-config");

import { loadConfig, searchConfig } from "./loadConfig";

describe("Config loader", () => {
  const config = loadConfig();

  it("loads mock config", () => {
    expect(config).toHaveProperty("isMock", true);
  });

  test("loads default config", () => {
    // Check if default config is loaded
    expect(config).toHaveProperty("wasDefaultConfigLoaded", true);
  });

  test("loads object config passed as param", () => {
    // @ts-expect-error - This is a mock config property, it's not supposed to be used in real life.
    expect(loadConfig({ loadsObjects: true })).toHaveProperty(
      "loadsObjects",
      true
    );
  });
});

describe.skip("Mock config", () => {
  // Doens't work since jest doesn't allow to mock require.resolve
  test("is found", () => {
    const spy = jest.spyOn(process, "cwd");

    spy.mockReturnValue("/Users/michelebruno/coding/skp");

    expect(searchConfig()).toHaveProperty("name", "SK Progetti");
  });
});
