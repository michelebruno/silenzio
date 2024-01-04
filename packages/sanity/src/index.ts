import type { DocumentActionComponent, PluginOptions } from "sanity";
import { getDocumentUrl, speak } from "@silenzio/core";
import revalidateCacheOnAction from "./revalidateCacheOnAction";

export default function silenzioSanityPlugin(): PluginOptions {
  return {
    name: "@silenzio/sanity",
    plugins: [],
    document: {
      actions: (prev: DocumentActionComponent[], context) =>
        prev.map((originalAction) =>
          originalAction.action === "publish"
            ? revalidateCacheOnAction(originalAction, context)
            : originalAction
        ),
      productionUrl: async (prev, context) => {
        let url = speak("hostname");

        // If url is string, convert it to URL object
        if (typeof url === "string") {
          url = new URL(url);
        }

        try {
          url.pathname = getDocumentUrl(context.document);
        } catch (e) {
          // @ts-expect-error Document is not typed
          const slug = context.document?.slug?.current || context.document?._id;
          url.pathname = `/${slug}`;
        }

        return url.toString();
      },
    },
  };
}
