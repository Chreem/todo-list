const {QRCODE_EXPIRES, QRCODE_EXPIRES_OFFSET} = require('../config');
const crypto = require('crypto');

module.exports = (app, client) => {
  const http = require('http').Server(app);
  const io = require('socket.io')(http);

  const generatorSID = () => {
    const sid = crypto.createHash('md5').update(new Date().toLocaleString()).digest('hex');
    client.set(sid, '1', 'EX', (QRCODE_EXPIRES + QRCODE_EXPIRES_OFFSET) / 1000);
    return sid;
  };

  io.on('connect', socket => {
    const expiresRefresh = () => {
      const sid = generatorSID();
      socket.join(sid);
      return socket.emit('expires refresh', {sid, expires: QRCODE_EXPIRES})
    };
    expiresRefresh() && setInterval(expiresRefresh, QRCODE_EXPIRES);
  });

  return {http, io}
};