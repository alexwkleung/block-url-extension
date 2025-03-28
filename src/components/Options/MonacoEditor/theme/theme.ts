import type { monaco } from '../monaco/monaco';

export const themeData: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.background': '#1E1E1F',
    'editorCursor.foreground': '#fffded',
    'editor.selectionBackground': '#403e3e',
  },
};
