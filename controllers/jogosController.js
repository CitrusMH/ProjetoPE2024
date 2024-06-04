const express = require("express");
const Jogos = require("../models/Jogos");
const { render } = require("ejs");
const Perfis = require("../models/Perfis");
const { where } = require("sequelize");
const axios = require("axios");

exports.create = (req, res, next) => {
  
};

exports.showMyGames = async (req, res, next) => {
  const currentUserId = req.session.usuario.id;

  let cards = await fetchGames();
  
  Perfis.findAll({ where: { usuarioId: currentUserId } })
    .then((perfis) => {
      Jogos.findAll({ where: { perfiId: (perfis) => perfis.id } })
        .then((jogos) => {
          console.log(jogos);
          if (jogos.length == 0) {
            res.render("jogos/myGames", {
              jogos: jogos,
              cards: cards,
              msg: "Nenhum jogo encontrado",
            });
          } else {
            res.render("jogos/myGames", {
              jogos: jogos,
              cards: cards,
              msg: "",
            });
          }
        })
        .catch((err) => {
          res.render("jogos/myGames", {
            jogos: [],
            msg: err,
            cards: cards,
          });
        });
    })
    .catch((err) => {
      res.render("jogos/myGames", {
        jogos: [],
        msg: err,
        cards: cards,
      });
    });
};

async function fetchGames() {
  try {
    const response = await axios.get(
      "https://api.rawg.io/api/games",
      { params: { key: "1b2194a5ff194db589fd282e7664cd9b" } },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.results;
    
  } catch {
    return [];
  }
}