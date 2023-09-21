import {loadConfig} from "./loadConfig";
export default function getPathname(document: any, type?:string) {

  let postType;

  if (type) {
    postType = type;
  } else if (document?._type) {
    // This may be a Sanity document
    postType = document._type;
  } else {
    // Throw an Error if we can't determine the type
    throw new Error('Could not determine the type of the document. It must be present in the document or passed as an argument.');
  }
  
  return loadConfig().templates[postType].toUrl(document);

}