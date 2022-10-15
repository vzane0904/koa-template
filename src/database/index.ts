import Koa, { DefaultContext, DefaultState } from 'koa'
import { Sequelize } from 'sequelize'
import { logUtil } from '../log/log4Util'
const sequelize = new Sequelize('test_db', 'root', 'admin-test@123456', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: (...msg) => logUtil.sqlInfo(msg), // 显示所有日志函数调用参数
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
export const initMysql = async (_App: Koa<DefaultState, DefaultContext>) => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    // sqlInfo
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
