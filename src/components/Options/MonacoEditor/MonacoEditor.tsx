import { useEffect, useRef } from 'react';
import { options } from './options/options';
import { monaco } from './monaco/monaco';
import { initMonacoTheme } from './monaco/init-theme';

import type { RefObject } from 'react';

import './MonacoEditor.css';

const MonacoEditor = () => {
  const monacoEl: RefObject<null> = useRef(null);

  const editorRef: RefObject<monaco.editor.IStandaloneCodeEditor | null> =
    useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (monacoEl.current) {
      editorRef.current = monaco.editor.create(monacoEl.current, options);
      initMonacoTheme();
      editorRef.current?.focus();
    }

    return () => editorRef.current?.dispose();
  }, [monacoEl]);

  return <div className="editor" ref={monacoEl}></div>;
};

export default MonacoEditor;
