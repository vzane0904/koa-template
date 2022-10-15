import NodeRSA from 'node-rsa'
import { Config } from '../config'
/**
 * @name 生成秘钥
 * @returns [公钥,私钥]
 * **/
export const creaseRsa = () => {
  const key = new NodeRSA({ b: 1024 })
  key.setOptions({ encryptionScheme: 'pkcs1' }) //指定加密格式
  const publicKey = key.exportKey('pkcs8-public-pem') //公钥
  const privateKey = key.exportKey('pkcs8-private-pem') //私钥
  Config.public = publicKey
  Config.private = privateKey
  //   ------------------------------------------------------------
  return [publicKey, privateKey]
}
/**
 * @name 加密
 * @returns Secret key string
 * **/
export const RSAencryption = (data: string) => {
  const key = new NodeRSA(Config.private)
  const cipherText = key.encryptPrivate(data, 'base64')
  return cipherText
}
/**
 * @name 解密
 * @returns result
 * **/
export const RSAdecrypt = (data: string) => {
  const key2 = new NodeRSA(Config.public)
  const rawText = key2.decryptPublic(data, 'utf8')
  return rawText
}
