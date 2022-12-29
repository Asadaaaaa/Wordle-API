// Library
import { rword } from "rword";

const wordsAPI = (server, api) => {
  api.get('/api/play', (req, res) => {
    const session = req.query.session;
    const word = rword.generate(1, { length: 5});
    
    if(server.session[session] === undefined) {
      res.status(405).json({
        resCode: 1,
        message: 'Session Not Found!',
      });
      server.sendLogs("End-Point: /api/play\n  Status: Method not Allowed!\n  Description: Session Not Found!");

      return;
    }

    server.session[session].word = word.split('');

    res.send({
      resCode: "OK",
      session
    });
    server.sendLogs("End-Point: /api/play\n  Status: OK\n  Session Data [" + session + "]: " + JSON.stringify(server.session[session], null, 2));
  });

  api.post('/api/guessed', (req, res) => {
    const session = req.body.session;
    const guessed = req.body.guessed.map(element => {
      return element.toLowerCase();
    });;

    if(server.session[session] === undefined) {
      res.status(405).json({
        resCode: 1,
        message: 'Session Not Found!',
      });
      server.sendLogs("End-Point: /api/guessed\n  Status: Method not Allowed!\n  Description: Session Not Found!");

      return;
    }

    if(!rword.words.includes(guessed.join("").toString())) {
      res.status(405).json({
        session,
        resCode: 2,
        message: 'Words Not Found!'
      });
      server.sendLogs("End-Point: /api/guessed\n  Status: Method not Allowed!\n  Description: Words Not Found!");

      return;
    }

    if(guessed.join("").toString() === server.session[session].word.join("").toString()) {
      res.status(405).json({
        session,
        resCode: 'OK',
        guessed: true,
        message: "You Win!"
      });
      server.sendLogs("End-Point: /api/guessed\n  Status: OK\n  Description: Win!\n  Session Data [" + session + "]: " + JSON.stringify(server.session[session], null, 2));

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
      res.send({
        session,
        resCode: "OK",
        guessed,
        message: 'You Lose!'
      });
      server.sendLogs("End-Point: /api/guessed\n  Status: OK\n  Description: You Lose!\n  Session Data [" + session + "]: " + JSON.stringify(server.session[session], null, 2));

      delete server.session[session].guessed;
      return;
    }
    res.send({
      session,
      resCode: 'OK',
      guessed,
      message: "Added guessed word!"
    });
    server.sendLogs("End-Point: /api/guessed\n  Status: OK\n  Description: Added guessed word!\n  Session Data [" + session + "]: " + JSON.stringify(server.session[session], null, 2));

  });
}

export default wordsAPI;