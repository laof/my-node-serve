var express = require('express')
var app = express()
app.use(express.static('dist'));
app.get('/*', function (req, res) {
//   res.send({EE:11})
res.sendfile('dist/index.html')
})
 
app.listen(3000);