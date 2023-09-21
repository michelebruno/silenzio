import {DocumentActionComponent, DocumentActionProps, DocumentActionsContext} from "sanity";

export default function revalidateCache(originalAction: DocumentActionComponent, context: DocumentActionsContext) {

  return (props: DocumentActionProps) => {
    const originalResult = originalAction(props)
    return {
      ...originalResult,
      onHandle: async () => {

        if (originalResult?.onHandle) originalResult.onHandle()

        const params = new URLSearchParams()
        params.set('secret', process.env.SANITY_STUDIO_REVALIDATE_CACHE_SECRET || '')
        params.set('tags', context.schemaType)

        for (const url of [
          // 'https;//www.skprogetti.com',
          'https://skp.michelebruno.co',
          'http://localhost:3000',
          // 'https://www.skprogetti.it',
          'https://skp-git-staging-michelebruno.vercel.app/'
        ]) {

          let revalidateApiUrl = new URL(url)

          revalidateApiUrl.pathname = '/api/revalidate-cache'
          revalidateApiUrl.search = params.toString()

          await fetch(revalidateApiUrl.toString())
        }
      },
    }
  }

}