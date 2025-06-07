// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: 'Inter',
        cssVariable: '--font-inter'
      },
      {
        provider: fontProviders.fontsource(),
        name: 'JetBrains Mono',
        cssVariable: '--font-jetbrains-mono'
      }
    ]
  },
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
            directory: 'basics'
          }
        }
      ],
      expressiveCode: {
        styleOverrides: {
          codeFontFamily: 'JetBrains Mono'
        }
      },
      customCss: ['./src/styles/custom.css'],
      components: {
        Head: './src/components/Head.astro'
      }
    })
  ]
})
