import env from 'dotenv'

env.config({ path: '.env' })
export const getEnv = () => {
  return process.env
}
