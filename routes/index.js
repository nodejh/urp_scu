const express = require('express');
const jwt = require('jwt-simple');
const config = require('./../config/config');
const login = require('./../crawler/loginZhjw');


const router = new express.Router();


/**
 * 首页
 */
router.get('/', (req, res) => {
  res.render('index', {
    title: '四川大学非官方教务系统',
  });
});


/**
 * 登录
 */
router.post('/login', (req, res) => {
  const number = req.body.number;
  const password = req.body.password;
  if (!number) {
    return res.json({
      code: '1001',
      message: '学号不能为空',
    });
  }
  if (!password) {
    return res.json({
      code: '1002',
      message: '密码不能为空',
    });
  }

  // 登录教务系统
  login(number, password)
    .then((cookie) => {
      const token = jwt.encode({ cookie }, config.secret);
      const cookieOption = { expires: new Date(Date.now() + config.expires), httpOnly: true };
      res.cookie('token', token, cookieOption);
      res.json({
        code: 0,
        message: '登录成功',
      });
    })
    .catch((exception) => {
      res.json({
        code: 1003,
        message: exception.message,
      });
    });
});


/**
 * 退出登录
 */
router.get('/logout', (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  console.log(req.signedCookies);
  console.log('token: ', req.cookies.token);
  res.clearCookie('token', { path: '/' });
  res.redirect('/');
});


/**
 * 绩点计算规则
 * @type {e.Router|*}
 */
router.get('/calculate_rule', (req, res) => {
  res.render('calculate_rule', {
    title: '绩点计算规则',
  });
});


module.exports = router;
