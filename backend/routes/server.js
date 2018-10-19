const express = require("express");
const router = express.Router();


const GameInfo = require('../gameinfo');

router.post('/', function postGame(req, res){
  var gd = req.body// game data
  let game = new GameInfo(gd.name, gd.size, gd.teamSize, gd.nTeams, gd.creator);
  serverList.addServer(game);
  res.set('Content-Type', 'application/text');
  res.status(200).send(game.id+"");
});




module.exports = router;
