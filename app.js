// ******Before anything else install express and nodemon, and add into scripts in package.json file

// 1. what we want our server to do when we set up a request on port 5000:
// we want to GET all pokemon, and then send it back with response in new file (pokemon.js)
//*file made in this part pokemon.js
// 4. once we have got the file and sent it, we want to REQUIRE it (as above)
// get the pokemon below in the get part and await the info
// We now need to transform the json data into text using stringify JSON request
//*express has method that does this conversion for us called res.json as its so common

// now on localhost:5000/pokemon, we can see all the data on the browser

// 6. add new pokemon id function to the require the EXACT pokemon:
// make another app.get to get the EXACT pokemon as opposed to just getting all of them like in the app.get above
// create another variable to save the id thing in
// req.params hold specifically what parameter you called (e.g. if you called id '2', it will have that info)
// use res.json to convert the object info into string info for the user

// 7. Express middleware- app.use can apply to any type of request and print out useful info about that request.
//   Next request goes onto next item on the chain, i.e allows us to perform multiple functions on one thing
// any request that comes to port 5000 app.use will perform its function in the middle part of the process
// 8. Add more middleware below to allow the CORS to not block our code
// *** 9. Put the orignal code (now commented out) into a seperate file called pokemonRouter.js
// 16. use middleware to reassemble the body of our post request using json

const express = require("express");
const app = express();
const PORT = 5000;
const pokemonRouter = require("./routes/pokemon");
//const { getPokemon, getPokemonById } = require("./pokemon.js");
app.use((req, res, next) => {
  console.log(`${req.method} request received to ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(express.json());

app.use(pokemonRouter);

//app.get("/pokemon", async (req, res) => {
//const pokemon = await getPokemon();
//  res.json( pokemon );
//});

//app.get("/pokemon/:pokemonId", async (req, res)=>{
//    const {pokemonId} = req.params;
//const pokemon = await getPokemonById(pokemonId);
//res.json(pokemon);
//}); */

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
