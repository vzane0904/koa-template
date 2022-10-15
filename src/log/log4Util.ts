import Koa, { Context } from 'koa'
import log4js from 'log4js'
import moment from 'moment'
import { getClientIP } from '../utils/ip'

import logConfig from './log4js'

// 加载配置文件
log4js.configure(logConfig)
// 调用预先定义的日志名称
const resLogger = log4js.getLogger('resLogger')
const reqLogger = log4js.getLogger('http')
const errorLogger = log4js.getLogger('errorLogger')
const sqlLogger = log4js.getLogger('sqlLogger')
const consoleLogger = log4js.getLogger()

// 格式化consoleLog请求日志
const formatConsoleInfo = function (info: Context) {
  let logText = ''
  // 响应日志开始
  logText += '\n' + '*************** log start ***************' + '\n'

  // 响应内容
  logText +=
    `[${moment().format('YYYY-MM-DD HH:mm:ss')}] - [INFO] normal - ${
      info.headers.host
    } - ${info.method} - ${getClientIP(info)} - ${info.URL} - ${JSON.stringify(
      info.request.body,
    )}` + '\n'

  // 响应日志结束
  logText += '*************** log end ***************'

  return logText
}
// 格式化请求日志
const formatReqLog = function (req: Koa.Request, resTime: any) {
  let logText = ''

  const method = req.method
  // 访问方法
  logText += '\n' + 'request method: ' + method + '\n'

  // 请求原始地址
  logText += 'request originalUrl:  ' + req.originalUrl + '\n'

  // 客户端ip
  logText += 'request client ip:  ' + req.ip + '\n'

  // 开始时间
  //   var startTime;
  // 请求参数
  if (method === 'GET') {
    logText += 'request query:  ' + JSON.stringify(req.query, null, 2) + '\n'
    // startTime = req.query.requestStartTime;
  } else {
    logText +=
      'request body: ' + '\n' + JSON.stringify(req.body, null, 2) + '\n'
    // startTime = req.body.requestStartTime;
  }
  // 服务器响应时间
  logText += 'response time: ' + resTime + '\n'

  return logText
}
// 格式化响应日志
const formatRes = function (ctx: Context, resTime: any) {
  let logText = ''
  // 响应日志开始
  logText += '\n' + '*************** response log start ***************'

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime)

  // 响应状态码
  logText += 'response status: ' + ctx.status + '\n'

  // 响应内容
  logText += 'response body: ' + JSON.stringify(ctx.body, null, 2) + '\n'

  // 响应日志结束
  logText += '*************** response log end ***************' + '\n'

  return logText
}
// 格式化错误日志
const formatError = function (ctx: Context, err: Error, resTime: any) {
  let logText = ''

  // 错误信息开始
  logText += '\n' + '*************** error log start ***************' + '\n'

  // 添加请求日志
  logText += formatReqLog(ctx.request, resTime)

  // 错误名称
  logText += 'err name: ' + err.name + '\n'
  // 错误信息
  logText += 'err message: ' + err.message + '\n'
  // 错误详情
  logText += 'err stack: ' + err.stack + '\n'

  // 错误信息结束
  logText += '*************** error log end ***************' + '\n'

  return logText
}
// 格式化sql日志
const formatSql = function (info: string) {
  let logText = ''

  // 错误信息开始
  logText += '\n' + '*************** sql log start ***************' + '\n'

  // sql日志
  logText += `${JSON.stringify(info)}` + '\n'

  // 错误信息结束
  logText += '*************** sql log end ***************' + '\n'

  return logText
}
export const logUtil = {
  logError: function (ctx: Context, error: Error, resTime: any) {
    if (ctx && error) {
      errorLogger.error(formatError(ctx, error, resTime))
    }
  },
  // 请求日志
  reqLog: function (ctx: Context, resTime: any) {
    if (ctx) {
      let logText = ''
      logText += '\n' + '*************** request log start ***************'
      logText += formatReqLog(ctx.request, resTime)
      logText += '*************** request log end ***************' + '\n'
      reqLogger.info(logText)
    }
  },
  // 封装响应日志
  logResponse: function (ctx: Context, resTime: any) {
    if (ctx) {
      resLogger.info(formatRes(ctx, resTime))
    }
  },
  logInfo: function (info: Context) {
    if (info) {
      consoleLogger.info(formatConsoleInfo(info))
    }
  },
  sqlInfo: function (info: any) {
    if (info) {
      sqlLogger.info(formatSql(info))
    }
  },
}
export default async (ctx: Context, next: Koa.Next) => {
  ctx.logger = logUtil
  await next()
}
