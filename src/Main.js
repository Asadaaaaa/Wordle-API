import sessionAPI from './components/session/sessionAPI.js';
import wordsAPI from './components/words/wordsAPI.js';

// Library
import express from 'express';

const server = {
  session: {}
}

const api = express();
const PORT = 3000;

api.use(express.json());

sessionAPI(server, api);
wordsAPI(server, api);

api.listen(PORT, () => {
  console.log("Listening Port " + PORT);
});