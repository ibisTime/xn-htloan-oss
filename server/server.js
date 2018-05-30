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

app.listen(9091, function(){
  console.log('Node app start at port 9091')
});
