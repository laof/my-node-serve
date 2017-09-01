module.exports = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username === 'admin' && password === 'adc123.com') {
        req.session.userId = new Date().getTime();
        req.session.username = req.body.username;
        req.session.password = req.body.password;
        res.redirect("/index1.html");
        return;
    }
    res.send({ message: '用户名或者密码错误' });
}