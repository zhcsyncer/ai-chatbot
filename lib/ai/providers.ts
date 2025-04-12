import {
    customProvider,
} from 'ai';
import {createXai,xai} from '@ai-sdk/xai';
import {createDeepSeek} from '@ai-sdk/deepseek';
import {isTestEnvironment} from '../constants';
import {
    artifactModel,
    chatModel,
    reasoningModel,
    titleModel,
} from './models.test';
import {fetch, ProxyAgent} from "undici";

const ChatModel = createDeepSeek({
    baseURL: 'https://ark.cn-beijing.volces.com/api/v3/',
    apiKey: process.env.VOLC_API_KEY || ''
})
const x = process.env.HTTP_PROXY ? createXai({
    // @ts-ignore
    fetch: (url: any, options: any) => {
        return fetch(url, {
            ...options,
            dispatcher: new ProxyAgent(process.env.HTTP_PROXY as string)
        });
    }
}) : xai

// setGlobalDispatcher(new ProxyAgent('http://127.1:7890'))
//
export const myProvider = isTestEnvironment
    ? customProvider({
        languageModels: {
            'chat-model': chatModel,
            'chat-model-reasoning': reasoningModel,
            'title-model': titleModel,
            'artifact-model': artifactModel,
        },
    })
    : customProvider({
        languageModels: {
            'grok-model': x('grok-3-beta'),
            'chat-model': ChatModel('deepseek-v3-250324'),
            'chat-model-reasoning':ChatModel('deepseek-r1-250120'),
            'title-model': ChatModel('deepseek-v3-250324'),
            'artifact-model': x('grok-2-1212'),
        },
        imageModels: {
            'small-model': x.image('grok-2-image'),
        },
    });
