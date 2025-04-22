[Chat SDK](https://chat-sdk.dev/)

Search…
`/` [GitHub](https://github.com/vercel/ai-chatbot)

- Getting started

- [Overview](https://chat-sdk.dev/docs/getting-started/overview)
- [Setup](https://chat-sdk.dev/docs/getting-started/setup)
- [Architecture](https://chat-sdk.dev/docs/getting-started/architecture)

- Customization

- [Models and Providers](https://chat-sdk.dev/docs/customization/models-and-providers)
- [Artifacts](https://chat-sdk.dev/docs/customization/artifacts)
- [Theming](https://chat-sdk.dev/docs/customization/theming)
- [Fonts](https://chat-sdk.dev/docs/customization/fonts)
- [Testing](https://chat-sdk.dev/docs/customization/testing)

- Migration guides

- [Migrating to Message Parts](https://chat-sdk.dev/docs/migration-guides/message-parts)

- Resources

- [Changelog](https://chat-sdk.dev/docs/resources/changelog)
- [Report an Issue](https://chat-sdk.dev/docs/resources/issue)

Menu

Customization

# Fonts

Customize the typography of your project's user interface.

Chat SDK ships with [Geist](https://vercel.com/font) as the default font family, for both `mono` and `sans` styles.

The easiest way to change the font is to use `next/font` to import the font family and add it to your Tailwind CSS config.

In the example below, we use the font Inter from `next/font/google` (you can use any font from Google or Local Fonts). Load your font with the variable option to define your CSS variable name and assign it to inter. Then, use inter.variable to add the CSS variable to your HTML document.

app/layout.tsx

```font-mono
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
```

Finally, add the CSS variable to your Tailwind CSS config:

tailwind.config.ts

```font-mono
module.exports = {
  content: [\
    './pages/**/*.{js,ts,jsx,tsx}',\
    './components/**/*.{js,ts,jsx,tsx}',\
    './app/**/*.{js,ts,jsx,tsx}',\
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
    },
  },
  plugins: [],
}
```

The updated fonts should now be applied to your project's user interface.

[Previous\\
Theming](https://chat-sdk.dev/docs/customization/theming) [Next \\
Testing](https://chat-sdk.dev/docs/customization/testing)