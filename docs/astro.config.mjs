// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'minecraft.js',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/drixswe/minecraft.js'
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/E24y7tahTa'
        }
      ],
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English'
        },
        es: {
          label: 'Español'
        }
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: {
            directory: 'basics',
          }
        }
      ],
      expressiveCode: {
        styleOverrides: {
          codeFontFamily: 'JetBrains Mono',
        }
      },
      customCss: [
        './src/styles/custom.css',
        '@fontsource/inter/400.css',
        '@fontsource/inter/600.css',
        '@fontsource/jetbrains-mono/400.css'
      ]
    })
  ]
})
