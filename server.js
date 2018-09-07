const express = require('express')
const hbs = require('hbs')
const app = express()
const fs = require('fs')

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('sayHi', (name) => {
    return `Hi ${name} ~`
})

app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.error('Unable to append to server.log')
        }
    })
    next()
})

app.use((req, res, next) => {
    res.render('loading.hbs')
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: '一起学Node',
        userName: '本熊熊'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs')
})

app.get('/bad', (req, res) => {
    res.send({
        message: 'Bad Request!',
        code: '400'
    })
})

app.listen(3000)