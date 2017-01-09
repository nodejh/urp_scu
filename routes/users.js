const express = require('express');
const jwt = require('jwt-simple');
const config = require('./../config/config');
const getCurrentTermGrade = require('./../models/getCurrentTermGrade');


const router = new express.Router();

/**
 * 成绩页面
 */
router.get('/grade', (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.redirect('/');
  }
  try {
    const cookie = jwt.decode(token, config.secret);
    getCurrentTermGrade(cookie.cookie)
      .then((grade) => {
        console.log(grade);
        return res.render('user_grade', {
          title: '本学期成绩',
          grade,
        });
      })
      .catch((exception) => {
        console.log('exception: ', exception);
        return res.redirect('/');
        // return res.render('error', {
        //   message: exception.message,
        //   error: exception,
        // });
      });
  } catch (exception) {
    console.log('exception: ', exception);
    return res.redirect('/');
    // return res.render('error', {
    //   message: exception.message,
    //   error: exception,
    // });
  }
});

module.exports = router;
