jest.mock("silenzio-config", () => {});
global.console = { warn: jest.fn() };

import loadConfig from "./loadConfig";
test("when silenzio-config is not alias", () => {
  const config = loadConfig();
  expect(spy).toBeCalled();
});
