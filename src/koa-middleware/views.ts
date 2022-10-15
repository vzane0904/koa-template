// @ts-ignore
import views from 'koa-views'

export default function () {
  return views(__dirname + '/views', {
    extension: 'pug',
  })
}
