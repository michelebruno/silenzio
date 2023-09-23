import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import speak from '../utils/speak';
import getDocumentUrl from '../utils/getDocumentUrl';

async function handler(request: NextRequest) {
  const data = {
    secret: null as string | null,
    tags: null as string | null,
    documentId: null as string | null,
  };

  if (request.method !== 'GET') {
    const body = await request.json();

    data.secret = body.secret;
    data.tags = body.tags;
    data.documentId = body.documentId;
  } else {
    throw new Error('GET method is not allowed to revalidate cache');
  }

  if (data.secret !== speak('cache.secret')) {
    return Response.json('Unauthorized', { status: 401 });
  }

  const { tags } = data;

  tags?.split(',').forEach(revalidateTag);

  if (data.documentId && data.tags && data.tags in speak('templates')) {
    if (getDocumentUrl(data.documentId, data.tags))
      revalidatePath(getDocumentUrl(data.documentId, data.tags));
  }

  return Response.json(
    { message: 'Successfully revalidated tags', tags },
    { status: 200 }
  );
}

export default handler;
