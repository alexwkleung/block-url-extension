import type { OnMessagePropsRequestContent } from '../types/on-message-props-request-content';

function content_script(): void {
  let docObserver: MutationObserver | null = null;

  chrome.runtime.onMessage.addListener(
    (
      request: OnMessagePropsRequestContent,
      _,
      sendResponse: (response?: { received?: boolean; success?: boolean }) => void
    ) => {
      if (request.action === 'tabLoad') {
        sendResponse({ received: true });
        return false;
      }

      if (request.trigger === 'triggerErrorPage') {
        const handleBlockPage: () => void = (): void => {
          if (docObserver) {
            docObserver.disconnect();
            docObserver = null;
          }
          sendResponse({ success: true });

          chrome.runtime.sendMessage({ action: 'errorPage' });
        };

        if (document.readyState === 'complete' && document.body) {
          handleBlockPage();
          return true;
        }

        if (!docObserver) {
          docObserver = new MutationObserver(() => {
            if (document.body) {
              handleBlockPage();
            }
          });

          docObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
          });
        }

        return true;
      }

      sendResponse();
      return false;
    }
  );

  window.addEventListener('pagehide', () => {
    if (docObserver) {
      docObserver.disconnect();
    }
  });
}

content_script();
