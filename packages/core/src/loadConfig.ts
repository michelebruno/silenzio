import defaultConfig from "./default.config";
import _ from "lodash";

// @ts-expect-error Since it must be aliased or mocked
import appConfig from "@silenzio/app-config";

if (!appConfig) {
  console.warn(
    "You probably forgot to add the silenzio-config alias to your webpack config"
  );
}

export function searchConfig() {
  const searchInThesePaths = [
    `${process.cwd()}/silenzio.config.js`,
    `${process.cwd()}/silenzio.config.ts`,
    `${process.cwd()}/silenzio.config.mjs`,
    `${process.cwd()}/silenzio.config.cjs`,
  ];

  let res;

  for (const searchInThisPath of searchInThesePaths) {
    try {
      //const f = require.resolve(searchInThisPath);
      try {
        // res = require(f);
        if (res) break;
      } catch (e) {}
    } catch (e) {}
  }

  return res;
}

function InternalLoadConfig(
  configOrPath?: string | Silenzio.Config
): Silenzio.Config {
  let result;

  if (!configOrPath) {
    if (!appConfig) {
      result = searchConfig();
    } else {
      result = appConfig;
    }
  } else if (typeof configOrPath === "object") {
    result = configOrPath;
  }

  return _.merge(result as Silenzio.Config, defaultConfig as Silenzio.Config);
}

export const requiredConfigPaths: ReadonlyArray<Silenzio.NestedKeyOfConfig> = [
  "cache.secret",
];

export function loadConfig(
  configOrPath?: string | Silenzio.Config
): Silenzio.Config {
  const config = InternalLoadConfig(configOrPath);

  for (const path of requiredConfigPaths) {
    if (typeof window === "undefined" && !_.property(path)(config)) {
      console.warn(`Required config property ${path} is null or undefined.`);
    }
  }

  return config;
}

export default loadConfig;
