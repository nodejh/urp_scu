const config = {
  port: 3600,
  secret: 'asfqerqwerqwerx',
  expires: 30 * 24 * 60 * 60 * 1000, // cookie 过期时间
  hostname: '202.115.47.141',
  paths: {
    // 登录
    login: '/loginAction.do',
    // 当前学期成绩列表
    currentTermGrade: '/bxqcjcxAction.do?pageSize=100',
    // lnxndm 为学期数目。如果参数的值没有对应的学期，则会显示所有学期成绩
    allPassGrades: '/gradeLnAllAction.do?type=ln&oper=qbinfo&lnxndm=1',
    // 方案计划完成情况
    plan: '/gradeLnAllAction.do?type=ln&oper=lnfaqk&flag=zx',
  },
};


module.exports = config;
