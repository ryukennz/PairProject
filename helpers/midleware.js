const isLogin = (req, res, next) => {
    console.log(req.session);
    if (!req.session.userId) {
        const error = 'Please login first'
        res.redirect(`/login/users/role?error=${error}`)
    }else{
        next()
    }
}



module.exports = {isLogin}