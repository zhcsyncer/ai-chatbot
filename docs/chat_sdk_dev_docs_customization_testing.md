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

# Testing

Simulate end-to-end user interactions and validate their results.

Testing your Chat SDK application involves two key components:

- **E2E Tests**: End-to-end tests simulate the full lifecycle of the application, from user interactions to server responses.
- **Mock Models**: Mock language models simulate responses based on different prompts.

## [End-to-End Testing With Playwright](https://chat-sdk.dev/docs/customization/testing\#end-to-end-testing-with-playwright)

Chat SDK ships with [Playwright](https://playwright.dev/) for end-to-end testing. Playwright is a powerful tool for automating web browsers and testing web applications, so it's a great choice for testing your Chat SDK application as well. Playwright also provides a simple API for writing tests, and it supports multiple browsers, including Chrome, Firefox, and WebKit.

Your project already comes with a set of tests that check the basic functionality of the Chat SDK. These tests can be found in the `tests` directory of your project.

Along with these tests, there are also a few helper classes that you can use to make your tests more readable and maintainable. These classes provide a set of common actions that you can use to interact with the Chat SDK application, such as logging in, creating a new chat, and sending a message. These helper classes are located in the `tests/pages` directory of your project.

### [Writing a Test](https://chat-sdk.dev/docs/customization/testing\#writing-a-test)

The following is an example of a test that uses the helper classes to create a new chat and send a message.

tests/chat.test.ts

```font-mono
import { ChatPage } from './pages/chat';
import { test, expect } from '@playwright/test';

test.describe('chat activity', () => {
  let chatPage: ChatPage;

  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPage(page);
    await chatPage.createNewChat();
  });

  test('send a user message and receive response', async () => {
    await chatPage.sendUserMessage('Why is grass green?');
    await chatPage.isGenerationComplete();

    const assistantMessage = await chatPage.getRecentAssistantMessage();
    expect(assistantMessage.content).toContain("It's just green duh!");
  });
});
```

### [Creating Mock Models](https://chat-sdk.dev/docs/customization/testing\#creating-mock-models)

Testing language models can be challenging, because they are non-deterministic and calling them is slow and expensive.

Chat SDK uses a test provider with mock models to simulate the behavior of the different language models. These models are defined in `lib/ai/models.test.ts`.

lib/ai/models.test.ts

```font-mono
import { simulateReadableStream } from 'ai';
import { MockLanguageModelV1 } from 'ai/test';
import { getResponseChunksByPrompt } from '@/tests/prompts/utils';

export const chatModel = new MockLanguageModelV1({
  doStream: async ({ prompt }) => ({
    stream: simulateReadableStream({
      chunkDelayInMs: 50,
      initialDelayInMs: 100,
      chunks: getResponseChunksByPrompt(prompt),
    }),
    rawCall: { rawPrompt: null, rawSettings: {} },
  }),
});
```

You also have the ability to define the response outputs based on the input prompt. This allows you to test different capabilities like tool calling, artifacts, reasoning, etc. You can define the response outputs in `tests/prompts/utils.ts`.

tests/prompts/utils.ts

```font-mono
if (compareMessages(recentMessage, TEST_PROMPTS.USER_SKY)) {
  return [\
    ...reasoningToDeltas('The sky is blue because of rayleigh scattering!'),\
    ...textToDeltas("It's just blue duh!"),\
    {\
      type: 'finish',\
      finishReason: 'stop',\
      logprobs: undefined,\
      usage: { completionTokens: 10, promptTokens: 3 },\
    },\
  ];
}
```

[Previous\\
Fonts](https://chat-sdk.dev/docs/customization/fonts) [Next \\
Migrating to Message Parts](https://chat-sdk.dev/docs/migration-guides/message-parts)