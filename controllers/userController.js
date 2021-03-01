const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, AcademyDegree } = require('../models/models')

const generateJwt = (id, username, role) => {
    return jwt.sign(
        { id, username, role},
        process.env.SECRET_KEY,
        { expiresIn: '6h'})
}

class UserController {
    async registration(req, res) {
        const { username, password, category } = req.body

        const candidate = await User.findOne({ where: {username}})
        if(candidate){
            res.status(400).json({ message: 'this username already exists'})
        }
        const hashPass = await bcrypt.hash(password, 7) // 7 is hash rate
        const user = await User.create({ username: username, password: hashPass, category: category})
        const academyDegree = await AcademyDegree.create({ userId: user.id })
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({ token })
    }

    async login(req, res) {
        const { username, password } = req.body
        const user = await User.findOne({ where: {username}})
        if(!user){
            return res.json({ message: 'user does not exist'})
        }
        let comparePass = bcrypt.compareSync(password, user.password)
        if(!comparePass){
            return res.json({ message: 'wrong password'})
        }
        const token = generateJwt(user.id, user.username, user.role)
        return res.json({ token })
    }

    async authCheck(req, res) {
        const token = generateJwt(req.user.id, req.user.username, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController()