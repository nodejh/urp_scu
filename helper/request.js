const http = require('http');
const iconv = require('iconv-lite');
const log = require('./../helper/log');


/**
 * 发送 HTTP 请求
 * @param {object} postData 请求数据
 * @param {object} options header信息
 * @returns {Promise} 返回请求结果，包含headers和body
 */
const request = (postData, options) => {
  log.info('发送HTTP请求');
  log.info(options);
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      // log.info(`STATUS: ${res.statusCode}`);
      // log.info(`HEADERS: ${JSON.stringify(res.headers)}`);
      let body = '';

      res.on('data', (chunk) => {
        body += iconv.decode(chunk, 'GBK');
      });

      res.on('end', () => {
        // log.info(`BODY: ${body}`);
        resolve({
          headers: res.headers,
          body,
        });
      });
    });

    req.on('error', (error) => {
      log.error(error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
};


module.exports = request;
