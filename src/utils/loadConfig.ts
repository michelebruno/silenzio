import defaultConfig from "../default.config";
import _ from "lodash";
import path from "path";
import * as fs from "fs";


export function searchConfig() {
  const moduleName = 'silenzio'
  const searchInThesePaths = [
    `${moduleName}.config.js`,
    `${moduleName}.config.ts`,
    `${moduleName}.config.mjs`,
    `${moduleName}.config.cjs`,
  ]

  for (const searchInThisPath of searchInThesePaths) {


    const filenamePath = path.resolve(process.cwd(), searchInThisPath )

    if (fs.existsSync(filenamePath)) {
      return require(filenamePath)
    }

  }

  return null;
}

export function loadConfig(configOrPath?: string | Silenzio.Config): Silenzio.Config {

  let result;

  if (!configOrPath)
    result = searchConfig()
  else if (typeof configOrPath === 'object')
    result = configOrPath

  return _.merge(result as Silenzio.Config, defaultConfig as Silenzio.Config)
}

