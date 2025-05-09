# FAQ + Troubleshooting

A list of FAQs and mini troubleshooting guide.

---

1. **Where does my data get stored?**

   - This extension stores the URL data locally on your device.

2. **Why is the `unlimitedStorage` permission enabled?**

   - The `unlimitedStorage` permission is enabled so that there won't be any storage limitations for the extension. Your local device's hard drive is much larger than the allotted 10MB for a Chrome extension and the stored data may exceed that limit if you have a lot of URLs.

3. **Do I need to backup my URLs?**

   - Yes, absolutely. You have to backup your URLs somewhere.
   - For example, if you reinstall the extension, all your URLs will be erased and you have to save them again in the settings.

4. **Are you able to see the URLs in my browser history and visited sites?**

   - No, your browser history and visited sites are only seen by you.
   - The extension will read the data of your tabs (URL, loading state, etc) only. Your browser history or visited sites are unknown to the extension - especially when it comes to the computational logic.

5. **How can I confirm that you're not doing anything suspicious when I visit a URL?**

   - The service worker and content script are responsible for handling the logic that deals with tabs and when a URL is visited. You can view the respective code here:
     - [service_worker.ts](https://github.com/alexwkleung/block-url-extension/blob/main/src/service-worker/service_worker.ts)
     - [content.ts](https://github.com/alexwkleung/block-url-extension/blob/main/src/content/content.ts)
   - Basic overview:

     - `service_worker.ts` runs in the background when the extension is running. It handles displaying the error page and reading your tab data to execute existence logic between the tab URL and storage.
     - `content.ts` handles the document logic on the client, specifically an observer to detect the document state. It communicates with the service worker using messages to execute code.

   - In addition, [url-exists-in-chrome-storage.ts](https://github.com/alexwkleung/block-url-extension/blob/main/src/utils/url-exists-in-chrome-storage.ts) is the utility function used in `service_worker.ts` to determine if the error page should be sent to the client or not.

6. **Why are there are two ways to insert a comment?**

   - Some pasted data may include the `#` for comments and others might use `//`.
   - Portability and simply copy and paste without messing up data.

7. **I put a wildcard (`/*`) after the URL but why doesn't it show the syntax highlighting for it?**

   - To ensure that your wildcard (`/*`) syntax is valid, there shouldn't be any spaces after the asterisk. You can tell if there is trailing whitespace via the rendered whitespace dots.

8. **What are the dots in the editor?**

   - Those are whitespace characters.
   - Rendering of whitespace is enabled so that it makes it easier to detect invalid URLs due to whitespace issues.

9. **How do I save my URLs?**

   - You can save your URLs via one of the following ways:
     - Click the save icon on the top left of the options page.
     - Press `Cmd+S` (macOS) or `Ctrl+S` (Windows/Linux/macOS).

10. **How does the partial keyword pattern work?**

    - To create a partial keyword pattern, you must add `/[<keyword>]` at the end of the URL. `<keyword>` is a single keyword that would match in the path of the URL. You can add more keywords by using the comma (`,`) delimiter for each.
    - Only one keyword can match in the URL path, _not multiple_. This is a limitation but it wasn't intended to allow multiple keywords to be checked in a path. The comma delimited keywords were meant as a shortcut to avoid writing a URL multiple times with the partial keyword pattern. So you would just write the URL and the partial keyword pattern once, then add all the individual keywords that you want to block on the URL path.

11. **Why is saving so slow with lots of URLs?**

    - At the moment, there are no optimization strategies implemented yet for saving. Therefore, everything is saved in one go which becomes inefficient as the number of URLs increases.
    - In the future, there will be optimization strategies in place to mitigate slow saving and UI blocking to improve the user experience.

12. **When I navigate to a blocked URL after saving, why am I still allowed to go to it?**

    - **This could be due to a few reasons (not an extensive list):**
      - URL is invalid.
      - Patterns are incorrect causing an invalid URL.
      - Service worker listeners being inactive. This could happen in either regular browsing or incognito since the service workers are running in separate processes.
      - Extension errors of any kind.
    - **Possible fixes for the above (not an extensive list):**
      - Restart the browser.
      - Close existing window(s) and open a new one.
      - Refresh the extension.
      - Reinstall the extension.
    - The methods used to block URLs are not perfect so you might encounter issues or bugs while using the extension.
