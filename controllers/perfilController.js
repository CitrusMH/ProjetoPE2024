const express = require('express');
const Perfis = require('../models/Perfis');

// exports.create = (req, res, next) => { 
//     const { nome, plataforma } = req.body;

//     Perfis.findOne({ where: { nome: nome, plataforma: plataforma }}).then((perfil) => {
//         if (perfil) {
//             res.status(409).json({ message: 'Perfil já existe' });
//         } else {
//             const usuarioId = req.session.usuario; 
//             Perfis.create({ nome, plataforma, usuarioId })
//                 .then((perfil) => {
                    
//                 })
//                 .catch((error) => {
                    
//                 });
//         }
//     });
// }
// exports.update = (req, res, next) => {
//     const { nome, plataforma } = req.body;
//     const id = req.params.id;

//     Perfis.findOne({ where: { id: id }}).then((perfil) => {
//         if (perfil) {
//             perfil.update({ nome, plataforma })
//                 .then(() => {
                    
//                 })
//                 .catch((error) => {
                    
//                 });
//         } else {
//             res.status(404).json({ message: 'Perfil não encontrado' });
//         }
//     });
// };
// exports.delete = (req, res, next) => {
//     const id = req.params.id;

//     Perfis.findOne({ where: { id: id }}).then((perfil) => {
//         if (perfil) {
//             perfil.destroy()
//                 .then(() => {
                    
//                 })
//                 .catch((error) => {
                    
//                 });
//         } else {
//             res.status(404).json({ message: 'Perfil não encontrado' });
//         }
//     });
// };
// exports.showMyProfiles = (req, res, next) => {
//     const usuarioId = req.session.usuario; 

//     Perfis.findAll({ where: { usuarioId: usuarioId }})
//         .then((perfis) => {
            
//         })
//         .catch((error) => {
            
//         });
// };
exports.showMyProfiles = (req, res, next) => {
    const usuarioId = req.session.usuario; 

    Perfis.findAll({ where: { usuarioId: usuarioId }})
        .then((perfis) => {
            if (perfis.length == 0) {
                res.render('myProfiles', { msg: 'Nenhum perfil encontrado' });
            } else {
                const perfisMap = perfis.map((perfil) => {
                    return {
                        id: perfil.id,
                        nome: perfil.nome,
                        plataforma: perfil.plataforma,
                    };
                });

                res.render('myProfiles', { msg: '', perfis: perfisMap });
            }
        })
        .catch((error) => {
            res.status(500).json({ msg : 'Erro ao buscar perfis' });
        });
};
