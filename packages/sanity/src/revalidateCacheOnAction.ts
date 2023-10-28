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
) {
  return (props: DocumentActionProps) => {
    const originalResult = originalAction(props);
    return {
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

        //  const searchParams = new URLSearchParams(body)
        for (const url of domains as URL[]) {
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
        }
      },
    };
  };
}
