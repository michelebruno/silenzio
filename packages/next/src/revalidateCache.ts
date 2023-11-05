import type { NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { speak } from "@silenzio/core";
import { getDocumentUrl } from "@silenzio/core"; 
import { isDebugMode } from "@silenzio/core/utils";

  
async function handler(request: NextRequest) {
  const data = { 
    secret: null as string | null,
    tags: null as string | null,
    documentId: null as string | null,
  };

  if (request.method !== "GET") {
    const body = await request.json();

    data.secret = body.secret;
    data.tags = body.tags;
    data.documentId = body.documentId;
  } else {
    throw new Error("GET method is not allowed to revalidate cache");
  }
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  if (!data.secret) {
    return Response.json("No token provided", { status: 401, headers });
  }

  if (data.secret !== speak("cache.secret")) {
    return Response.json("Unauthorized", { status: 401, headers });
  }

  const { tags } = data;

  tags?.split(",").forEach((tag) => {
    revalidateTag(tag);
  });

  if (data.documentId && data.tags && data.tags in speak("templates")) {
    if (getDocumentUrl(data.documentId, data.tags)) {
      const url = getDocumentUrl(data.documentId, data.tags);
      if (isDebugMode()) revalidatePath(url);
    }
  }

  return Response.json(
    { message: "Successfully revalidated tags", tags },
    { status: 200, headers }
  );
}

export default handler;
