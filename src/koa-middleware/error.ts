import { Context } from 'koa'

export default function (err: { message: any }, _ctx: Context) {
  console.error('server error', err.message)
  // ctx.body = err.message
}
