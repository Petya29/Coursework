const Router = require('express')
const mainRouter = require('./mainRouter')
const userRouter = require('./userRouter')

const router = new Router()

router.use('/', mainRouter)
router.use('/user', userRouter)

module.exports = router