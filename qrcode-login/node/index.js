const app = require('express')();
const client = require('./redis');

/**
 * init params
 */
const checkLogin = require('./user');
const {
  LISTEN_PORT,
  DOWNLOAD_APP_LINK,
  LOGIN_EXPIRES
} = require('./config');


/**
 * middleware
 */
app.use(require('body-parser').json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  next();
});
const session = require('express-session');
app.use(session({
  secret: new Date().toLocaleString(),
  maxAge: 60 * 1000 * 30,
  resave: false,
  saveUninitialized: false
}));


/**
 * socket.io
 */
const { http, io } = require('./socket.io')(app, client);


/**
 * router
 */
// app login
app.post('/login', (req, res) => {
  const { a, p } = req.body;
  const data = checkLogin.login(a, p);
  if (data.error === '1') return res.send({ error: '1', message: '用户名或密码错误' });
  const token = req.session.id;
  client.set(data.data.id, token, 'EX', LOGIN_EXPIRES / 1000);
  data.token = token;
  setTimeout(() => res.send(data), 1500);
});


// 验证, FE QRCode sid && User token
// 只能使用get, 以使其他应用扫描跳到下载页
app.get('/auth', async (req, res) => {
  const toDownload = () => {
    res.writeHeader(302, { Location: DOWNLOAD_APP_LINK });
    res.end();
  };

  const { sid } = req.query;
  const token = req.headers['self-define-token'];
  const uid = req.headers['self-define-uid'];
  if (!sid || !token || !uid) return toDownload();
  try {
    const [rsid, rtoken] = await Promise.all([client.getAsync(sid), client.getAsync(uid)]);
    if (rsid === '' || rtoken === '' || token !== rtoken) return toDownload();
    io.sockets.to(sid).emit('scan success', { scan: true });
    res.send({ error: '0', message: '扫描成功' });
  }

  catch (e) {
    console.log(e);
    return toDownload(e);
  }
});

app.post('/confirm', async (req, res) => {
  const cancelLogin = (msg) => {
    io.sockets.to(sid).emit('confirm login', { login: false });
    return res.send({ error: '1', message: msg });
  };
  const { sid, token, uid } = req.body;
  if (!sid || !token || !uid) return cancelLogin('信息缺失');
  try {
    const [rsid, rtoken] = await Promise.all([client.getAsync(sid), client.getAsync(uid)]);
    if (rsid === '' || rtoken === '' || token !== rtoken) return cancelLogin('校验失败');
    const data = checkLogin.info(uid);
    if (data.error !== '0') return cancelLogin('无此用户');
    data.token = token;
    io.sockets.to(sid).emit('confirm login', { login: true, data: data.data, token: data.token });
    res.send({ error: '0', message: '登录信息已发送' });
  }

  catch (e) {
    console.log(e);
    cancelLogin('未知错误')
  }
});


/**
 * server start
 */
http.listen(LISTEN_PORT, '0.0.0.0', () => console.log(`be already listen on port: ${LISTEN_PORT}`));
