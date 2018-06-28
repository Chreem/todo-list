const mockData = [
  {
    id: '1',
    account: 'admin',
    password: 'admin',
    nickname: '中文名...',
    message: 'f**k'
  }, {
    id: '2',
    account: 'user',
    password: '888',
    nickname: '测试中文..........',
    message: 'wo ho?'
  }
];

module.exports = {
  login(a, p) {
    const user = mockData.filter(item => item.account === a)[0];
    const PASS_CHECK = user && user.password === p;
    const result = {
      error: PASS_CHECK ? '0' : '1',
      message: PASS_CHECK ? '' : '用户名密码错误',
    };
    if (PASS_CHECK) {
      const {password, ...other} = user;
      result.data = {...other}
    }
    return result;
  },

  info(id) {
    const user = mockData.filter(item => item.id === id)[0];
    const result = {
      error: user ? '0' : '1',
      message: user ? '' : '用户不存在'
    };
    if (user) {
      const {password, ...other} = user;
      result.data = {...other}
    }
    return result
  }
};