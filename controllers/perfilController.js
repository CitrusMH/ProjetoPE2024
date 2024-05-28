const express = require('express');
const Perfis = require('../models/Perfis');
const { render } = require('ejs');

exports.create = (req, res, next) => { 
    const { nome, plataforma } = req.body;

    Perfis.findOne({ where: { nome: nome, plataforma: plataforma }}).then((perfil) => {
        if (perfil) {
            res.render('perfis/myProfiles', { msg: 'Perfil já existe', perfis: []});
        } else {
            const usuarioId = req.session.usuario.id; 
           
            Perfis.create({ nome, plataforma, usuarioId })
                .then(() => {
                    Perfis.findAll({ where: { usuarioId: usuarioId }})
                    .then((perfis) => {
                        if (perfis.length == 0) {
                            res.render('perfis/myProfiles', { msg: 'Nenhum perfil encontrado' , perfis: []});
                        } else {
                            res.render('perfis/myProfiles', { msg: '', perfis: perfis });
                        }
                    })
                    .catch((error) => {
                        res.render('perfis/myProfiles', { msg: error , perfis: []});
                    });
                })
                .catch((error) => {
                    res.render('perfis/myProfiles', { msg: error, perfis: []});
                });
        }
    });
};

exports.update = (req, res, next) => {
    const { nome, plataforma } = req.body;
    const id = req.params.id;

    Perfis.findOne({ where: { id: id }}).then((perfil) => {
        if (perfil) {
            perfil.update({ nome, plataforma })
                .then(() => {
                    Perfis.findAll({ where: { usuarioId: usuarioId }})
                    .then((perfis) => {
                        if (perfis.length == 0) {
                            res.render('perfis/myProfiles', { msg: 'Nenhum perfil encontrado', perfis: []});
                        } else {
                            res.render('perfis/myProfiles', { msg: '', perfis: perfis });
                        }
                    })
                    .catch((error) => {
                        res.render('perfis/myProfiles', { msg: error, perfis: []});
                    });
                })
                .catch((error) => {
                    res.render('perfis/myProfiles', { msg: error, perfis: []});
                });
        } else {
            res.render('perfis/myProfiles', { msg: 'Perfil não encontrado', perfis: []});
        }
    });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Perfis.destroy({ where: { id: id }})
        .then(() => {
            const usuarioId = req.session.usuario.id; 

            Perfis.findAll({ where: { usuarioId: usuarioId }})
                .then((perfis) => {
                    if (perfis.length == 0) {
                        res.render('perfis/myProfiles', { msg: 'Nenhum perfil encontrado', perfis: []});
                    } else {
                        res.render('perfis/myProfiles', { msg: '', perfis: perfis });
                    }
                })
                .catch((error) => {
                    res.render('perfis/myProfiles', { msg: error, perfis: []});
                });
        })
        .catch((error) => {
            res.render('perfis/myProfiles', { msg: error, perfis: []});
        });
};

exports.showMyProfiles = (req, res, next) => {
    const usuarioId = req.session.usuario.id; 

    Perfis.findAll({ where: { usuarioId: usuarioId }})
        .then((perfis) => {
            if (perfis.length == 0) {
                res.render('perfis/myProfiles', { msg: 'Nenhum perfil encontrado', perfis: []});
            } else {
                res.render('perfis/myProfiles', { msg: '', perfis: perfis });
            }
        })
        .catch((error) => {
            res.render('perfis/myProfiles', { msg: error, perfis: []});
        });
};
