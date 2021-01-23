import queries from "../src/utils/algolia-queries"

export default {
  siteMetadata: {
    title: `D.Horiyama's output`,
    author: {
      name: `D.Horiyama`,
      summary: `シャロちゃんすき`,
    },
    description: `勉強記録など`,
    siteUrls: {
      github: `https://github.com/wand2016/`,
    },
    social: {
      twitter: `d_horiyama_web`,
    },
    certifications: [
      {
        name: "ITパスポート",
        since: "2016-09-14",
      },
      {
        name: "基本情報技術者",
        since: "2016-11-14",
      },
      {
        name: "応用情報技術者",
        since: "2017-06-21",
      },
      {
        name: "HTML5 Professional level 1",
        since: "2017-10-28",
      },
      {
        name: "日商簿記 2級",
        since: "2017-11-09",
      },
      {
        name: "HTML5 Professional level 2",
        since: "2018-02-03",
        until: "2023-02-03",
      },
      {
        name: "UMTP認定試験 level 1",
        since: "2018-03-24",
      },
      {
        name: "UMTP認定試験 level 2",
        since: "2018-04-28",
      },
      {
        name: "LPIC 101/102",
        since: "2019-04-20",
      },
      {
        name: "AWS Certified Solution Architect Associate",
        since: "2019-06-01",
        until: "2022-06-01",
        embed:
          '<div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="f57fef30-813e-4c92-bfab-a10555dd78f8" data-share-badge-host="https://www.youracclaim.com"></div>',
      },
      {
        name: "OSS-DB silver",
        since: "2020-01-26",
      },
      {
        name: "OSS-DB gold",
        since: "2020-03-01",
        until: "2025-03-01",
      },
      {
        name: "AWS Certified Developer Associate",
        since: "2020-03-20",
        until: "2023-03-20",
        embed:
          '<div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="49ee6b32-f45d-4ffd-ae0f-ec87e66c2a10" data-share-badge-host="https://www.youracclaim.com"></div>',
      },
      {
        name: "AWS Certified SysOps Administrator Associate",
        since: "2020-04-05",
        until: "2023-04-05",
        embed:
          '<div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="d4f87421-0968-4220-8c99-f13a39bd72e1" data-share-badge-host="https://www.youracclaim.com"></div>',
      },
      {
        name: "Oracle認定 MySQL5.6 Developer",
        since: "2020-06-05",
        embed:
          '<div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="a2e7e0e7-df59-49c3-bf75-bf6e595c62f6" data-share-badge-host="https://www.youracclaim.com"></div>',
      },
      {
        name: "CCNA",
        since: "2020-07-04",
        until: "2023-07-04",
        embed:
          '<div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="b283a0e9-ea4c-4603-bf18-434ce55bcb20" data-share-badge-host="https://www.youracclaim.com"></div>',
      },
      {
        name: "CG検定/CGエンジニアベーシック",
        since: "2020-12-24",
      },
      {
        name: "CG検定/Webデザイナーベーシック",
        since: "2020-12-24",
      },
      {
        name: "LPIC 201/202",
        since: "2021-01-09",
        until: "2025-12-27",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../content/blog/`,
        name: `blog`,
        ignore: [
          `**/\.*`, // ignore files starting with a dot
          `**/\.*/**`, // ignore files in dot directory
          `**/flycheck*`, // generated by emacs
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../content/assets`,
        name: `assets`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {
                bat: "batch",
                env: "bash",
                sh: "shell",
                tf: "hcl",
              },
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `30`,
              icon: false,
              className: `remark-autolink-headers`,
              maintainCase: false,
            },
          },
          `gatsby-remark-external-links`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // `gatsby-plugin-no-javascript`,
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        outputPath: `types/graphql-types.d.ts`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: queries,
      },
    },
    `gatsby-plugin-styled-components`,
  ],
}
