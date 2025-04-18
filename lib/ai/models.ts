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
    description: '通用型聊天主要模型',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Deepseek-R1',
    description: '使用高级推理能力',
  },
  {
    id: 'grok-model',
    name: 'Grok3',
    description: '使用高级推理能力',
  },
];
