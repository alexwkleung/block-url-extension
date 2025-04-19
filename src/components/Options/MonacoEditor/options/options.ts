import type { monaco } from '../monaco/monaco';

export const options: monaco.editor.IStandaloneEditorConstructionOptions | undefined = {
  fontSize: 25,
  language: 'customPlaintext',
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
  contextmenu: false,
  cursorBlinking: 'phase',
  lineNumbers: 'on',
  renderLineHighlight: 'none',
  tabSize: 4,
  renderWhitespace: 'all',
  experimentalWhitespaceRendering: 'off',
  mouseWheelScrollSensitivity: 1.2,
};
