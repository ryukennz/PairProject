const express = require('express')
const index = express.Router()
const userRoute = require('./users');
const Controller = require('../controllers/controller');

index.get('/', Controller.showlandingPage)
index.use(userRoute)

module.exports = index