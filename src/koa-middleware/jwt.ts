import jwt from 'jsonwebtoken'
import { Config } from '../config'
/**
 * @params 生成Jwt信息
 * **/
export const createJwt = () => {
  const token = jwt.sign({ name: 11 }, Config.aesSecretKey, {
    expiresIn: '12h',
  })
  return token
}
/**
 * @params 校验Jwt信息
 * **/
export const verify = async (token: string) => {
  try {
    const res = await jwt.verify(token, Config.aesSecretKey)
    console.log('校验JWT', res)
  } catch (error: any) {
    console.log('校验jwt失败', error.message, error.status)
    // jwt expired 过期
    // invalid signature 错误
  }
}
