import SettingsIcon from '@mui/icons-material/Settings';

const Popup = () => {
  const settingsIconClick = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div>
      <div className="p-1">
        {/*
          <h1 className="popup-heading">Block URL</h1>
          <p className="popup-paragraph text-lg">
            By{' '}
            <a href="https://github.com/alexwkleung" target="_blank">
              alexwkleung
            </a>
          </p>
        */}
        <div className="blocked-url-count-root text-lg">
          Blocked URLs:
          <div className="blocked-url-count">
            <span>{0}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <SettingsIcon
          onClick={settingsIconClick}
          sx={{
            '&:hover': {
              backgroundColor: 'lightgrey',
            },
            padding: '5px',
            fontSize: '30px',
          }}
        />
      </div>
    </div>
  );
};

export default Popup;
