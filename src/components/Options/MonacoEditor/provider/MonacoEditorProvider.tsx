import { useState } from 'react';
import { MonacoEditorContext } from '../context/MonacoEditorContext';
import type { PropsWithChildren } from 'react';
import type { monaco } from '../monaco/monaco';

export const MonacoEditorProvider = ({ children }: PropsWithChildren) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  return (
    <MonacoEditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </MonacoEditorContext.Provider>
  );
};

export default MonacoEditorProvider;
