module.exports.login = (req, res, next) => {
    if (!req.session.userId) {
        res.send({ redirect: true, code: 304 });
        res.redirect('/login');
    } else {
        next();
    }
}