var bcrypt = require('bcryptjs');

const hasPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const comparePassword = (plainPass, pass) => {
    return bcrypt.compareSync(plainPass, pass); 
}


module.exports = {hasPassword, comparePassword}


