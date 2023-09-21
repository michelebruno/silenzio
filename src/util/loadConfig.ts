import {cosmiconfigSync} from "cosmiconfig";
import defaultConfig from "../default.config";
import _ from "lodash";

export function loadConfig(configPath?: string)  {

    const explorerSync = cosmiconfigSync('silenzio')

    let result;

    if (!configPath) {
        result = explorerSync.search()
    } else result = explorerSync.load(configPath)

    console.log(result?.config)

    return _.merge(result?.config, defaultConfig)
}