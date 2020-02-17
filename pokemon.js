// 9. use something instead of app that is a sub route to app, that thing is router (an express method)
// export this functionality and require it elsewhere
// router is used to clean up code
// 11. add req.query so we can query into the browser a name and retrieve it
// *for a query, add ? and then the key (?name=bulbasaur).
// the reason we use the query is if we wrote name as .getblahblahpokemon id, we would lose the ability to get pokemon by id
// 12. You can query anything!
// 14. add if statements to add functionality
//15. do a post request using router.post

const express = require("express");
const {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonBySearch,
  savePokemon,
  deletePokemon,
  updatePokemon
} = require("../models/pokemon.js"); //..goes up a file
const router = express.Router();

router.get("/pokemon", async (req, res) => {
  const { name, id, search } = req.query;
  if (name) {
    const namedPokemon = await getPokemonByName(name);
    res.json(namedPokemon);
    return;
  }
  if (id) {
    const idPokemon = await getPokemonById(id);
    res.json(idPokemon);
    return;
  }
  if (search) {
    const searchPokemon = await getPokemonBySearch(search);
    res.json(searchPokemon);
    return;
  }

  //console.log(req.query);
  const pokemon = await getPokemon();
  res.json(pokemon);
});

router.get("/pokemon/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params;
  const pokemon = await getPokemonById(pokemonId);
  res.json(pokemon);
});

router.post("/pokemon", async (req, res) => {
  const { body } = req; //same as const body = req.body but restructured version
  await savePokemon(body);
  res.send(`You have saved ${body.name} as a pokemon`);
});

router.delete("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const name = await deletePokemon(id);
  if (name) {
    res.status(200).send(`You have deleted ${name}`);
    return;
  } else {
    res.status(406).send(`You have not deleted pokemon`);
  }
});

router.patch("/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  const name = await updatePokemon(id);
  if (name) {
    res.status(200).send(`You have updated ${name}`);
    return;
  } else {
    res.status(406).send(`You have not updated pokemon`);
  }
});

module.exports = router;
