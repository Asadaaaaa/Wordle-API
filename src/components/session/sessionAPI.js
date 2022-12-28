// Library
import { nanoid } from "nanoid";

const sessionAPI = (server, api) => {
  api.get('/api/session', (req, res) => {
    const sessionCode = nanoid();
    
    server.session[sessionCode] = {
      guessed: [],
      word: null
    }
    
    res.send({
      sessionCode: sessionCode
    });
  });
};

export default sessionAPI;