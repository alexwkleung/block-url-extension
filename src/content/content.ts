import type { OnMessagePropsRequestContent } from '../types/on-message-props-request-content';

function content_script(): void {
  chrome.runtime.onMessage.addListener((request: OnMessagePropsRequestContent): boolean => {
    if (request.action === 'tabLoad') {
      console.log(request.url);

      // document is already cached in browser when visiting site, skip mutation observer
      if (document.readyState === 'complete' && document.body) {
        chrome.runtime.sendMessage({ action: 'setError' });
        // document is not cached in browser, use mutation observer
      } else {
        const observer = new MutationObserver((_, mo) => {
          if (document.body) {
            mo.disconnect();
            chrome.runtime.sendMessage({ action: 'setError' });
          }
        });

        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
        });
      }
    }

    return true;
  });
}
content_script();
