import defaultConfig from '../default.config';
import _ from 'lodash';

// @ts-expect-error Can't find module 'silenzio-config'
import appConfig from 'silenzio-config';

if (!appConfig) {
  console.warn(
    'You probably forgot to add the silenzio-config alias to your webpack config'
  );
}

export function searchConfig() {
  const moduleName = 'silenzio';
  const searchInThesePaths = [
    `${process.cwd()}/${moduleName}.config.js`,
    `${process.cwd()}/${moduleName}.config.ts`,
    `${process.cwd()}/${moduleName}.config.mjs`,
    `${process.cwd()}/${moduleName}.config.cjs`,
  ];

  let res;

  for (const searchInThisPath of searchInThesePaths) {
    try {
      const f = require.resolve(searchInThisPath);
      try {
        res = require(f);
        if (res) break;
      } catch (e) {}
    } catch (e) {}
  }

  return res;
}

export function loadConfig(
  configOrPath?: string | Silenzio.Config
): Silenzio.Config {
  let result;

  if (!configOrPath) {
    if (!appConfig) {
      result = searchConfig();
    } else {
      result = appConfig;
    }
  } else if (typeof configOrPath === 'object') {
    result = configOrPath;
  }

  return _.merge(result as Silenzio.Config, defaultConfig as Silenzio.Config);
}
