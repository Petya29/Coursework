require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const exphbs = require('express-handlebars')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')

const PORT = process.env.PORT || 4444

const app = express()
app.use(express.json())
app.use(cors())
app.use('/', router)

const hbs = exphbs.create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => { console.log(`Server has been started on ${PORT}` + '\n' + `http://localhost:${PORT}`) })
    } catch (e) {
        console.log(e)
    }
}

start()