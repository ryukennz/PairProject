const express = require('express');
const index = require('./routers');
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
var session = require('express-session')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, )
    }
})

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false
        }
    })
)

app.use(index)

app.listen(port)