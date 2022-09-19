const express = require("express");

const PORT = 8080;
const allPokemon = require("./data");

const app = express();
app.use(express.json());

app.get("/pokemon", (req, res) => {
  return res.status(200).json(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  const idPokemon = allPokemon.filter((pokemon) => {
    return pokemon.id === +id;
  });
  return res.status(200).json(idPokemon);
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
