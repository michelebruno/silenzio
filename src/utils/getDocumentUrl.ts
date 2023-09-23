import speak from './speak';

export default function getDocumentUrl(
  document: Silenzio.Document,
  type?: string
) {
  let postType;

  if (type) {
    postType = type;
  } else if (document?._type) {
    // This may be a Sanity document
    postType = document._type;
  } else {
    // Throw an Error if we can't determine the type
    throw new Error(
      'Could not determine the type of the document. It must be present in the document or passed as an argument.'
    );
  }

  const templates: Silenzio.Config['templates'] = speak('templates');

  if (templates && templates[postType]) {
    return templates[postType]?.toUrl(document);
  }

  throw new Error(`Could not find a template for the post type ${postType}.`);
}
