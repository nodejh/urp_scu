var s = 'tree.add("0","-1",\'公共课(最低修读学分:33,通过学分:29.0,已修课程门数:22,已通过课程门数:21,未通过课程门数:1)\',"","null","ifra","img/kzxx.gif","img/kzxx.gif");tree.add("1","0",\'必修(最低修读学分:33,通过学分:29.0,已修课程门数:22,已通过课程门数:21,未通过课程门数:1)\',"","null","ifra","img/kzxx.gif","img/kzxx.gif");tree.add("12","1",\'[304112010]新生研讨课[1](必修,81.0(2016-01-14))\',"","null","ifra","img/yxjg.gif","img/yxjg.gif");tree.add("13","1",\'[107032030]思想道德修养与法律基础[3](必修,80.0(2014-01-10))\',"","null","ifra","img/yxjg.gif","img/yxjg.gif");tree.add("14","1",\'[105366020]大学英语（综合）-1[2](必修,63.0(2014-01-10))\',"","null","ifra","img/yxjg.gif","img/yxjg.gif");tree.add("15","1",\'[105367010]大学英语（口语）-1[1](必修,77.0(2014-01-10))\',"","null","ifra","img/yxjg.gif","img/yxjg.gif");';


const regexp = /tree\.add\([\\/.,\-'":()[\]（）\w\s\u4e00-\u9fa5]+\);/g;
const matches = s.match(regexp);
const t = s.match(/\d+/g);
