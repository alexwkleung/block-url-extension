import { useEffect, useRef, useContext } from 'react';
import { options } from './options/options';
import { monaco } from './monaco/monaco';
import { initMonacoTheme } from './monaco/init-theme';
import { MonacoEditorContext } from './context/MonacoEditorContext';
import { initCustomPlainTextLanguage } from './language/custom-plaintext';
import { initMonacoDecorations } from './language/decorations';

import type { RefObject } from 'react';
import type { EditorValue } from '../../../types/url-data';

import './MonacoEditor.css';

const MonacoEditor = () => {
  // initialize custom plaintext language before setting up editor
  initCustomPlainTextLanguage();

  const monacoEl: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const { setEditor } = useContext(MonacoEditorContext);

  useEffect(() => {
    const container: HTMLDivElement | null = monacoEl.current;

    if (!container) return;

    const editorInstance: monaco.editor.IStandaloneCodeEditor = monaco.editor.create(
      container,
      options
    );

    // attempt to set stored editor value if it exists
    chrome.storage.local.get(['editorValue'], (data: EditorValue) => {
      if (!(Object.keys(data).length === 0)) {
        editorInstance.setValue(data.editorValue);
      } else {
        editorInstance.setValue('');
      }
    });

    initMonacoTheme();
    editorInstance.focus();

    initMonacoDecorations(editorInstance);

    setEditor(editorInstance);

    // clean up
    return () => {
      setEditor(null);
      editorInstance.dispose();
      container.replaceChildren();
    };
  }, [setEditor]);

  return <div className="editor-container" ref={monacoEl}></div>;
};

export default MonacoEditor;
