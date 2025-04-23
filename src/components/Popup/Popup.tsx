import { useState, useEffect, useCallback } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { urlPatterns } from '../../utils/url-patterns';

import type { UrlData } from '../../types/url-data';

import './Popup.css';

const Popup = () => {
  const [urlCount, setUrlCount] = useState(0);

  const settingsIconClick = async () => {
    await chrome.runtime.openOptionsPage();
  };

  useEffect(() => {
    chrome.storage.local.get(null, (data: UrlData) => {
      if (!(Object.keys(data).length === 0)) {
        // filter valid urls to exclude commented lines
        const temp: string[] = data.validUrls.filter(
          (url: string) =>
            !url.startsWith(urlPatterns.doubleSlashCommentStr) &&
            !url.startsWith(urlPatterns.hashCommentStr)
        );

        setUrlCount(Object.keys(temp).length);
      } else {
        setUrlCount(0);
      }
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
              backgroundColor: 'lightgrey',
              borderRadius: '10px',
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
