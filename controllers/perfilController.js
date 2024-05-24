const express = require('express');
const Perfis = require('../models/Perfis');
const { render } = require('ejs');

exports.create = (req, res, next) => { 
    const { nome, plataforma } = req.body;

    Perfis.findOne({ where: { nome: nome, plataforma: plataforma }}).then((perfil) => {
        if (perfil) {
            res.render('perfis/myProfiles', { msg: 'Perfil já existe' });
        } else {
            const usuarioId = req.session.usuario; 
            Perfis.create({ nome, plataforma, usuarioId })
                .then((perfil) => {
                    res.render('perfis/myProfiles', { msg: 'Perfil criado com sucesso' });
                })
                .catch((error) => {
                    res.render('perfis/myProfiles', { msg: error });
                });
        }
    });
}
exports.update = (req, res, next) => {
    const { nome, plataforma } = req.body;
    const id = req.params.id;

    Perfis.findOne({ where: { id: id }}).then((perfil) => {
        if (perfil) {
            perfil.update({ nome, plataforma })
                .then(() => {
                    res.render('perfis/myProfiles', { msg: 'Perfil atualizado com sucesso' });
                })
                .catch((error) => {
                    res.render('perfis/myProfiles', { msg: error });
                });
        } else {
            res.render('perfis/myProfiles', { msg: 'Perfil não encontrado' });
        }
    });
};
exports.delete = (req, res, next) => {
    const id = req.params.id;

    Perfis.findOne({ where: { id: id }}).then((perfil) => {
        if (perfil) {
            perfil.destroy()
                .then(() => {
                    res.render('perfis/myProfiles', { msg: 'Perfil deletado com sucesso' });
                })
                .catch((error) => {
                    res.render('perfis/myProfiles', { msg: error });
                });
        } else {
            res.render('perfis/myProfiles', { msg: 'Perfil não encontrado' });
        }
    });
};
exports.showMyProfiles = (req, res, next) => {
    const usuarioId = req.session.usuario; 

    Perfis.findAll({ where: { usuarioId: usuarioId }})
        .then((perfis) => {
            if (perfis.length == 0) {
                res.render('perfis/myProfiles', { msg: 'Nenhum perfil encontrado' });
            } else {
                const perfisMap = perfis.map((perfil) => {
                    return {
                        id: perfil.id,
                        nome: perfil.nome,
                        plataforma: perfil.plataforma,
                    };
                });

                res.render('perfis/myProfiles', { msg: '', perfis: perfisMap });
            }
        })
        .catch((error) => {
            res.render('perfis/myProfiles', { msg: error });
        });
};
