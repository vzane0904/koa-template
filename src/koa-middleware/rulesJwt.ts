import { Context } from 'koa'
import koaJwt from 'koa-jwt'
import { Config } from '../config'

export default function () {
  return koaJwt({
    secret: Config.aesSecretKey,
    debug: true, // 开启debug可以看到准确的错误信息
    // passthrough: true,
    // key: 'jwtdata',
    getToken: (ctx: Context) => ctx.headers.token as string,
  }).unless({
    path: Config.ignoreJWT,
  })
}
