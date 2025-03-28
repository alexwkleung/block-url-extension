import type { monaco } from '../monaco/monaco';

export const options: monaco.editor.IStandaloneEditorConstructionOptions | undefined = {
  fontSize: 25,
  language: 'plaintext',
  minimap: {
    enabled: false,
  },
  theme: 'vs-dark',
  automaticLayout: true,
  inlayHints: {
    enabled: 'off',
  },
  snippetSuggestions: 'none',
  wordBasedSuggestions: 'off',
  occurrencesHighlight: 'off',
  selectionHighlight: false,
  folding: false,
  smoothScrolling: true,
  cursorSmoothCaretAnimation: 'on',
  cursorWidth: 3,
  contextmenu: false,
  cursorBlinking: 'phase',
  lineNumbers: 'on',
  renderLineHighlight: 'none',
  tabSize: 2,
};
