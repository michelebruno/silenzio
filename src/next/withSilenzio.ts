import { NextConfig } from 'next';
import type { Configuration } from 'webpack';

export default function (config: NextConfig) {
  return {
    ...config,
    webpack(c: Configuration) {
      if (!c.resolve) c.resolve = {};

      c.resolve.alias = {
        'silenzio-config': require.resolve(
          `${process.cwd()}/silenzio.config.js`
        ),
      };
      return c;
    },
  };
}
