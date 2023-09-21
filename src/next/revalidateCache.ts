import {NextRequest} from "next/server";
import {revalidateTag} from "next/cache";

function handler(request: NextRequest) {

  console.log('revalidateCache.ts: GET: request.url:', request.url)

  const { searchParams } = new URL(request.url)

  if (searchParams.get('secret') !== process.env.SILENZIO_REVALIDATE_CACHE_SECRET) {
    return new Response('Unauthorized', {status: 401})
  }

  const tags = searchParams.get('tags')

  tags?.split(',').forEach(revalidateTag)

  return new Response(JSON.stringify({message:'Successfully revalidated tags', tags}), {status: 200, })

}


export default handler