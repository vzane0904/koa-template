import Koa, { DefaultContext, DefaultState } from 'koa'
// import mysql from 'mysql'
// @ts-ignore
import onerror from 'koa-onerror'
// import NodeRsa from 'node-rsa'
import { useCreate } from './koa-middleware/use'
import { creaseRsa, RSAencryption } from './utils/encryption'
import { Config } from './config'
import { initMysql } from './database'
import { createKoaServer } from 'routing-controllers'
import 'reflect-metadata'
import { getAllFilesName } from './router'
const app: Koa<DefaultState, DefaultContext> = createKoaServer({
  routePrefix: '/admin',
  controllers: getAllFilesName(__dirname),
})
// 创建服务对象
// initMysql(app)
creaseRsa()
Config.aesSecretKey = RSAencryption(Config.public)
useCreate(app)
onerror(app)
export default app
