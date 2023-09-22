'use server'

import {cosmiconfigSync} from "cosmiconfig";
import defaultConfig from "../default.config";
import _ from "lodash";
import path from "path";


export function loadConfig(configPath?: string): Silenzio.Config {

  const explorerSync = cosmiconfigSync('silenzio')

  let result;

  if (!configPath) {
    result = explorerSync.search()
  } else result = explorerSync.load(configPath)

  return _.merge(result?.config as Silenzio.Config, defaultConfig as Silenzio.Config)
}


export function loadMockConfig() {
  return loadConfig(path.resolve(__dirname, '../mock.config'))
}