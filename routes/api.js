
(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();

  router.use('/loadSave', require('./loadSave')); 
  router.use('/count', require('./count')); 


  module.exports = router;

})();


