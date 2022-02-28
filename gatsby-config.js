require("dotenv").config();

module.exports = {
  trailingSlash: "always",
  siteMetadata: {
    title: "GatsbyConf Drupal Demo",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `https://dev-gatsbyconf.pantheonsite.io`,
      },
    },
    {
      resolve: `gatsby-source-drupal-menu-links`,
      options: {
        baseUrl: `https://dev-gatsbyconf.pantheonsite.io`,
        menus: ["main"],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
