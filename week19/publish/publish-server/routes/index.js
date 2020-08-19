var express = require('express');
var router = express.Router();
var fs = require('fs');
const { request } = require('http');

router.post('/', function(req, res, next) {
  console.log(req);
  fs.writeFileSync("../server/public/" + req.query.filename, req.body.content)
  res.send('');
  res.end('')
});

module.exports = router;
