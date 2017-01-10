/**
 * 重置footer位置
 */
function footerPosition() {
  $("footer").removeClass("fixed-bottom");
  var contentHeight = document.body.scrollHeight,//网页正文全文高度
    winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
  if (!(contentHeight > winHeight)) {
    //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
    $("footer").addClass("fixed-bottom");
  } else {
    $("footer").removeClass("fixed-bottom");
  }
}
footerPosition();
$(window).resize(footerPosition);


/**
 * active菜单
 */
function activeMenu() {
  var pathname = window.location.pathname;
  var path = pathname.substring(pathname.lastIndexOf('/') + 1);
  $('#' + path).addClass('active cm-active');
}
activeMenu();


/**
 * 创建cookie
 * @param {string} name
 * @param {string} value
 * @param {number} days
 */
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();
  } else {
    var expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}


/**
 * 读取cookie
 * @param {string} name cookie名称
 * @returns {*}
 */
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ')
      c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
}


/**
 * 清除cookie
 * @param {string} name cookie名称
 */
function eraseCookie(name) {
  createCookie(name, "", -1);
}


/**
 * 获取URL参数
 */
var QueryString = function () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [
        query_string[pair[0]],
        decodeURIComponent(pair[1])
      ];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}();
