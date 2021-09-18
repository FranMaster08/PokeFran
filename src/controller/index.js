const db = require("../db/pokeData.json");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const getList = (req, res) => {
  res.render("index", { pokefranes: db });
};
const getRegister = (req, res) => {
  res.render("register");
};
const insertPoke = (req, res) => {
  const archivo = req.file;
  const { nombre, tipo } = req.body;

  const pokemon = {
    id: uuidv4(),
    nombre: nombre,
    tipo: tipo,
    image: `img/${archivo.filename}`,
  };
  db.push(pokemon);
  fs.writeFileSync(path.join(__dirname,"../db/pokeData.json"), JSON.stringify(db, null, 4), {
    encoding: "utf8",
  });

  res.render("index", { pokefranes: db });
};

const getDetail = (req, res) => {
  const id = req.params.id;
  const pokemon = db.find(item=>item.id === id);
  res.render("detail", { poke: pokemon });
}

module.exports = { getList, getRegister, insertPoke, getDetail };
