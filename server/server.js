const axios = require('axios')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', function (req, res) {
  // var url = 'http://121.43.101.148:3701/forward-service/api';
  // var url = 'http://121.43.101.148:4001/forward-service/api';
  // var url = 'http://121.43.101.148:4101/forward-service/api';
  // var url = 'http://47.96.161.183:4001/forward-service/api';
  // var url = 'http://47.96.161.183:4401/forward-service/api';
  var url = 'http://106.14.173.9:4301/forward-service/api';
  var _body = req.body;
  var param = 'code=' + _body.code + '&json=' + encodeURIComponent(_body.json);
  console.log(param);
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
  })
});

app.listen(9091, function(){
  console.log('Node app start at port 9091')
});
