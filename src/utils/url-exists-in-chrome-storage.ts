import { urlMatch } from './url-match';

import type { ValidUrls } from '../types/url-data';

let validUrlRef: string[] = [];
let isCacheInitialized: boolean = false;

// refresh cache helper
const refreshCache: () => Promise<void> = async (): Promise<void> => {
  try {
    chrome.storage.local.get('validUrls', (data: ValidUrls) => {
      validUrlRef = data.validUrls;

      isCacheInitialized = true;
    });
  } catch (err) {
    console.error('[Cache]: Cache refresh failed');
    throw err;
  }
};

// helper that auto refreshes cache every 5 minutes
const autoRefreshCache: () => void = (): void => {
  const cacheInterval: number = 5 * 60 * 1000;

  let refreshTimer: number | null = null;

  if (refreshTimer === null) {
    refreshTimer = setInterval(async () => {
      await refreshCache();

      console.debug('[Cache]: Cache auto-refreshed.');
    }, cacheInterval);
  }
};

chrome.storage.onChanged.addListener(
  async (
    changes: {
      [key: string]: chrome.storage.StorageChange;
    },
    areaName: 'local' | 'sync' | 'managed' | 'session'
  ): Promise<boolean> => {
    if (changes.validUrls && areaName === 'local') {
      await refreshCache();

      console.debug('[Cache]: Cache auto refreshed.');
    }

    return true;
  }
);

export async function urlExistsInChromeStorage(url: string): Promise<boolean> {
  let initPromise: Promise<void> | null = null;

  if (!isCacheInitialized && !initPromise) {
    initPromise = refreshCache()
      .then(autoRefreshCache)
      .catch((err) => {
        initPromise = null;

        throw new Error('[Cache]: ' + err);
      });

    await initPromise;
  }

  return urlMatch(url, validUrlRef);
}
