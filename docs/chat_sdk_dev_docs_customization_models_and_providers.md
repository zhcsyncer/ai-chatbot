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

# Models and Providers

Switch between different models and providers.

Chat SDK ships with [xAI](https://sdk.vercel.ai/providers/ai-sdk-providers/xai) as the default model provider. Since Chat SDK is powered by the [AI SDK](https://sdk.vercel.ai/), which supports [multiple providers](https://sdk.vercel.ai/providers/ai-sdk-providers) out of the box, you can always switch to a different provider of your choice, anytime.

To update the models, you will need to update the custom provider called `myProvider` at `/lib/ai/models.ts` shown below.

```font-mono
import { customProvider } from "ai";
import { xai } from "@ai-sdk/xai";

export const myProvider = customProvider({
  languageModels: {
    "chat-model": xai("grok-2-1212"),
    "chat-model-reasoning": wrapLanguageModel({
      model: xai('grok-3-mini-beta'),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": xai("grok-2-1212"),
    "artifact-model": xai("grok-2-1212"),
  },
  imageModels: {
    "small-model": xai.image("grok-2-image"),
  },
});
```

You can replace the `xai` models with any other provider of your choice. You will need to install the provider library and switch the models accordingly.

For example, if you want to use Anthropic's `claude-3-5-sonnet` model for `chat-model-large`, you can replace the `xai` model with the `anthropic` model as shown below.

```font-mono
import { customProvider } from "ai";
import { xai } from "@ai-sdk/xai";
import { anthropic } from "@ai-sdk/anthropic";

export const myProvider = customProvider({
  languageModels: {
    "chat-model": anthropic("claude-3-5-sonnet"), // Replace with anthropic model
    "chat-model-reasoning": wrapLanguageModel({
      model: xai('grok-3-mini-beta'),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": xai("grok-2-1212"),
    "artifact-model": xai("grok-2-1212"),
  },
  imageModels: {
    "small-model": xai.image("grok-2-image"),
  },
});
```

You can find the provider library and model names in the [provider](https://sdk.vercel.ai/providers/ai-sdk-providers)'s documentation. Once you have updated the models, you should be able to use the new models in your chatbot.

[Previous\\
Architecture](https://chat-sdk.dev/docs/getting-started/architecture) [Next \\
Artifacts](https://chat-sdk.dev/docs/customization/artifacts)