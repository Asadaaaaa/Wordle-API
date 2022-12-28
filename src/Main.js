import sessionAPI from './components/session/sessionAPI.js';
import wordsAPI from './components/words/wordsAPI.js';

// Library
import express from 'express';

const server = {
  session: {},
  sendLogs: (text) => {
    let date = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));
    let currentDate = "[" + date.getDate() + "/" 
        + (date.getMonth()+1)  + "/" 
        + date.getFullYear() + "|"  
        + date.getHours() + ":"  
        + date.getMinutes() + ":" 
        + date.getSeconds() + "]";

    console.log("\n", currentDate + ": " + text);
  }
}

const api = express();
const PORT = 3000;

api.use(express.json());

sessionAPI(server, api);
wordsAPI(server, api);

api.listen(PORT, () => {
  console.log("Listening Port " + PORT);
});