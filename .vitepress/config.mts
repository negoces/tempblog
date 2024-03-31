import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Neko Blog(Temp)",
  description: "A Temporary Site To Store Blogs",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Posts", link: "/posts/intro" },
    ],

    sidebar: [
      {
        text: "Main",
        items: [
          { text: "Intro", link: "/posts/intro" },
          { text: "Markdown Examples", link: "/posts/markdown-examples" },
        ],
      },
    ],

    footer: {
      message: "CC BY-NC-SA 4.0 | Power By VitePress",
      copyright: "Copyright © 2024-present nekodayo",
    },
    search: {
      provider: "local",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/negoces/" }],
  },
});
