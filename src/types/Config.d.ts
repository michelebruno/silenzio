namespace Silenzio {
  interface Config {
    hostname: string;

    templates: {
      [key: string]: {
        path: string;
        toUrl: (document: any) => string;
      }
    }
  }
}