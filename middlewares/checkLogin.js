function logado(req, res, next) {
  if (req.session.usuario) {
    next();
  } else {
    res.render('login', {msg: ''});
  }
}

module.exports = logado;