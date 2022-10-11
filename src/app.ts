// src/app.ts
import Koa, { Context, DefaultContext, DefaultState } from 'koa'
import router from './router'
// @ts-ignore
import views from 'koa-views'
import json from 'koa-json'
// @ts-ignore
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
// 创建服务对象
const app: Koa<DefaultState, DefaultContext> = new Koa()
// error handler
onerror(app)

// 引入路由
app.use(router.routes())
router.get('*', ctx => {
  ctx.body = 'Hello Koa Template'
})
app.use(router.allowedMethods())
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
)
app.use(json())
app.use(logger())
app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  }),
)
// logger
app.use(async (ctx: Context, next) => {
  const start = Number(new Date())
  await next()
  const ms = Number(new Date()) - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})
export default app
