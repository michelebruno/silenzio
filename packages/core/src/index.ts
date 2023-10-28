import speak from "./speak";
import { loadConfig } from "./loadConfig";
import getDocumentUrl from "./getDocumentUrl";
import isDebugMode from "./utils";

export { loadConfig } from "./loadConfig";
export { searchConfigPath } from "./loadConfig";
export { default as speak } from "./speak";
export { default as getDocumentUrl } from "./getDocumentUrl";

export default {
  isDebugMode,
  loadConfig,
  speak,
  getDocumentUrl,
};
