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

# Theming

Personalize the colors, spacing, and shapes of your project's user interface.

Chat SDK uses [Tailwind](https://tailwindcss.com/) for styling and [shadcn/ui](https://ui.shadcn.com/) for components. Since most of the components used in the Chat SDK like buttons and inputs are built using shadcn/ui primitives, you can collectively customize the appearance of the components to follow the theme of your application by modifying the CSS variables in `app/global.css`.

## [Convention](https://chat-sdk.dev/docs/customization/theming\#convention)

You can use a simple `background` and `foreground` convention for colors. The `background` variable is used for the background color of the component and the `foreground` variable is used for the text color.

The `background` suffix is omitted when the variable is used for the background color of the component.

Given the following CSS variables:

```font-mono
--primary: 240 5.9% 10%;
--primary-foreground: 0 0% 98%;
```

The `background` color of the following component will be `var(--primary)` and the `foreground` color will be `var(--primary-foreground)`.

```font-mono
<div className="bg-primary text-primary-foreground">Hello</div>
```

## [List of variables](https://chat-sdk.dev/docs/customization/theming\#list-of-variables)

Here's the list of variables available for customization:

app/globals.css

```font-mono
@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 240 10% 3.9%;
        --card: 0 0% 100%;
        --card-foreground: 240 10% 3.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 240 10% 3.9%;
        --primary: 240 5.9% 10%;
        --primary-foreground: 0 0% 98%;
        --secondary: 240 4.8% 95.9%;
        --secondary-foreground: 240 5.9% 10%;
        --muted: 240 4.8% 95.9%;
        --muted-foreground: 240 3.8% 46.1%;
        --accent: 240 4.8% 95.9%;
        --accent-foreground: 240 5.9% 10%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 5.9% 90%;
        --input: 240 5.9% 90%;
        --ring: 240 10% 3.9%;
        --chart-1: 12 76% 61%;
        --chart-2: 173 58% 39%;
        --chart-3: 197 37% 24%;
        --chart-4: 43 74% 66%;
        --chart-5: 27 87% 67%;
        --radius: 0.5rem;
        --sidebar-background: 0 0% 98%;
        --sidebar-foreground: 240 5.3% 26.1%;
        --sidebar-primary: 240 5.9% 10%;
        --sidebar-primary-foreground: 0 0% 98%;
        --sidebar-accent: 240 4.8% 95.9%;
        --sidebar-accent-foreground: 240 5.9% 10%;
        --sidebar-border: 220 13% 91%;
        --sidebar-ring: 217.2 91.2% 59.8%;
    }
    .dark {
        --background: 240 10% 3.9%;
        --foreground: 0 0% 98%;
        --card: 240 10% 3.9%;
        --card-foreground: 0 0% 98%;
        --popover: 240 10% 3.9%;
        --popover-foreground: 0 0% 98%;
        --primary: 0 0% 98%;
        --primary-foreground: 240 5.9% 10%;
        --secondary: 240 3.7% 15.9%;
        --secondary-foreground: 0 0% 98%;
        --muted: 240 3.7% 15.9%;
        --muted-foreground: 240 5% 64.9%;
        --accent: 240 3.7% 15.9%;
        --accent-foreground: 0 0% 98%;
        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 3.7% 15.9%;
        --input: 240 3.7% 15.9%;
        --ring: 240 4.9% 83.9%;
        --chart-1: 220 70% 50%;
        --chart-2: 160 60% 45%;
        --chart-3: 30 80% 55%;
        --chart-4: 280 65% 60%;
        --chart-5: 340 75% 55%;
        --sidebar-background: 240 5.9% 10%;
        --sidebar-foreground: 240 4.8% 95.9%;
        --sidebar-primary: 224.3 76.3% 48%;
        --sidebar-primary-foreground: 0 0% 100%;
        --sidebar-accent: 240 3.7% 15.9%;
        --sidebar-accent-foreground: 240 4.8% 95.9%;
        --sidebar-border: 240 3.7% 15.9%;
        --sidebar-ring: 217.2 91.2% 59.8%;
    }
}
```

[Previous\\
Artifacts](https://chat-sdk.dev/docs/customization/artifacts) [Next \\
Fonts](https://chat-sdk.dev/docs/customization/fonts)