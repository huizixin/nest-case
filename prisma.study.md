```
npm install prisma @prisma/client
```

```
npx prisma init
```

.env 中配置 DATABASE_URL

```
npx prisma generate
```


如果有问题，删除根目录下的prisma.config.js 文件，重新执行` npx prisma init`
~~~
加环境修改：
"db:generate": "DOTENV_CONFIG_PATH=.env.development prisma generate",
"db:generate:test": "DOTENV_CONFIG_PATH=.env.test prisma generate",
"db:generate:prod": "DOTENV_CONFIG_PATH=.env.production prisma generate"

~~~