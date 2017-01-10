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
      const dom = result.body;
      console.log('dom: ', dom);
      log.text('dom.indexOf(successText): ', dom.indexOf(successText));
      if (dom.indexOf(successText) !== -1) {
        const $ = cheerio.load(dom, {
          ignoreWhitespace: true,
          xmlMode: false,
          lowerCaseTags: false,
        });
        const $list = $('body').find('table[id="user"]').find('tr');
        const grade = [];
        // eslint-disable-line
        log.info('grade: ', grade);
        return Promise.resolve(grade);
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
