module.exports.login = (req, res, next) => {
    if (!req.session.userId) {
        
        if(req.headers['x-requested-with']==='XMLHttpRequest'){
             res.send({ redirect: true, code: 304 });
        }else{
            res.redirect('/login');
        }
        
    } else {
        next();
    }
}