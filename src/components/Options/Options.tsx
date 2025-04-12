import SaveButton from './SaveButton/SaveButton';
import MonacoEditor from './MonacoEditor/MonacoEditor';

import MonacoEditorProvider from './MonacoEditor/provider/MonacoEditorProvider';

import './Options.css';

const Options = () => {
  return (
    <div className="options-root">
      <MonacoEditorProvider>
        <div className="options-container">
          <SaveButton />
        </div>
        <MonacoEditor />
      </MonacoEditorProvider>
    </div>
  );
};

export default Options;
