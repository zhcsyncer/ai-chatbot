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
- `app/` - Next.js App Router 结构，包含 React 服务器组件
- `components/` - 可重用的 UI 组件
- `lib/` - 实用函数和共享代码
  - `lib/db/` - 数据库模型和迁移脚本
- `public/` - 静态资源
- `styles/` - 全局 CSS 样式

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

## 代码风格指南
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
