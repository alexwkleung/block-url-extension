export interface UrlData {
  editorValue: string;
  validUrls: string[];
  validUrlsSize: number | null;
}

export type ValidUrls = { validUrls: UrlData['validUrls'] };
export type EditorValue = { editorValue: UrlData['editorValue'] };
