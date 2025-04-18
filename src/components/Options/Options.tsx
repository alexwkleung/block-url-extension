import { useEffect, useState } from 'react';
import SaveButton from './SaveButton/SaveButton';
import MonacoEditor from './MonacoEditor/MonacoEditor';

import MonacoEditorProvider from './MonacoEditor/provider/MonacoEditorProvider';

import './Options.css';

const Options = () => {
  const [isPressedKeySave, setIsPressedKeySave] = useState(false);

  useEffect(() => {
    const onKeySave = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === 'KeyS') {
        // prevent the default save document behaviour
        event.preventDefault();

        setIsPressedKeySave(true);
      } else {
        setIsPressedKeySave(false);
      }
    };

    document.addEventListener('keydown', onKeySave);

    return () => {
      document.removeEventListener('keydown', onKeySave);
    };
  }, []);

  return (
    <div className="options-root">
      <MonacoEditorProvider>
        <div className="options-container">
          <SaveButton isPressedKeySave={isPressedKeySave} />
        </div>
        <MonacoEditor />
      </MonacoEditorProvider>
    </div>
  );
};

export default Options;
