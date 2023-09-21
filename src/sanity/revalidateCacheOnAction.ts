import {DocumentActionComponent, DocumentActionProps, DocumentActionsContext} from "sanity";

export default function revalidateCacheOnAction(originalAction: DocumentActionComponent, context: DocumentActionsContext) {

  return (props: DocumentActionProps) => {
    const originalResult = originalAction(props)
    return {
      ...originalResult,
      onHandle: async () => {

        if (originalResult?.onHandle) originalResult.onHandle()
        const params = new URLSearchParams()
        params.set('secret', process.env.SANITY_STUDIO_SILENZIO_REVALIDATE_CACHE_SECRET || '')
        params.set('tags', context.schemaType)

        console.log("Trying to revalidate cache", process.env.SANITY_STUDIO_SILENZIO_DOMAINS, process.env.SANITY_STUDIO_SILENZIO_REVALIDATE_CACHE_SECRET, )

        for (const url of process.env.SANITY_STUDIO_SILENZIO_DOMAINS?.split(',') || []) {

          let revalidateApiUrl = new URL(url)

          revalidateApiUrl.pathname = '/api/revalidate-cache'
          revalidateApiUrl.search = params.toString()

          await fetch(revalidateApiUrl.toString())
        }
      },
    }
  }

}