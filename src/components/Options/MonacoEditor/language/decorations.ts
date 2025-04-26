import { monaco } from '../monaco/monaco';

interface DecorationIdentifiers {
  wildcard: string[];
  partialKeyword: string[];
}

export function initMonacoDecorations(editor: monaco.editor.IStandaloneCodeEditor): () => void {
  const decorationIdentifiers: DecorationIdentifiers = {
    wildcard: [],
    partialKeyword: [],
  };

  // helper to ignore comments at the beginning of line content
  const lineContentIgnoreComments = (lineContent: string): boolean => {
    return !lineContent.startsWith('#') && !lineContent.startsWith('//');
  };

  const computeWildcardDecorations = (): void => {
    const model: monaco.editor.ITextModel | null = editor.getModel();
    const decorations: monaco.editor.IModelDeltaDecoration[] = [];
    const lineCount: number | undefined = model?.getLineCount();

    if (lineCount && model) {
      for (let lineNumber: number = 1; lineNumber <= lineCount; lineNumber++) {
        const lineContent: string = model.getLineContent(lineNumber);

        // TODO:
        // validate if lineContent is a url
        if (lineContentIgnoreComments(lineContent) && lineContent.endsWith('/*')) {
          const asteriskIndex = lineContent.length - 1;

          decorations.push({
            range: new monaco.Range(lineNumber, asteriskIndex, lineNumber, asteriskIndex + 2),
            options: {
              inlineClassName: 'wildcard-decoration',
            },
          });
        }
      }

      decorationIdentifiers.wildcard = model.deltaDecorations(
        decorationIdentifiers.wildcard,
        decorations
      );
    }
  };

  const computePartialKeywordDecorations = (): void => {
    const model: monaco.editor.ITextModel | null = editor.getModel();
    const decorations: monaco.editor.IModelDeltaDecoration[] = [];
    const lineCount: number | undefined = model?.getLineCount();

    if (lineCount && model) {
      for (let lineNumber: number = 1; lineNumber <= lineCount; lineNumber++) {
        const lineContent: string = model.getLineContent(lineNumber);

        if (lineContentIgnoreComments(lineContent)) {
          const regex: RegExp = /\/\[(.*?)\]/g;
          let match: RegExpExecArray | null;

          while ((match = regex.exec(lineContent)) !== null) {
            const content: string = match[1];
            const startIndex: number = match.index + 1;

            decorations.push({
              range: new monaco.Range(lineNumber, startIndex, lineNumber, startIndex + 2),
              options: {
                inlineClassName: 'partial-keyword-decoration',
              },
            });

            const segments: string[] = content.split(',');
            let segmentStart: number = startIndex + 2;

            segments.map((segment: string) => {
              const segmentEnd: number = segmentStart + segment.length;

              decorations.push({
                range: new monaco.Range(lineNumber, segmentStart, lineNumber, segmentEnd),
                options: {
                  inlineClassName: 'keyword-decoration',
                },
              });

              segmentStart = segmentEnd + 1;
            });

            const contentEnd: number = segmentStart - 1;
            decorations.push({
              range: new monaco.Range(lineNumber, contentEnd, lineNumber, contentEnd + 1),
              options: {
                inlineClassName: 'partial-keyword-decoration',
              },
            });
          }
        }
      }

      decorationIdentifiers.partialKeyword = model.deltaDecorations(
        decorationIdentifiers.partialKeyword,
        decorations
      );
    }
  };

  // call all decorations in parent function
  const allDecorations = (): void => {
    computeWildcardDecorations();
    computePartialKeywordDecorations();
  };
  allDecorations();

  const listener: monaco.IDisposable = editor.onDidChangeModelContent(allDecorations);

  // return clean up function for listener
  return () => listener.dispose();
}
