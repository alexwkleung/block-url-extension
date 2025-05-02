import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Block URL',
  description: 'Documentation for Block URL',
  themeConfig: {
    logo: '/assets/icon128.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/what-is-block-url' },
      { text: 'Sponsor / Donate', link: 'https://ko-fi.com/alexwkleung' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          {
            text: 'What is Block URL?',
            link: '/what-is-block-url',
          },
          {
            text: 'Tech Stack',
            link: '/tech-stack',
          },
          {
            text: 'License',
            link: '/extension-license',
          },
        ],
      },
      {
        text: 'Install',
        collapsed: false,
        items: [{ text: 'Install the Extension', link: '/install' }],
      },
      {
        text: 'Usage',
        collapsed: false,
        items: [
          {
            text: 'Using the Extension',
            link: '/using-the-extension',
          },
          {
            text: 'Supported URL Patterns',
            link: '/supported-url-patterns',
          },
          {
            text: 'Ignoring URLs',
            link: '/ignoring-urls',
          },
        ],
      },
      {
        text: 'Development',
        collapsed: false,
        items: [{ text: 'Building the Extension', link: '/building-the-extension' }],
      },
      {
        text: 'Help',
        collapsed: false,
        items: [
          {
            text: 'Frequently Asked Questions',
            link: '/frequently-asked-questions',
          },
          {
            text: 'Issues',
            link: '/issues',
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/alexwkleung/block-url-extension' }],
  },
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/favicon-64.ico' }]],
});
