var express = require('express');
const axios = require('axios');
const medicationUrl = "https://api.humanapi.co/v1/human/medical/vitals?access_token=demo" 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  axios.get(medicationUrl).then((response)=>{
      console.log(response.data[0].results);
      res.setHeader("Content-Type", "application/json");
      // res.writeHead(200, {'Content-Type': 'application/javascript'});
      // res.write('result'=>'response.result');
      // res.write("fdfd"+response.data);
      res.send({"result":response.data[0]})
      res.end();
  }).catch((error)=>{
      console.log(`Unable to get the result ${error}`);
  })
});



// const http = require('http');
// http.createServer(function (req, res) {
//   axios.get(medicationUrl).then((response)=>{
//       console.log(response.data[0].results);
//       res.setHeader("Content-Type", "application/json");
//       // res.writeHead(200, {'Content-Type': 'application/javascript'});
//       // res.write('result'=>'response.result');
//       res.write("fdfd"+response.data);
//       res.end();
//   }).catch((error)=>{
//       console.log(`Unable to get the result ${error}`);
//   })
// }).listen(3001);
// console.log('Server running at http://localhost:3001/');

module.exports = router;
