import Koa, { DefaultContext, DefaultState } from 'koa'
import {
  use401,
  useBodyparser,
  useJwt,
  useLogger,
  useOnError,
  useViews,
} from '.'
import logger from 'koa-logger'
import json from 'koa-json'
import log4j from '../log/log4Util'
import compress from 'koa-compress'
import KoaRouter from 'koa-router'

type app = Koa<DefaultState, DefaultContext>
const router = new KoaRouter()
export const useCreate = function (App: app) {
  App.use((ctx, next) => log4j(ctx, next))
  App.use((ctx, next) => use401(ctx, next))
  App.use(useJwt())
  App.use(logger())
  // logger
  App.use(async (ctx, next) => useLogger(ctx, next))

  App.use(useBodyparser())

  App.use(json())

  App.use(useViews())
  App.use(compress())
  // error-handling
  App.on('error', (err, ctx) => useOnError(err, ctx))

  // 引入路由
  App.use(router.routes())
  App.use(router.allowedMethods())
}
