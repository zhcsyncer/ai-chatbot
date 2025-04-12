# AI 聊天机器人项目概述

这是一个基于 Next.js 和 PostgreSQL 的 AI 聊天机器人应用程序，支持用户认证和文档处理功能。

## 技术栈

### 前端
- **框架**: Next.js 15 (Canary)
- **UI**: React 19 (RC), TailwindCSS, Radix UI 组件
- **状态管理**: SWR
- **编辑器**: CodeMirror, ProseMirror

### 后端
- **数据库**: PostgreSQL (通过 Vercel Postgres)
- **ORM**: Drizzle ORM
- **认证**: NextAuth.js 5
- **AI 集成**: AI SDK, Groq 集成

### 开发工具
- **包管理**: pnpm
- **代码质量**: ESLint, Biome
- **测试**: Playwright
- **类型检查**: TypeScript

## 项目结构

主要目录:
- `/app`: Next.js 应用路由和组件
- `/lib/db`: 数据库模式和查询
- `/artifacts`: 处理不同类型内容的代码 (文本、代码、图像等)
- `/tests`: Playwright 测试

## 数据库模式

核心实体:
- **User**: 用户账户
- **Chat**: 用户的聊天会话
- **Message**: 聊天消息 (新版支持多部分内容)
- **Document**: 用户文档 (支持文本、代码、图像等)
- **Vote**: 消息评价系统
- **Suggestion**: 文档建议/修改

## 运行项目

### 开发环境
```bash
# 安装依赖
pnpm install

# 运行开发服务器
pnpm dev

# 数据库迁移
pnpm db:migrate

# 数据库管理
pnpm db:studio  # 启动 Drizzle Studio
```

### 测试
```bash
# 运行所有测试
pnpm test

# 单独运行特定测试
npx playwright test tests/chat.test.ts
```

### 构建与部署
```bash
# 构建应用 (包含数据库迁移)
pnpm build

# 启动生产服务器
pnpm start
```

## 代码规范

- 使用 ESLint 和 Biome 进行代码质量检查
- 运行 `pnpm lint` 检查问题
- 运行 `pnpm format` 自动格式化代码

## 数据库管理

- 使用 Drizzle ORM 进行数据库操作
- 数据库模式定义在 `lib/db/schema.ts`
- 运行 `pnpm db:generate` 生成新的迁移
- 运行 `pnpm db:push` 将更改推送到数据库

## 新功能开发

1. 创建新的组件和页面在 `/app` 目录下
2. 更新数据库模式需要创建迁移
3. 按照现有模式添加新功能测试
4. 使用 Biome 和 ESLint 确保代码质量
