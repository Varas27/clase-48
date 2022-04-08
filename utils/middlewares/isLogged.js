const isLogged = (req, res, next) => {
    if (req.session.token) { // Check if user is already logged in
        return res.redirect('/products')
    } else {
        next()
    }
}

module.exports = isLogged