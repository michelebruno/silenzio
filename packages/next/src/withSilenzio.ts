import type { NextConfig } from "next";
import type { Configuration } from "webpack";

export function withSilenzio(config: NextConfig): NextConfig {
  return {
    ...config,
    webpack(c: Configuration, ...rest) {
      if (!c.resolve) c.resolve = {};

      c.resolve.alias = {
        "@silenzio/app-config": require.resolve(
          `${process.cwd()}/silenzio.config.js`
        ),
      };
      if (config?.webpack && typeof config.webpack === "function")
        return config.webpack(c, ...rest);
      else return c;
    },
  };
}

export default withSilenzio;
