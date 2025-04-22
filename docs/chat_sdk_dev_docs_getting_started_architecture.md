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

# Architecture

A quick overview of the different parts of the Chat SDK

The Chat SDK is powered by several open source libraries to support the different functionalities of the chatbot application like authentication, persistence, text generation, etc. The following is a brief overview of the architecture.

![](https://chat-sdk.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Farch-simple.c2240b04.png&w=3840&q=75&dpl=dpl_8eUdZGH7UjLvFVViQStL376NVgyY)

## [Application Framework](https://chat-sdk.dev/docs/getting-started/architecture\#application-framework)

The Chat SDK is built to run fast on the web, so it is powered by [Next.js](http://next.org/). It uses the [App Router](https://nextjs.org/docs/app) with two main route segments – `(chat)/` and `(auth)/`. The api endpoints are located in the `api/` folder of each route segment as [route handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) which gets converted into serverless functions upon deployment.

## [Model Providers](https://chat-sdk.dev/docs/getting-started/architecture\#model-providers)

The primary user experience of the chatbot application is to simulate a conversation with a model that exhibits near [general intelligence](https://en.wikipedia.org/wiki/Artificial_general_intelligence) and can respond to user queries to help accomplish a task. The Chat SDK uses the [AI SDK](https://sdk.vercel.ai/) to connect to these models deployed by [various providers](https://sdk.vercel.ai/providers/ai-sdk-providers).

Language Models are the most primitive types of models used in the application. It is used for generating [text](https://sdk.vercel.ai/docs/ai-sdk-core/generating-text) and [structured data](https://sdk.vercel.ai/docs/ai-sdk-core/generating-structured-data). The AI SDK ships with many features that you can use to amplify your usage of these models like [Tool Use](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot-tool-usage), [Retrieval Augmented Generation](https://sdk.vercel.ai/cookbook/node/retrieval-augmented-generation), [Reasoning](https://sdk.vercel.ai/docs/ai-sdk-ui/chatbot#reasoning), etc. Image Models and Embedding Models are the other types of models that can be used in the application, like for image generation and document retrieval, respectively.

One of the main advantages of using the AI SDK is that it allows you to be specific with the kind of model and provider you'd like to use in a specific part of the application. You can learn more about it in the [Models and Providers](https://chat-sdk.dev/docs/concepts/models-and-providers) section.

## [Authentication](https://chat-sdk.dev/docs/getting-started/architecture\#authentication)

The Chat SDK uses [Auth.js](https://authjs.dev/) for authentication. The Chat SDK requires authentication by default to start new chats and also save them in history.

## [Persistence](https://chat-sdk.dev/docs/getting-started/architecture\#persistence)

Persistence is the ability to save and restore data from a database. The Chat SDK uses PostgreSQL as its database to store things like chat history, user accounts, application-wide administrative settings, etc. In order to communicate with the database from route handlers and server actions, the Chat SDK uses [Drizzle ORM](https://orm.drizzle.team/) to connect to the database and run [queries](https://github.com/vercel/ai-chatbot/blob/main/lib/db/queries.ts).

Since Drizzle ORM supports multiple [database providers](https://orm.drizzle.team/docs/get-started) like [Neon](https://orm.drizzle.team/docs/get-started/neon-new) and [Supabase](https://orm.drizzle.team/docs/get-started/supabase-new), it makes it possible for you to swap between databases of your choice without having to modify your queries or schema.

## [Blob Storage](https://chat-sdk.dev/docs/getting-started/architecture\#blob-storage)

Blob storage allows your chatbot application to support file uploads to and retrievals from an object store. The Chat SDK uses [Vercel Blob](https://vercel.com/docs/vercel-blob) to support sending files as attachments in a chat conversation. It can also be used for storing static assets that serve different purposes like uploading an avatar for a user's profile page.

## [Firewall and Rate Limiting](https://chat-sdk.dev/docs/getting-started/architecture\#firewall-and-rate-limiting)

The API endpoints that the Chat SDK uses have a higher runtime duration and process expensive model tokens (depending on the model). So, any abuse or bot attacks on these endpoints can rack up significant costs quickly. As a result, it is recommended to enable the Vercel Firewall and add rate limiting rules to endpoints like `/api/chat`.

Alternatively, you can use also use a key value store to track requests and define thresholds to limit usage, you can read more about it [here](https://sdk.vercel.ai/docs/advanced/rate-limiting#rate-limiting).

## [Testing](https://chat-sdk.dev/docs/getting-started/architecture\#testing)

The Chat SDK uses playwright to run E2E tests to simulate the possible user flows in the application and identify any breaking changes as you customize the application. The Chat SDK ships with a few test cases for the most important user flows and we're constantly working on improving the coverage. You can learn more about adding a new test case in the [Testing](https://chat-sdk.dev/docs/concepts/testing) section.

## [A Closer Look at the Chatbot](https://chat-sdk.dev/docs/getting-started/architecture\#a-closer-look-at-the-chatbot)

![](https://chat-sdk.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Farch-complex.45ea4a4b.png&w=3840&q=75&dpl=dpl_8eUdZGH7UjLvFVViQStL376NVgyY)

**1\. Initial Navigation to Home Page:**

- When the user first navigates to the home page and goes through Next.js middleware.
- The middleware checks session status:
  - If no session is found, the user is redirected to `/login`, authenticating the user with email and password via the `/api/auth` endpoint.
  - If a session is available, the user reaches the chat interface with their history restored in the sidebar.

**2\. Sending a Message:**

- User composes and submits a message within the chat interface.
- Optionally, the user can attach files, which uploads via `/api/files/upload`, storing the file in Vercel Blob storage. Attachments become accessible through secure URLs returned by Vercel Blob.
- Upon submission, the `append` function from the `useChat` hook triggers the `/api/chat` endpoint
- After passing the Vercel firewall and its rate limit rules, the message payload is sent to `/api/chat`.

**3\. Processing and Model Interaction:**

- The request to `/api/chat` routes to a custom model provider, which specifies which models to use for specific parts of the applcation. In this instance, there is one model for title generation and another for chat completion.
- Using the AI SDK's `streamText` function, the chat model is then prompted with the submitted `messages` and returns the response as a [data stream](https://sdk.vercel.ai/docs/ai-sdk-ui/stream-protocol#data-stream-protocol).
- The `useChat` hook on the client reads the data stream and constructs the response to be rendered as assistant messages to the user.
- The response messages, now visible to the user, appears within the chat interface.

**4\. Persisting Response Messages:**

- After the stream has finished, the `onFinish` callback is triggered and saves the response messages to the database.

**5\. User Interaction with Message:**

- The user can then interact with any of the messages present in the history, performing actions like voting and editing.

[Previous\\
Setup](https://chat-sdk.dev/docs/getting-started/setup) [Next \\
Models and Providers](https://chat-sdk.dev/docs/customization/models-and-providers)