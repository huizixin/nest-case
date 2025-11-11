在 NestJS 项目中集成 **ESLint + Prettier** 是提升代码质量和团队协作效率的**必备实践**。以下是 **完整、最新、生产就绪的配置指南**（适用于 NestJS v9+，TypeScript 项目）。

---

## ✅ 一、安装依赖

```bash
# ESLint 核心
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Prettier 核心
npm install -D prettier

# ESLint 与 Prettier 集成（关键！）
npm install -D eslint-config-prettier eslint-plugin-prettier

# NestJS 官方 ESLint 插件（可选但推荐）
npm install -D @nestjs/eslint-config
```

> 💡 `-D` 表示 `devDependencies`（开发依赖）

---

## ✅ 二、配置 ESLint（`.eslintrc.js`）

在项目根目录创建 **`.eslintrc.js`**：

```js
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // 👈 必须放在最后
    '@nestjs', // 可选：启用 NestJS 特定规则
  ],
  rules: {
    // 自定义规则（示例）
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prettier/prettier': 'error',
  },
};
```

> 🔑 **关键点**：
> - `plugin:prettier/recommended` 会**禁用与 Prettier 冲突的 ESLint 规则**
> - `@nestjs` 是 NestJS 官方规则集（需安装 `@nestjs/eslint-config`）

---

## ✅ 三、配置 Prettier（`.prettierrc`）

在项目根目录创建 **`.prettierrc`**（JSON 格式）：

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

> 💡 你也可以用 `.prettierrc.json`、`.prettierrc.yml` 或 `prettier.config.js`

---

## ✅ 四、忽略文件（可选但推荐）

### 1. **ESLint 忽略**（`.eslintignore`）
```gitignore
# .eslintignore
dist
node_modules
*.js
```

### 2. **Prettier 忽略**（`.prettierignore`）
```gitignore
# .prettierignore
dist
node_modules
*.md
.env
```

---

## ✅ 五、配置 npm scripts（`package.json`）

```json
{
  "scripts": {
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "lint:check": "eslint \"{src,apps,libs,test}/**/*.ts\"",
    "format": "prettier --write \"src/**/*.ts\""
  }
}
```

> 📌 使用 `--fix` 自动修复可修复的问题  
> 📌 `--write` 让 Prettier 直接修改文件

---

## ✅ 六、VS Code 集成（自动保存时格式化）

### 1. 安装 VS Code 插件：
- **ESLint**
- **Prettier - Code formatter**

### 2. 配置 VS Code（`.vscode/settings.json`）
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

> ✅ 保存时自动：  
> 1. 用 ESLint 修复问题  
> 2. 用 Prettier 格式化代码

---

## ✅ 七、Git 提交前检查（Husky + lint-staged）

防止未格式化的代码被提交：

```bash
# 安装
npm install -D husky lint-staged

# 启用 Git hooks
npx husky install

# 添加 pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

### 配置 `lint-staged`（`package.json`）
```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

> 💡 提交时只检查**暂存区的文件**

---

## ✅ 八、验证配置是否生效

### 1. 故意写一段“烂代码”：
```ts
// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(  )  :  string  {
    const message = 'Hello World!' ;
    return message
  }
}
```

### 2. 手动修复：
```bash
npm run lint    # 自动修复 ESLint 问题
npm run format  # 自动格式化
```

### 3. 保存文件（VS Code）：
- 应自动变成：
  ```ts
  getHello(): string {
    const message = 'Hello World!';
    return message;
  }
  ```

---

## ⚠️ 常见问题解决

### ❌ 问题：`Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser...`
**原因**：ESLint 找不到 `tsconfig.json`  
**解决**：
- 确保 `parserOptions.project: 'tsconfig.json'` 路径正确
- 或改用：
  ```js
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  }
  ```

### ❌ 问题：Prettier 和 ESLint 冲突
**原因**：未正确配置 `eslint-config-prettier`  
**解决**：
- 确保 `extends` 中 **`plugin:prettier/recommended` 在最后**
- 删除自定义的 `indent`、`quotes` 等格式规则（交给 Prettier 处理）

---

## 📌 最佳实践总结

| 工具 | 职责 |
|------|------|
| **ESLint** | 检查代码逻辑错误、潜在 bug、最佳实践 |
| **Prettier** | 统一代码风格（缩进、引号、分号等） |
| **Husky** | Git 提交前自动检查 |
| **VS Code** | 开发时实时反馈 + 保存自动修复 |

> ✨ **分工明确**：  
> - ESLint 管 **代码质量**  
> - Prettier 管 **代码格式**

---

现在你的 NestJS 项目已经具备了**企业级代码规范**！团队成员无论用什么 IDE，都能产出一致、高质量的代码。

需要我提供 **完整的配置文件模板** 或 **NestJS + ESLint + Prettier + Husky 一键脚本** 吗？