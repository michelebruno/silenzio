/// <reference types="sanity" />

declare namespace Silenzio {
  import type { HttpMethod } from "@silenzio/core";

  export type Icon = {
    vWidth: number;
    vHeight: number;
    path: string | JSX.Element | JSX.Element[];
  };

  export type Document = SanityDocumentLike & {
    slug: Slug;
  };

  export type TemplateObject = {
    path?: string;
    toUrl: (document: Document) => string;
  };

  export type Config = {
    /**
     * The hostname of the current website build.
     *
     * Better if it's already a URL object
     */
    hostname: URL;

    test?: string;

    templates?: {
      [key: string]: TemplateObject;
    };

    cache?: {
      /**
       * The secret that is used to revalidate the cache
       *
       * It will be embedded in the sanity studio bundle and will be used by the (NextJs) server to revalidate the cache
       */
      secret?: string;

      /**
       * The domains that are allowed to revalidate the cache
       *
       * @remarks
       *
       * @defaultValue process.env.SANITY_STUDIO_SILENZIO_DOMAINS?.split(',') || process.env.SILENZIO_DOMAINS?.split(',') || []
       */
      domains?: URL[];
      /**
       * The path to the API endpoint that revalidates the cache
       *
       * @defaultValue /api/revalidate-cache
       */
      revalidateApiPath?: string;
      /**
       * Which HTTP method to use when revalidating the cache
       *
       * @remarks
       *
       * @defaultValue HTTP_METHOD.POST
       */
      method?: HttpMethod;
    };
  };

  export type ExtractPropertyFromPath<
    ObjectType extends Record<string, unknown>,
    Path extends string,
  > = Path extends `templates.${infer Rest extends string}`
    ? Rest extends `${infer _ extends
        string}.${infer TemplateObjectProperty extends string}`
      ? TemplateObjectProperty extends keyof TemplateObject
        ? TemplateObject[TemplateObjectProperty]
        : never
      : TemplateObject
    : Path extends `${infer FirstPart}.${infer Rest}` // Se è a.b
    ? FirstPart extends keyof Required<ObjectType>
      ? Required<ObjectType>[FirstPart] extends object
        ? ExtractPropertyFromPath<Required<ObjectType>[FirstPart], Rest>
        : Required<ObjectType>[FirstPart]
      : keyof ObjectType[FirstPart]
    : Path extends keyof ObjectType
    ? Required<ObjectType>[Path]
    : never;

  export type ExtractConfigPropertyFromPath<T extends string> =
    ExtractPropertyFromPath<Config, T>;

  export type TypeToDotNotation<T> = T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | `${K}.${TypeToDotNotation<T[K]>}`
          : never;
      }[keyof T]
    : never;

  export type NestedKeyOfConfig = TypeToDotNotation<Config>;
}
