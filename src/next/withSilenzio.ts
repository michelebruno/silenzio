import {NextConfig} from "next";

export default function (config: NextConfig) {

  return {
    ...config,
    webpack(c: any) {
      c.resolve.alias = {
        'silenzio-config': require.resolve(process.cwd() + '/silenzio.config.js')
      }
      return c;
    }
  };
}