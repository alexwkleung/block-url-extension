import SaveButton from './SaveButton/SaveButton';
import ClearButton from './ClearButton/ClearButton';
import MonacoEditor from './MonacoEditor/MonacoEditor';

import './Options.css';

const Options = () => {
  return (
    <div className="options-root">
      <div className="options-buttons">
        <SaveButton />
        <ClearButton />
      </div>
      <MonacoEditor />
    </div>
  );
};

export default Options;
