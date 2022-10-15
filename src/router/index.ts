import fs from 'fs'

export const getAllFilesName = (dirname: string) => {
  return fs
    .readdirSync(dirname + '/router/modules')
    .map(item => (dirname + '/router/modules/' + item).replaceAll('\\', '/'))
}
