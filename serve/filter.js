module.exports = (req, res, next) => {
    if (!req.session.userId) {

        if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
            res.setHeader('WWW-Authenticate', 'Basic realm="SECURE Area"');
            res.send({ redirect: true, code: 304 });
        } else {
            res.redirect('/login');
        }

    } else {
        next();
    }
}