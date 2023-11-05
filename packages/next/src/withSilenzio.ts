import type { NextConfig } from "next";
import type { Configuration } from "webpack";
import { isDebugMode } from "@silenzio/core/utils";

export function withSilenzio(config: NextConfig): NextConfig {
  process.env.SILENZIO = "1";

  return {
    ...config,
    env: {
      ...config.env,
      SILENZIO_DEBUG: process.env.SILENZIO_DEBUG || "0",
    },
    webpack(c: Configuration, ...rest) {
      if (!c.resolve) c.resolve = {};

      const searchInThesePaths = [
        `${process.cwd()}/silenzio.config.js`,
        `${process.cwd()}/silenzio.config.ts`,
        `${process.cwd()}/silenzio.config.mjs`,
        `${process.cwd()}/silenzio.config.cjs`,
      ];

      let configPath;

      for (const searchInThisPath of searchInThesePaths) {
        try {
          const f = require.resolve(searchInThisPath);
          try {
            configPath = f;
            if (configPath) break;
          } catch (e) {}
        } catch (e) {}
      }

      if (configPath)
        c.resolve.alias = {
          "@silenzio/app-config": configPath,
        };
      else if (isDebugMode())
        console.debug(
          "Couldn't find a file to alias @silenzio/app-config",
          configPath
        );

      if (config?.webpack && typeof config.webpack === "function")
        return config.webpack(c, ...rest);
      return c;
    },
  };
}

export default withSilenzio;
