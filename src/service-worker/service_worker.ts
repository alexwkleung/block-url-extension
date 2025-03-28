import type { OnMessagePropsRequestServiceWorker } from '../types/on-message-props-request-service-worker';

function service_worker(): void {
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

  chrome.tabs.onUpdated.addListener(
    (tabId: number, tabChangeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
      if (tabChangeInfo.status === 'loading' && tab.url) {
        chrome.tabs
          .sendMessage(tabId, { action: 'tabLoad', url: tab.url })
          .catch((err) => console.debug('[Chrome Tabs]:', err));
      }
    }
  );

  chrome.runtime.onMessage.addListener(
    asyncMessageHandler(
      async (request: OnMessagePropsRequestServiceWorker, sender: chrome.runtime.MessageSender) => {
        if (request.action === 'setError' && sender.tab?.id) {
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
