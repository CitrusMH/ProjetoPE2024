const express = require("express");
const Jogos = require("../models/Jogos");
const { render } = require("ejs");
const Perfis = require("../models/Perfis");
const { where } = require("sequelize");
const axios = require("axios");
const { search } = require("../app");

exports.create = (req, res, next) => {};

exports.showMyGames = async (req, res, next) => {
  const currentUserId = req.session.usuario.id;

  console.log("currentUserId: ", currentUserId);
  
  let cards = await fetchMyGames(currentUserId);

  console.log("cards: ", cards);
  Perfis.findAll({ where: { usuarioId: currentUserId } })
    .then((perfis) => {
      Jogos.findAll({ where: { perfiId: (perfis) => perfis.id } })
        .then((jogos) => {
          if (jogos.length == 0) {
            res.render("jogos/myGames", {
              jogos: jogos,
              cards: cards,
              msg: cards,
            });
          } else {
            res.render("jogos/myGames", {
              jogos: jogos,
              cards: cards,
              msg: cards,
            });
          }
        })
        .catch((err) => {
          res.render("jogos/myGames", {
            jogos: [],
            msg: cards,
            cards: cards,
          });
        });
    })
    .catch((err) => {
      res.render("jogos/myGames", {
        jogos: [],
        msg: cards,
        cards: cards,
      });
    });
};
async function fetchMyGames(reqID) {
  console.log("reqID: ", reqID);
  Perfis.findAll({ where: { usuarioId: reqID } })
    .then((perfis) => {
      Jogos.findAll({ where: { perfiId: (perfis) => perfis.id } })
        .then((jogos) => {
          if (!jogos.length) {
            return [];
          } else {
            let gameSearch = [];
            jogos.forEach(async (jogo) => {
                try {
                  const response = await axios.get(
                    "https://api.rawg.io/api/games/" + jogo.name,
                    { params: { key: "1b2194a5ff194db589fd282e7664cd9b" } },
                    { headers: { "Content-Type": "application/json" } }
                  );

                  response.status == 200
                    ? gameSearch.push(response.data)
                    : null;
                } catch (error) {
                  return [];
                }
              }).then(() => {
                return gameSearch;
              });
          }
        })
        .catch((err) => {
          return [];
        });
    })
    .catch((err) => {
      return [];
    });
}
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
