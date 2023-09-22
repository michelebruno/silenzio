import {NextRequest} from "next/server";
import {revalidatePath, revalidateTag} from "next/cache";
import speak from "../utils/speak";
import getDocumentUrl from "../utils/getDocumentUrl";

async function handler(request: NextRequest) {


  const data = {
    secret: null as string | null,
    tags: null as string | null,
    documentId: null as string | null
  }

  if (request.method !== 'GET') {

    const body = await request.json()

    data.secret = body.secret;
    data.tags = body.tags;
    data.documentId = body.documentId;

  } else {
    const {searchParams: query} = new URL(request.url)
    data.secret = query.get('secret')
    data.tags = query.get('tags')
    data.documentId = query.get('documentId')
  }

  if (data.secret !== speak('cache.secret')) {
    return new Response('Unauthorized', {status: 401})
  }

  const {tags} = data

  tags?.split(',').forEach(revalidateTag)

  if (data.documentId && data.tags && data.tags in speak('templates')) {
    if (getDocumentUrl(data.documentId, data.tags)) revalidatePath(getDocumentUrl(data.documentId, data.tags))
  }

  return new Response(JSON.stringify({message: 'Successfully revalidated tags', tags}), {status: 200,})

}


export default handler