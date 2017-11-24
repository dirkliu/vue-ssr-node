const server = require('express')()
const createApp = require('./app')
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
  const context = {
    title: 'vue ssr demo',
    meta: `
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
    `,
    url: req.url
  }

  const app = createApp(context)
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080)
