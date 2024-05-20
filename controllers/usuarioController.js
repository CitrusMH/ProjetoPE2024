const express = require('express');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/Usuarios');

exports.create = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (email == undefined || email == '' || email == ' ' || email == null || email.length < 5 || email.indexOf('@') == -1 || email.indexOf('.') == -1 || email.indexOf(' ') != -1) {
        res.render('cadastroUsuario', { msg: 'Email inválido!'});
    }else if (senha == undefined || senha == '' || senha == ' ' || senha == null || senha.length < 8 || senha.indexOf(' ') != -1) {
        res.render('cadastroUsuario', { msg: 'Senha inválida! A senha deve conter no mínimo 8 caracteres e não pode conter espaços!'});
    }else{
        let salt = bcrypt.genSaltSync(10);
        let senhaHash = bcrypt.hashSync(senha, salt);

        Usuarios.findOne({ where: { email: email } }).then((usuario) => {
            if (usuario == undefined) {
                Usuarios.create({
                    email: email,
                    senha: senhaHash
                }).then(() => {
                    res.render('login', { msg: ''});
                }).catch((error) => {
                    res.render('cadastroUsuario', { msg: error});
                });
            } else {
                res.render('cadastroUsuario', { msg: 'Usuário já existe' });
            }
        });
    }   
}

exports.login = (req, res, next) => {
    var email = req.body.email;
    var senha = req.body.senha;

    Usuarios.findOne({ where: { email: email } }).then((usuario) => {
        if (usuario != undefined) {
            let senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

            if (senhaCorreta) {
                req.session.usuario = {
                    id: usuario.id,
                    email: usuario.email
                }
                res.redirect('/');
            } else {
                res.render('login', {msg: "Email ou senha invalidos!"});
            }
        } else {
            res.render('login', {msg: "Email ou senha invalidos!"});
        }
    });
};

exports.mostrarLogin = (req, res, next) => {
    res.render('login', { msg: '' });
};
exports.mostrarCadastro = (req, res, next) => {
    res.render('cadastrousuario', { msg: '' });
};

