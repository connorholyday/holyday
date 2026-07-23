// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Open Sans",
      cssVariable: "--font-open-sans",
    },
    {
    provider: fontProviders.local(),
    name: "Circular",
    cssVariable: "--font-circular",
    options: {
      variants: [
        {
          src: [
            "./src/assets/fonts/CircularStd-Book.woff2",
            "./src/assets/fonts/CircularStd-Book.woff",
          ],
          weight: '300',
          style: 'normal'
        },
        {
          src: [
            "./src/assets/fonts/CircularStd-BookItalic.woff2",
            "./src/assets/fonts/CircularStd-BookItalic.woff",
          ],
          weight: '300',
          style: 'italic'
        },
        {
          src: [
            "./src/assets/fonts/CircularStd-Medium.woff2",
            "./src/assets/fonts/CircularStd-Medium.woff",
          ],
          weight: '500',
          style: 'normal'
        },
        {
          src: [
            "./src/assets/fonts/CircularStd-MediumItalic.woff2",
            "./src/assets/fonts/CircularStd-MediumItalic.woff",
          ],
          weight: '500',
          style: 'italic'
        },
        {
          src: [
            "./src/assets/fonts/CircularStd-Bold.woff2",
            "./src/assets/fonts/CircularStd-Bold.woff",
          ],
          weight: '700',
          style: 'normal'
        },
        {
          src: [
            "./src/assets/fonts/CircularStd-BoldItalic.woff2",
            "./src/assets/fonts/CircularStd-BoldItalic.woff",
          ],
          weight: '700',
          style: 'italic'
        },
        {
          src: [
            "./src/assets/fonts/CircularStd-Black.woff2",
            "./src/assets/fonts/CircularStd-Black.woff",
          ],
          weight: '800',
          style: 'normal'
        },
        {
          src: [
            "./src/assets/fonts/CircularStd-BlackItalic.woff2",
            "./src/assets/fonts/CircularStd-BlackItalic.woff",
          ],
          weight: '800',
          style: 'italic'
        },
      ]
    }
  }]
});