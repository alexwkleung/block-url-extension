import type { monaco } from '../monaco/monaco';

export const themeData: monaco.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      token: 'comment',
      foreground: '#6D7A8C',
    },
  ],
  colors: {
    'editor.background': '#1E1E1F',
    'editorCursor.foreground': '#fffded',
    'editor.selectionBackground': '#403e3e',
  },
};
