const Koa = require('koa')
const indexRoutes = require('./routes/index')
const movieRoutes = require('./routes/movies')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()
const PORT = process.env.PORT || 1337

app.use(indexRoutes.routes())
app.use(movieRoutes.routes())
app.use(movieRoutes.allowedMethods({
    throw: true
}))

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

module.exports = server