module.exports = {
  siteMetadata: {
    title: `Bruno Viana | Blog pessoal sobre engenharia e desenvolvimento de software`,
    name: `brunoviana.dev`,
    siteUrl: `https://brunoviana.dev`,
    description: `Repositório com todos os aprendizados que tive e venho tendo. Não contém verdades absolutas.`,
    hero: {
      heading: `Repositório de aprendizados. Isento de verdades absolutas.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/brunoviana`,
      },
      {
        name: `github`,
        url: `https://github.com/brunoviana`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/brunoviana`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/brunovianaa/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-plugin-i18n"
    },
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blog brunoviana.dev`,
        short_name: `brunoviana.dev`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-og-images',
    //   options: {
    //     template: 'og',
    //     domain: process.env.GATSBY_DOMAIN,
    //     debug: true
    //   }
    // },
    // {
    //   resolve: `gatsby-plugin-netlify-cms`,
    //   options: {
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-163604579-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        // anonymize: true,
        // Setting this parameter is also optional
        // respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        cookieDomain: "brunoviana.dev",
      },
    },
  ],
};
