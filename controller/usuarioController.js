const express = require('express');
const bcrypt = require('bcryptjs');
const Usuarios = require('../models/Usuarios');

exports.create = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    let salt = bcrypt.genSaltSync(10);
    let senhaHash = bcrypt.hashSync(senha, salt);

    Usuarios.findOne({ where: { email: email } }).then((usuario) => {
        if (usuario == undefined) {
            Usuarios.create({
                email: email,
                senha: senhaHash
            }).then(() => {
                res.status(201).send("Usuário criado com sucesso!");
            }).catch((error) => {
                res.status(400).send("Houve um erro na criação do usuário!");
            });
        } else {
            res.status(400).send("Usuário já cadastrado!");
        }
    });   
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
                res.status(200).send("Login realizado com sucesso!");
            } else {
                res.status(401).send("Email ou senha incorretos!");
            }
        } else {
            res.status(404).send("Email ou senha incorretos!");
        }
    });
};