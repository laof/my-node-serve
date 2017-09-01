module.exports = (req, res) => {
    req.session.userId = null;
    req.session.username = null;
    req.session.password = null;
    res.redirect('/index');   
}