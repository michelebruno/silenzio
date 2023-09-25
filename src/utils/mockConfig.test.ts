jest.mock("silenzio-config");
const mockWarn = jest.fn();
global.console = { ...global.console, warn: mockWarn };

import loadConfig from "./loadConfig";
test("when silenzio-config is not alias", () => {
  const config = loadConfig();
  expect(mockWarn).toBeCalled();
});
