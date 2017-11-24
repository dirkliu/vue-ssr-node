// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
// 第 3 步：将 Vue 实例渲染为 HTML

const server = require('express')()
const context = {
  title: 'vue ssr demo',
  meta: `
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
  `
}

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080)
