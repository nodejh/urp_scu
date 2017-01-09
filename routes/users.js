const express = require('express');
const jwt = require('jwt-simple');
const config = require('./../config/config');
const getCurrentTermGrade = require('./../models/getCurrentTermGrade');
const calculateGpa = require('./../helper/calculateGpa');

const router = new express.Router();

/**
 * 本学期成绩页面
 */
router.get('/grade', (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.redirect('/');
  }
  try {
    const cookie = jwt.decode(token, config.secret);
    getCurrentTermGrade(cookie.cookie)
      .then((result) => {
        let allCredit = 0;
        const gradeList = result.filter((item) => {
          allCredit += parseInt(item.credit, 10);
          if (item.grade) {
            return item;
          }
          return false;
        });
        const gpa = calculateGpa.calculateGpa(gradeList);
        return res.render('user_grade', {
          title: '本学期成绩',
          grade: result,
          gpa,
          gradeList,
          allCredit,
        });
      })
      .catch((exception) => {
        console.log('exception: ', exception);
        return res.redirect('/');
      });
  } catch (exception) {
    console.log('exception: ', exception);
    return res.redirect('/');
  }
});


/**
 * 所有学期成绩
 */
router.get('/grades', (req, res) => {

});


module.exports = router;
