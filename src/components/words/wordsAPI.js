// Library
import { rword } from "rword";

const wordsAPI = (server, api) => {
  api.get('/api/play', (req, res) => {
    const session = req.query.session;
    const word = rword.generate(1, { length: 5});
    
    if(server.session[session] === undefined) {
      res.send({
        resCode: 1,
        message: 'Session Not Found!',
      });

      return;
    }

    server.session[session].word = word.split('');

    res.send({
      resCode: "OK",
      session
    });
  });

  api.post('/api/guessed', (req, res) => {
    const session = req.body.session;
    const guessed = req.body.guessed.map(element => {
      return element.toLowerCase();
    });;

    if(server.session[session] === undefined) {
      res.send({
        resCode: 1,
        message: 'Session Not Found!',
      });

      return;
    }

    if(!rword.words.includes(guessed.join("").toString())) {
      res.send({
        session,
        resCode: 2,
        message: 'Words Not Found!'
      });

      return;
    }

    if(guessed.join("").toString() === server.session[session].word.join("").toString()) {
      res.send({
        session,
        resCode: 'OK',
        guessed: true
      });

      delete server.session[session];

      return;
    }

    guessed.forEach((val, idx, arr) => {
      if(server.session[session].word.indexOf(val) === -1) {
        guessed[idx] = [val, 0];
      } else if(idx !== server.session[session].word.indexOf(val)) {
        guessed[idx] = [val, 1];
      } else if(idx === server.session[session].word.indexOf(val)) {
        guessed[idx] = [val, 2];
      }
    });

    server.session[session].guessed.push(guessed);

    if(server.session[session].guessed.length === 5) {
      delete server.session[session].guessed;

      res.send({
        session,
        resCode: 3,
        guessed,
        message: 'Lose'
      });

      return;
    }
    res.send({
      session,
      resCode: 'OK',
      guessed,
      message: "Added guessed word!"
    })
  });
}

export default wordsAPI;