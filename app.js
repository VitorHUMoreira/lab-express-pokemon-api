const express = require("express");

const cors = require("cors");

const PORT = 8080;
const allPokemon = require("./data");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/pokemon", (req, res) => {
  return res.status(200).json(allPokemon);
});

app.get("/pokemon/random", (req, res) => {
  return res
    .status(200)
    .json(allPokemon[Math.round(Math.random() * allPokemon.length - 1)]);
});

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const idPokemon = allPokemon.filter((pokemon) => {
    return pokemon.id === +id;
  });
  return res.status(200).json(idPokemon);
});

app.get("/search", (req, res, next) => {
  let foundPokemon = [];

  if (req.query.name) {
    allPokemon.forEach((pokemon) => {
      if (pokemon.name === req.query.name) {
        foundPokemon.push(pokemon);
      }
    });
  }

  if (req.query.type) {
    allPokemon.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        if (type === req.query.type) {
          foundPokemon.push(pokemon);
        }
      });
    });
  }

  return res.status(200).json(foundPokemon);
});

app.post("/pokemon", (req, res) => {
  const form = req.body;
  allPokemon.push(form);

  return res.status(201).json(allPokemon);
});

app.put("/pokemon/:id", (req, res) => {
  const { id } = req.params;

  allPokemon.forEach((element, index) => {
    if (element.id === +id) {
      allPokemon[index] = { ...element, ...req.body };
    }
  });

  return res.status(200).json(allPokemon);
});

app.delete("/pokemon/:id", (req, res) => {
  const { id } = req.params;

  allPokemon.forEach((element, index) => {
    if (element.id === +id) {
      allPokemon.splice(index, 1);
    }
  });

  return res.status(200).json(allPokemon);
});

app.listen(PORT, () =>
  console.log(`Server up and running at http://localhost:${PORT}`)
);
