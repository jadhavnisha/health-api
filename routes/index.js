var express = require('express');
const axios = require('axios');
const medicationUrl = "https://api.humanapi.co/v1/human/bmi/readings?access_token=demo"; 
const detailsUrl = "https://api.humanapi.co/v1/human/medical/vitals?access_token=demo"; 
var router = express.Router();
var convert = require('convert-units')

/* GET home page. */
router.get('/reading', function(req, res, next) {
  axios.get(medicationUrl).then((response)=>{
      res.setHeader("Content-Type", "application/json");
      res.send({"result":response.data})
      res.end();
  }).catch((error)=>{
      console.log(`Unable to get the result ${error}`);
  })
});

router.get('/details', function(req, res, next) {
  axios.get(detailsUrl).then((response)=>{
      console.log(response.data[0].results);
      
      var data= response.data[0].results;
      var result= {};
      result['date'] = (new Date(response.data[0].dateTime)).toISOString();
      var height = data.filter(blog => blog.name === 'HEIGHT' )[0].value;
      result['height'] = convert(height).from('cm').to('ft');
      var weight = data.filter(blog => blog.name === 'WEIGHT' )[0].value;
      result['weight'] = convert(weight).from('kg').to('lb');     
      var sys_bp = data.filter(blog => blog.name === 'SYSTOLIC BLOOD PRESSURE' )[0].value;
      result['sys_bp'] = sys_bp;
      var di_bp = data.filter(blog => blog.name === 'DIASTOLIC BLOOD PRESSURE' )[0].value;
      result['di_bp'] = di_bp;
      console.log(result);
      res.setHeader("Content-Type", "application/json");
      res.send({"result":result})
      res.end();
  }).catch((error)=>{
      console.log(`Unable to get the result ${error}`);
  })
});


module.exports = router;
