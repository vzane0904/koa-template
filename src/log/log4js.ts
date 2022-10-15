import path from 'path'
const baseLogPath = path.resolve(__dirname, '../logs')
// 模块名称及输出文件名
const configPath = {
  reqPath: '/request', // 请求日志目录
  reqFileName: 'request', // 请求日志文件名
  responsePath: '/response', // 响应日志目录
  responseFileName: 'response', // 响应日志文件名
  errorPath: '/error', // 错误日志目录
  errorFileName: 'error', // 错误日志文件名
  sqlPath: '/sql', // 错误日志目录
  sqlFileName: 'sql', // 错误日志文件名
}
// 日志输出路径
const logOutputPath = {
  // 请求日志输出完整路径
  reqLogPath: baseLogPath + configPath.reqPath + '/' + configPath.reqFileName,
  // 响应日志输出完整路径
  responseLogPath:
    baseLogPath + configPath.responsePath + '/' + configPath.responseFileName,
  // 错误日志输出完整路径
  errorLogPath:
    baseLogPath + configPath.errorPath + '/' + configPath.errorFileName,
  // sql日志输出完整路径
  sqlLogPath: baseLogPath + configPath.sqlPath + '/' + configPath.sqlFileName,
}
export default {
  // 日志格式等设置
  appenders: {
    console: {
      type: 'console',
    },
    errorLogger: {
      type: 'dateFile',
      filename: logOutputPath.errorLogPath,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      numBackups: 3,
      path: configPath.errorPath,
      layout: {
        type: 'basic',
      },
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100, //当文件内容超过文件存储空间时，备份文件的数量
    },
    http: {
      type: 'dateFile',
      filename: logOutputPath.reqLogPath,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      numBackups: 3,
      path: configPath.reqPath,
      layout: {
        type: 'basic', // 'messagePassThrough'
      },
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100, //当文件内容超过文件存储空间时，备份文件的数量
    },
    resLogger: {
      type: 'dateFile',
      filename: logOutputPath.responseLogPath,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      numBackups: 3,
      path: configPath.responsePath,
      layout: {
        type: 'basic',
      },
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100, //当文件内容超过文件存储空间时，备份文件的数量
    },
    sqlLogger: {
      type: 'dateFile',
      filename: logOutputPath.sqlLogPath,
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      numBackups: 3,
      path: configPath.sqlPath,
      layout: {
        type: 'basic',
      },
      maxLogSize: 104800, // 文件最大存储空间
      backups: 100, //当文件内容超过文件存储空间时，备份文件的数量
    },
    stdout: { type: 'stdout' }, //在控制台上打印信息
  },
  // 供外部调用的名称和对应设置定义
  categories: {
    default: {
      appenders: ['console'],
      level: 'all',
    },
    resLogger: {
      appenders: ['resLogger'],
      level: 'info',
    },
    errorLogger: {
      appenders: ['errorLogger'],
      level: 'error',
    },
    http: {
      appenders: ['http'],
      level: 'info',
    },
    sqlLogger: {
      appenders: ['sqlLogger'],
      level: 'info',
    },
  },
  baseLogPath,
  replaceConsole: true,
}
