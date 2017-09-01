module.exports = (req, res) => {
    if (req.session.userId) {
        res.redirect('/index');
    } else {
        res.sendfile('src/login.html');
    }
}