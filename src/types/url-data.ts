export interface UrlData {
  editorValue: string;
  validUrls: string[];
}

export type ValidUrls = { validUrls: UrlData['validUrls'] };
export type EditorValue = { editorValue: UrlData['editorValue'] };
