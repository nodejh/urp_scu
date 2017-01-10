const express = require('express');
const jwt = require('jwt-simple');
const config = require('./../config/config');
const getCurrentTermGrade = require('./../crawler/getCurrentTermGrade');
const getAllPassGrades = require('./../crawler/getAllPassGrades');
const calculateGpa = require('./../helper/calculateGpa');

const router = new express.Router();


/**
 * 本学期成绩页面
 */
router.get('/grade', (req, res) => {
  const reqCookies = req.cookies;
  if (!reqCookies) {
    return res.redirect('/');
  }
  const token = reqCookies.token;
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
        return res.render('users_grade', {
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
  const reqCookies = req.cookies;
  if (!reqCookies) {
    return res.redirect('/');
  }
  const token = reqCookies.token;
  if (!token) {
    return res.redirect('/');
  }
  try {
    const cookie = jwt.decode(token, config.secret);
    getAllPassGrades(cookie.cookie)
      .then((grades) => {
        res.render('users_grades', {
          title: '所有学期成绩',
          grades,
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
 * 方案完成情况
 */
router.get('/plan', (req, res) => {
  const reqCookies = req.cookies;
  if (!reqCookies) {
    return res.redirect('/');
  }
  const token = reqCookies.token;
  if (!token) {
    return res.redirect('/');
  }
  res.render('users_plan', {
    title: '方案完成情况',
  });
});


/**
 * 课表
 */
router.get('/curriculum', (req, res) => {
  const reqCookies = req.cookies;
  if (!reqCookies) {
    return res.redirect('/');
  }
  const token = reqCookies.token;
  if (!token) {
    return res.redirect('/');
  }
  res.render('users_curriculum', {
    title: '课表',
  });
});


module.exports = router;
