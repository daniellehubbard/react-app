const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.post('/giftcard/validate', (req, res) => {
    return res.jsonp({valid: true, amount: 20});
});
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})