module.exports.login = (req, res, next) => {
    if (!req.session.userId) {
            
        res.redirect('/login', { title: '请先登录', code: 401 });
    } else {
        next();
    }
}