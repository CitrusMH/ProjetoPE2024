exports.home = (req, res, next) => {
    if (!req.session.usuario) {
        return res.render('login', {msg : ''});
    }else{
        return res.render('index');
    }
}