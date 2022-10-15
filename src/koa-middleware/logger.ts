import Koa, { Context } from 'koa'

export default async function (ctx: Context, next: Koa.Next) {
  ctx.logger.reqLog(ctx, `${JSON.stringify(ctx.request, null, 2)}`) // 请求日志
  ctx.logger.logInfo(ctx, ctx.request) //控制台输出日志
  await next().catch(res => ctx.logger.logError(ctx, res))
  ctx.logger.logResponse(ctx, `${JSON.stringify(ctx.request, null, 2)}`) // 响应日志
}
