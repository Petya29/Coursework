const Router = require('express')
const { check } = require('express-validator')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/registration', [
    //validation
    check('username', 'userame cannot be empty').notEmpty(),
    check('username', 'username must not be shorter than 4 symbols and longer than 12').isLength({ min: 4, max: 12}),
    check('password', 'password cannot be empty').notEmpty(),
    check('password', 'password must not be shorter than 6 symbols and longer than 12').isLength({ min: 6, max: 12})
], 
userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.authCheck)

module.exports = router