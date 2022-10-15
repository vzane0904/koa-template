import Koa, { Context } from 'koa'

export default function (ctx: Context, next: Koa.Next) {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      //   ctx.body = 'Protected resource, use Authorization header to get access\n'
      ctx.body = '受保护的资源，使用授权标头获取访问权限\n'
    } else {
      throw err
    }
  })
}
