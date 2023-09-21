namespace Silenzio {
  interface Config {
    hostname: string | string[];

    test?: string;

    templates?: {
      [key: string]: {
        path?: string;
        toUrl: (document: any) => string;
      }
    }
  }
}