import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Block URL',
  description: 'Documentation website for Block URL',
  themeConfig: {
    logo: '/icon128.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/what-is-block-url' },
      { text: 'Sponsor / Donate', link: 'sponsor' },
      { text: 'Privacy Policy', link: '/privacy-policy' },
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
        text: 'Development',
        collapsed: false,
        items: [{ text: 'Building the Extension', link: '/building-the-extension' }],
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
        text: 'Help',
        collapsed: false,
        items: [
          {
            text: 'FAQ + Troubleshooting',
            link: '/faq-and-troubleshooting',
          },
          {
            text: 'Issues',
            link: '/issues',
          },
        ],
      },
      {
        text: 'Support Block URL',
        collapsed: false,
        items: [
          {
            text: 'Sponsor / Donate',
            link: '/sponsor',
          },
        ],
      },
      {
        text: 'Privacy Policy',
        collapsed: false,
        items: [
          {
            text: 'Privacy Policy',
            link: '/privacy-policy',
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/alexwkleung/block-url-extension' }],
  },
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/favicon-64.ico' }]],
});
