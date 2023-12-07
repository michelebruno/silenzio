import type { NextConfig } from "next";
import type { Configuration } from "webpack";
import { isDebugMode } from "@silenzio/core/utils";

export function withSilenzio({ webpack, ...config }: NextConfig): NextConfig {
  return {
    ...config,
    env: {
      ...config.env,
      SILENZIO_DEBUG: process.env.SILENZIO_DEBUG || "0",
    },
    webpack(webpackConfig: Configuration, ...rest) {
      const c = { ...webpackConfig };
      if (!c.resolve) c.resolve = {};

      const searchInThesePaths = [
        `${process.cwd()}/silenzio.config.js`,
        `${process.cwd()}/silenzio.config.ts`,
        `${process.cwd()}/silenzio.config.mjs`,
        `${process.cwd()}/silenzio.config.cjs`,
      ];

      const configPath = searchInThesePaths.reduce((prev, searchInThisPath) => {
        if (prev) return prev;
        try {
          return require.resolve(searchInThisPath);
        } catch (e) {
          return prev;
        }
      }, "");

      if (configPath)
        c.resolve.alias = {
          "@silenzio/app-config": configPath,
          ...c.resolve.alias,
        };
      else if (isDebugMode())
        console.debug(
          "Couldn't find a file to alias @silenzio/app-config",
          configPath
        );

      if (typeof webpack === "function") return webpack(c, ...rest);
      return c;
    },
  };
}

export default withSilenzio;
