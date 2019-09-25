module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {},
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
  ],
  siteMetadata: {
    title: `Connor Holyday`,
    author: `Connor Holyday`,
    description: `I make stuff on the internet`,
    social: {
      twitter: `https://twitter.com/connorholyday`,
      github: `https://github.com/connorholyday`,
    },
  },
}
