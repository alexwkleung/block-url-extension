export const findWidgetAriaHidden = (editorContainer: HTMLElement) => {
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation: MutationRecord) => {
      if (mutation.type === 'childList') {
        const findWidget: Element | null = editorContainer.querySelector('.find-widget');
        if (findWidget && findWidget.getAttribute('aria-hidden') === 'true') {
          findWidget.setAttribute('aria-hidden', 'false');
        }
      }
    });
  });

  observer.observe(editorContainer, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
};
