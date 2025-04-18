import { monaco } from '../monaco/monaco';

interface DecorationIdentifiers {
  wildcard: string[];
}

export function initMonacoDecorations(editor: monaco.editor.IStandaloneCodeEditor): () => void {
  const decorationIdentifiers: DecorationIdentifiers = {
    wildcard: [],
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
        if (
          !lineContent.startsWith('#') &&
          !lineContent.startsWith('//') &&
          lineContent.endsWith('/*')
        ) {
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

  // call all decorations in parent function
  const allDecorations = (): void => {
    computeWildcardDecorations();
  };
  allDecorations();

  const listener: monaco.IDisposable = editor.onDidChangeModelContent(allDecorations);

  // return clean up function for listener
  return () => listener.dispose();
}
