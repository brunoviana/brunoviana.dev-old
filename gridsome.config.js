module.exports = {
  siteName: 'Blog pessoal sobre engenharia e desenvolvimento de software',
  siteDescription: "Bruno Viana | Blog pessoal sobre engenharia e desenvolvimento de software",
  siteUrl: 'https://brunoviana.dev',
  titleTemplate: `%s | brunoviana.dev`,
  icon: 'src/favicon.png',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        ['gridsome-plugin-remark-shiki', {
          theme: 'nord'
        }],
        'remark-autolink-headings',
        'remark-emoji',
        'remark-attr'
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
          author: {
            typeName: 'Author',
            create: true,
          },
        },
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-135446199-1',
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      },
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Bleda, a Gridsome blog starter',
          feed_url: 'https://brunoviana.dev/feed.xml',
          site_url: 'https://brunoviana.dev',
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://brunoviana.dev' + node.path,
          author: node.author,
          date: node.date,
        }),
        output: {
          dir: './static',
          name: 'feed.xml',
        },
      },
    },
  ],

  templates: {
    Post: '/:title',
    Tag: '/tag/:id',
    Author: '/author/:id',
  },

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ])

        return options
      })
  },
}
