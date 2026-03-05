export default defineNuxtConfig({
  ssr: false,
  
  modules: [
    '@nuxt/content'
  ],
  
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    },
    markdown: {
      mdc: true
    }
  },

  app: {
    head: {
      title: 'ZX Blog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A simple blog built with Nuxt.js' },
        { name: 'keywords', content: 'blog, nuxt, vue, javascript' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: [
    '~/assets/css/main.scss'
  ],

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      crawlLinks: true
    }
  }
})
