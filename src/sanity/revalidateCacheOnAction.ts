import type {DocumentActionComponent, DocumentActionProps, DocumentActionsContext} from "sanity";
import speak from "../utils/speak";

export default function revalidateCacheOnAction(originalAction: DocumentActionComponent, context: DocumentActionsContext)  {

  return (props: DocumentActionProps) => {
    const originalResult = originalAction(props)
    return {
      ...originalResult,
      onHandle: async () => {
        if (originalResult?.onHandle) originalResult.onHandle()


        const body = {
          secret: speak('cache.secret'),
          tags: context.schemaType,
          document: {
            _id: context.documentId,
            _type: context.schemaType
          }
        }

       //  const searchParams = new URLSearchParams(body)
        for (const url of speak('cache.domains')) {

          let revalidateApiUrl = new URL(url)

          revalidateApiUrl.pathname = speak('cache.revalidateApiPath')

          await fetch(revalidateApiUrl.toString(), {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
          })
        }
      },
    }
  }

}