const cheerio = require('cheerio');
const request = require('./../helper/request');
const log = require('./../helper/log');
const config = require('./../config/config');
const calculateGpa = require('./../helper/calculateGpa').calculateGpa;


/**
 * 获取所有学期成绩
 * @param {string} cookie cookie
 * @returns {Promise} 查询正确时返回成绩列表
 */
const getAllPassGrades = (cookie) => {
  const postData = '';
  const options = {
    host: config.hostname,
    method: 'GET',
    path: config.paths.allPassGrades,
    headers: {
      Cookie: cookie,
    },
  };
  return request(postData, options)
    .then((result) => {
      const successText = '学期';
      const errorText = {
        database: '数据库忙请稍候再试',
        notLogin: '请您登录后再使用',
      };
      const dom = result.body;
      if (dom.indexOf(errorText.database) !== -1) {
        return Promise.reject(new Error('数据库忙请稍候再试'));
      } else if (dom.indexOf(errorText.notLogin) !== -1) {
        return Promise.reject(new Error('请您登录后再使用'));
      } else if (dom.indexOf(successText) !== -1) {
        const $ = cheerio.load(dom, {
          ignoreWhitespace: true,
          xmlMode: false,
          lowerCaseTags: false,
        });
        const $gradeTable = $('body').find('table[class="titleTop2"]');
        const allPassGrades = [];
        $gradeTable.each(function gradeTableItem() {
          // 获取每一学期成绩
          const gradeList = {};
          gradeList.term = $(this).prev().prev().text()
            .replace(/\s+/g, '');
          gradeList.list = [];
          const gradeTableTr = $(this).find('table[id="user"] tr');
          gradeTableTr.each(function gradeTableTrItem(index) {
            // 获取每一学期成绩中的每一项成绩
            if (index > 0) {
              gradeList.list.push({
                courseNumber: $(this).find('td').eq(0).text()
                  .replace(/\s+/g, ''), // 课程号
                lessonNumber: $(this).find('td').eq(1).text()
                  .replace(/\s+/g, ''), // 课序号
                courseName: $(this).find('td').eq(2).text()
                  .replace(/(^\s+)|(\s+$)/g, ''), // 课程名
                courseEnglishName: $(this).find('td').eq(3).text()
                  .replace(/(^\s+)|(\s+$)/g, ''), // 英文课程名
                credit: $(this).find('td').eq(4).text()
                  .replace(/\s+/g, ''), // 学分
                courseProperty: $(this).find('td').eq(5).text()
                  .replace(/\s+/g, ''), // 课程属性
                grade: $(this).find('td').eq(6).text()
                  .replace(/\s+/g, ''), // 成绩
              });
            }
          });

          // 获取绩点计算结果
          const caculateResult = calculateGpa(gradeList.list);
          gradeList.averageGpa = caculateResult.averageGpa;
          gradeList.averageGrade = caculateResult.averageGrade;
          gradeList.averageGpaObligatory = caculateResult.averageGpaObligatory;
          gradeList.averageGradeObligatory = caculateResult.averageGradeObligatory;
          gradeList.sumCredit = caculateResult.sumCredit;
          gradeList.sumCreditObligatory = caculateResult.sumCreditObligatory;
          allPassGrades.push(gradeList);
        });
        log.info('allPassGrades: ', allPassGrades);
        return Promise.resolve(allPassGrades);
      }
      return Promise.reject(new Error('身份信息失效，请重新登录后再查看成绩'));
    })
    .catch((excepiton) => {
      log.error('获取成绩列表失败');
      log.error(excepiton);
      return Promise.reject(new Error('获取成绩列表失败'));
    });
};


module.exports = getAllPassGrades;
