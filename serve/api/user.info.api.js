module.exports = (req, res) => {
    res.send({
        sucess: !0, user: {
            id: req.session.userId,
            name: req.session.username
        }
    });
}