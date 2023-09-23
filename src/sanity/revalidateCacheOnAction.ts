import {DocumentActionComponent, DocumentActionProps, DocumentActionsContext} from "sanity";
import speak from "../utils/speak";

export default function revalidateCacheOnAction(originalAction: DocumentActionComponent, context: DocumentActionsContext) {

  return (props: DocumentActionProps) => {
    const originalResult = originalAction(props)
    return {
      ...originalResult,
      onHandle: async () => {
        if (originalResult?.onHandle) originalResult.onHandle()


        const body = {
          secret: process.env.SANITY_STUDIO_SILENZIO_REVALIDATE_CACHE_SECRET || '',
          tags: context.schemaType,
          document: {
            _id: context.documentId,
            _type: context.schemaType
          }
        }

       //  const searchParams = new URLSearchParams(body)
        for (const url of process.env.SANITY_STUDIO_SILENZIO_DOMAINS?.split(',') || []) {

          let revalidateApiUrl = new URL(url)

          revalidateApiUrl.pathname = '/api/revalidate-cache'
          // revalidateApiUrl.search = searchParams.toString()


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