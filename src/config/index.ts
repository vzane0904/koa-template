export const Config = {
  routePrefix: 'admin',
  ignoreJWT: [/^\/admin\/not/], // /^\/login/  以 login 开头的请求地址不使用 jwt 中间件
  public: '', //公钥
  private: '', //私钥
  aesSecretKey: '', //转换后的key
}
