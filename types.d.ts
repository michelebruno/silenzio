/// <reference types="sanity" />

declare namespace Silenzio {
  export { type Config } from './src/default.config';

  export type Document = SanityDocumentLike & {
    slug: Slug;
  };
}
