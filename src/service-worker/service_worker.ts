import { urlExistsInChromeStorage } from '../utils/url-exists-in-chrome-storage';

import type { OnMessagePropsRequestServiceWorker } from '../types/on-message-props-request-service-worker';

function service_worker(): void {
  // async message handler
  const asyncMessageHandler = (
    handler: (
      request: OnMessagePropsRequestServiceWorker,
      sender: chrome.runtime.MessageSender
    ) => Promise<string>
  ) => {
    return (
      request: OnMessagePropsRequestServiceWorker,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: { success: boolean; result?: unknown; error?: string }) => void
    ) => {
      handler(request, sender)
        .then((result) => sendResponse({ success: true, result }))
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true;
    };
  };

  // cache to hold current processed tabs
  const currProcessedTabsCache: Set<number> = new Set();

  // tab status is loading
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading' && tab.url && !currProcessedTabsCache.has(tabId)) {
      // during load, add the current tab to cache
      currProcessedTabsCache.add(tabId);

      await urlExistsInChromeStorage(tab.url).then((exists) => {
        if (exists) {
          chrome.tabs
            .sendMessage(tabId, {
              action: 'actionBlockPage',
              trigger: 'triggerErrorPage',
              url: tab.url,
            })
            .catch((err) => {
              console.debug(err);
            });
        }
      });

      // once tab is processed, delete it from cache
      currProcessedTabsCache.delete(tabId);
    }
  });

  // request is error page
  chrome.runtime.onMessage.addListener(
    asyncMessageHandler(
      async (request: OnMessagePropsRequestServiceWorker, sender: chrome.runtime.MessageSender) => {
        if (request.action === 'errorPage' && sender.tab?.id) {
          await chrome.tabs.update(sender.tab.id, {
            url: chrome.runtime.getURL('error.html'),
          });
        }
        throw new Error('[Async Message Handler]: Unable to handle async message');
      }
    )
  );
}
service_worker();
