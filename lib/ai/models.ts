export const DEFAULT_CHAT_MODEL: string = 'chat-model';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Deepseek-V3',
    description: 'Primary model for all-purpose chat',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Deepseek-R1',
    description: 'Uses advanced reasoning',
  },
  {
    id: 'grok-model',
    name: 'Grok3',
    description: 'Uses advanced reasoning',
  },
];
