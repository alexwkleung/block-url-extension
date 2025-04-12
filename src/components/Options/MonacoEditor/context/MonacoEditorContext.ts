import { createContext } from 'react';
import type { monaco } from '../monaco/monaco';

interface MonacoEditorContextType {
  editor: monaco.editor.IStandaloneCodeEditor | null;
  setEditor: (editor: monaco.editor.IStandaloneCodeEditor | null) => void;
}

export const MonacoEditorContext = createContext<MonacoEditorContextType>({
  editor: null,
  setEditor: () => {},
});
