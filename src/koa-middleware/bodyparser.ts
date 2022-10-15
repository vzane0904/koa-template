import bodyparser from 'koa-bodyparser'

export default function () {
  return bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
}
