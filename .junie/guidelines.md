# Next.js AI 聊天机器人项目指南

## 项目概述
这是一个使用 Next.js 和 Vercel 的 AI SDK 构建的开源 AI 聊天机器人模板。该项目为创建 AI 驱动的聊天应用程序提供了基础，具有以下特点：

- Next.js App Router 用于高级路由和导航
- AI SDK 用于生成文本和构建聊天界面
- 支持多种 LLM 提供商（xAI、OpenAI、Anthropic 等）
- 来自 shadcn/ui 的 UI 组件，使用 Tailwind CSS 样式
- 使用 Vercel Postgres 和 Vercel Blob 进行数据持久化
- 通过 NextAuth.js 进行身份验证

## 项目结构

### 核心目录
- `app/` - Next.js App Router 结构，包含 React 服务器组件
  - `app/(auth)/` - 认证相关路由和页面，处理用户登录注册
  - `app/(chat)/` - 聊天相关路由和页面，包含主要的聊天功能
  - `app/layout.tsx` - 应用根布局组件
  - `app/globals.css` - 全局样式定义

- `components/` - 可重用的 UI 组件
  - `components/ui/` - 基础UI组件库，基于shadcn/ui构建
  - `components/chat.tsx` - 主聊天界面组件
  - `components/message.tsx` - 聊天消息组件
  - `components/message-editor.tsx` - 消息编辑器组件
  - `components/code-block.tsx` & `components/code-editor.tsx` - 代码展示和编辑组件
  - `components/sheet-editor.tsx` - 电子表格编辑器组件
  - `components/text-editor.tsx` - 文本编辑器组件
  - `components/create-artifact.tsx` - 创建工件组件
  - `components/artifact-*.tsx` - 工件相关组件系列
  - `components/sidebar-*.tsx` - 侧边栏相关组件系列
  - `components/model-selector.tsx` - AI模型选择器组件
  - `components/multimodal-input.tsx` - 多模态输入组件

- `lib/` - 实用函数和共享代码
  - `lib/ai/` - AI功能相关代码，包括模型集成和配置
  - `lib/db/` - 数据库模型、迁移脚本和查询函数
  - `lib/editor/` - 编辑器相关工具和配置
  - `lib/artifacts/` - 工件类型定义和处理逻辑
  - `lib/utils.ts` - 通用工具函数
  - `lib/constants.ts` - 应用常量定义

- `artifacts/` - 工件类型实现
  - `artifacts/sheet/` - 电子表格工件实现
  - 其他工件类型实现...

- `hooks/` - 自定义React Hooks
  - 提供状态管理和功能复用的钩子函数

- `public/` - 静态资源文件
  - 包含图像、图标和其他静态资源

### 配置和构建文件
- `next.config.ts` - Next.js配置文件
- `tailwind.config.ts` - Tailwind CSS配置
- `drizzle.config.ts` - Drizzle ORM配置
- `playwright.config.ts` - Playwright测试配置
- `tsconfig.json` - TypeScript配置
- `package.json` - 项目依赖和脚本

### 测试和文档
- `tests/` - 测试文件目录，包含Playwright端到端测试
- `docs/` - 项目文档目录
- `.junie/` - Junie AI助手配置和指南

### 版本控制和CI/CD
- `.github/` - GitHub工作流程和配置
- `.gitignore` - Git忽略文件配置

## 开发工作流程

### 运行项目
- 使用 `pnpm dev` 以 Turbo 模式启动开发服务器
- 应用程序将在 http://localhost:3000 上可用

### 测试
在实施更改时，Junie 应运行测试以验证解决方案：
```bash
pnpm test
```
这将使用 4 个工作进程运行 Playwright 测试。在提交更改之前，请确保检查测试结果。

### 构建项目
在提交更改之前，Junie 应验证构建过程：
```bash
pnpm build
```
此命令运行数据库迁移并构建 Next.js 应用程序。

## 开发规范

### 代码生成原则（按优先级）
1. First Principles（第一性原理）：梳理最核心需求与边界
2. YAGNI：只实现当前真正需要的功能
3. KISS：保持设计和实现的简单性
4. SOLID：面向对象/模块化设计时，遵循单一职责、开放封闭等
5. DRY：消除重复，提炼公用逻辑
6. 面向接口编程: 在扩展或修改功能时，优先考虑适配或扩展现有接口

### 根据场景动态调整顺序
- 架构级／需求分析（Project Kickoff） First Principles →  YAGNI → KISS → SOLID → DRY
- 新功能迭代／增量开发：YAGNI → KISS → SOLID → DRY → First Principles
- 小函数／工具库实现：KISS → DRY → YAGNI → SOLID → First Principles
- 复杂业务组件／面向对象建模：First Principles → SOLID → YAGNI → KISS → DRY

## 代码风格指南
- 仅函数需要简洁的描述性注释
- 项目使用 ESLint 和 Biome 进行代码检查和格式化
- 运行 `pnpm lint` 检查代码问题
- 运行 `pnpm format` 自动格式化代码
- 遵循项目中现有的代码风格模式
- 使用 TypeScript 确保类型安全
- 遵循 React 最佳实践和钩子指南
- 使用 Tailwind CSS 为组件设计样式

## 数据库操作
项目使用 Drizzle ORM 和 Vercel Postgres。在进行数据库更改时：
- 使用 `pnpm db:generate` 生成迁移文件
- 使用 `pnpm db:migrate` 应用迁移
- 使用 `pnpm db:studio` 探索数据库

## 环境变量
项目需要各种服务的环境变量。请参考 `.env.example` 了解所需的变量。

## 依赖管理
- 使用 `pnpm` 作为包管理器（版本 9.12.3 或兼容版本）
- 添加新依赖时，确保它们与现有技术栈兼容

## 重要参考文档
- AI SDK文档: https://sdk.vercel.ai/docs
- Chat SDK文档: https://chat-sdk.dev/docs/getting-started/overview (本地文档 docs/chat_sdk_*)
- [Next.js文档](https://nextjs.org/docs)
- [原始模板信息](https://github.com/vercel/ai-chatbot) - Vercel AI-chatbot模板
