const axios = require('axios')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', function (req, res) {
  var url = 'http://120.26.6.213:2401/forward-service/api';
  // var url = 'http://m.wzcddev.hichengdai.com/api';
  // var url = 'http://192.168.8.108:8080/forward-service/api';
 // var url = 'http://47.110.249.120:2401/forward-service/api'; // 线上
  var _body = req.body;
  var param = 'code=' + _body.code + '&json=' + encodeURIComponent(_body.json);
  // console.log(param);
  axios.post(url, param).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    res.json({ errorInfo: 'error', errorCode: 1 });
  });
  var now = new Date();
  let time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() +
    ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  console.log(time + ': ' + 'code=' + _body.code + '&json=' + _body.json);
});

app.listen(9099, function(){
  console.log('Node app start at port 9099')
});
