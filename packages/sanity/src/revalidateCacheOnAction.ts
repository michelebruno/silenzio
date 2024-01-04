import type {
  DocumentActionComponent,
  DocumentActionProps,
  DocumentActionsContext,
} from "sanity";
import { speak } from "@silenzio/core";
import { isDebugMode } from "@silenzio/core/utils";

export default function revalidateCacheOnAction(
  originalAction: DocumentActionComponent,
  context: DocumentActionsContext
): DocumentActionComponent {
  return (props: DocumentActionProps) => {
    const originalResult = originalAction(props);
    return {
      label: "Publish",
      ...originalResult,
      onHandle: async () => {
        if (originalResult?.onHandle) originalResult.onHandle();

        const body = {
          secret: speak("cache.secret"),
          tags: context.schemaType,
          document: {
            _id: context.documentId,
            _type: context.schemaType,
          },
        };

        const domains = speak("cache.domains");

        if (isDebugMode())
          console.debug("Domains where to refresh cache", domains);

        return Promise.all(
          domains.map(async (url: URL) => {
            // TODO: url is already a URL, no need to create a new one
            const revalidateApiUrl = new URL(url);

            revalidateApiUrl.pathname = speak("cache.revalidateApiPath");

            try {
              await fetch(revalidateApiUrl.toString(), {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              });
            } catch (e) {
              console.error(e);
            }
          })
        );
      },
    };
  };
}
