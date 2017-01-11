const cheerio = require('cheerio');
const request = require('./../helper/request');
const log = require('./../helper/log');
const config = require('./../config/config');


/**
 * 获取方案计划完成情况
 * @param {string} cookie cookie
 * @returns {Promise} 查询正确时返回方案计划完成情况
 */
const getPlanInfo = (cookie) => {
  const postData = '';
  const options = {
    host: config.hostname,
    method: 'GET',
    path: config.paths.plan,
    headers: {
      Cookie: cookie,
    },
  };
  return request(postData, options)
    .then((result) => {
      const successText = '成绩查询';
      const errorText = {
        database: '数据库忙请稍候再试',
        notLogin: '请您登录后再使用',
      };
      const dom = result.body.replace(/\s+/g, '');
      console.log('dom: ', dom);
      if (dom.indexOf(errorText.database) !== -1) {
        return Promise.reject(new Error('数据库忙请稍候再试'));
      } else if (dom.indexOf(errorText.notLogin) !== -1) {
        return Promise.reject(new Error('请您登录后再使用'));
      } else if (dom.indexOf(successText) !== -1) {
        const regexp = /tree\.add\([\\/.,\-'":：()、[\]ⅠⅡ（）\w\s\u4e00-\u9fa5]+\);/g;
        const classes = dom.match(regexp);
        return Promise.resolve(classes);
      }
      return Promise.reject(new Error('身份信息失效，请重新登录后再查看成绩'));
    })
    .catch((excepiton) => {
      log.error('获取成绩列表失败');
      log.error(excepiton);
      return Promise.reject(new Error('获取成绩列表失败'));
    });
};


module.exports = getPlanInfo;
