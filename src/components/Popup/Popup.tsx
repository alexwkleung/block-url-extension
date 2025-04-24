import { useState, useEffect, useCallback } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

import type { UrlData } from '../../types/url-data';

import './Popup.css';

const Popup = () => {
  const [urlCount, setUrlCount] = useState(0);

  const settingsIconClick = async () => {
    await chrome.runtime.openOptionsPage();
  };

  useEffect(() => {
    chrome.storage.local.get(null, (data: UrlData) => {
      const definedValidUrlsSize: number = data.validUrlsSize ?? 0; // if validUrlsSize is null/undefined, return 0

      setUrlCount(definedValidUrlsSize);
    });
  }, []);

  const computedUrlCount = useCallback(() => {
    return urlCount.toString().length > 10 // url count exceeds 10 digits
      ? urlCount.toLocaleString('en-US').substring(0, 13) + '...'
      : urlCount.toLocaleString('en-US');
  }, [urlCount]);

  return (
    <div className="popup-container">
      <div className="blocked-urls-container p-1">
        <div className="blocked-url-count-root text-lg">
          Blocked URLs:
          <div className="blocked-url-count">
            <span className="computed-url-count">{computedUrlCount()}</span>
          </div>
        </div>
      </div>
      <div className="settings-icon flex flex-row-reverse">
        <SettingsIcon
          onClick={async () => await settingsIconClick()}
          sx={{
            '&:hover': {
              backgroundColor: 'var(--button-bg)',
              borderRadius: 'var(--button-border-radius)',
            },
            padding: 'var(--button-padding)',
            fontSize: '30px',
            color: 'var(--default-color)',
          }}
        />
      </div>
    </div>
  );
};

export default Popup;
