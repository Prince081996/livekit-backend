 // import express from "express";
// import { AccessToken } from "livekit-server-sdk";

const express = require("express");
const { AccessToken } = require("livekit-server-sdk");
const cors = require("cors");
const API_KEY = "APIMspB4RSPssiZ";
const API_SECRET = "N3hIV9eRG684kU3N2nltVEkVGhxyxBgLgW5B1dO3qWe";
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const createToken = (name) => {
  // if this room doesn't exist, it'll be automatically created when the first
  // client joins
  const roomName = "myRoom";
  // identifier to be used for participant.
  // it's available as LocalParticipant.identity with livekit-client SDK
  const participantName = "sunny";

  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: name,
  });
  at.addGrant({ roomJoin: true, room: roomName });

  return at.toJwt();
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const port = 3000;

app.get("/getToken", (req, res) => {
  const { name } = req.query;
  res.send(createToken(name));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
