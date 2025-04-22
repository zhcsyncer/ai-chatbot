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

Getting started

# Setup

There are two ways to set up the Chat SDK. Deploying with Vercel is the fastest way to get started by having a live deployment up and running, while also being able to develop locally immediately.

### [Use 1-click Deploy with Vercel and Develop Locally](https://chat-sdk.dev/docs/getting-started/setup\#use-1-click-deploy-with-vercel-and-develop-locally)

1. Enter the 1-click deploy flow using this [link](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot&env=AUTH_SECRET&envDescription=Generate%20a%20random%20secret%20to%20use%20for%20authentication&envLink=https%3A%2F%2Fgenerate-secret.vercel.app%2F32&project-name=my-awesome-chatbot&repository-name=my-awesome-chatbot&demo-title=AI%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel&demo-url=https%3A%2F%2Fchat.vercel.ai&products=%5B%7B%22type%22%3A%22integration%22%2C%22protocol%22%3A%22ai%22%2C%22productSlug%22%3A%22grok%22%2C%22integrationSlug%22%3A%22xai%22%7D%2C%7B%22type%22%3A%22integration%22%2C%22protocol%22%3A%22ai%22%2C%22productSlug%22%3A%22api-key%22%2C%22integrationSlug%22%3A%22groq%22%7D%2C%7B%22type%22%3A%22integration%22%2C%22protocol%22%3A%22storage%22%2C%22productSlug%22%3A%22neon%22%2C%22integrationSlug%22%3A%22neon%22%7D%2C%7B%22type%22%3A%22blob%22%7D%5D).
2. Create new project and repository of the Chat SDK
3. Add integrations like Neon Postgres and xAI Grok to your project
4. Clone your repository locally and link to your project using `vc link`
5. Link environment variables using `vc env pull`
6. Continue development locally
7. Push changes and recreate deployment automatically

### [Develop Locally and Deploy Later](https://chat-sdk.dev/docs/getting-started/setup\#develop-locally-and-deploy-later)

1. Fork the Chat SDK repository on GitHub
2. Clone your forked repository locally
3. [Create a PostgreSQL database](https://vercel.com/marketplace/neon) and retrieve its connection string to set the `DATABASE_URL` environment variable in `.env.local`
4. [Create a Vercel Blob store](https://vercel.com/docs/vercel-blob) and set the `BLOB_READ_WRITE_TOKEN` environment variable in `.env.local`
5. [Sign up](https://accounts.x.ai/sign-in) for a developer account on xAI's portal and create a new API key to set the `GROK_API_KEY` environment variable in `.env.local`
6. Install dependencies using `pnpm install`
7. Start development server using `pnpm dev`

[Previous\\
Overview](https://chat-sdk.dev/docs/getting-started/overview) [Next \\
Architecture](https://chat-sdk.dev/docs/getting-started/architecture)