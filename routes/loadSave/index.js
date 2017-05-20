(function() {
  'use strict';

  var express = require('express');
  var controller = require('./loadSave.controller')    
    
  var router = express.Router();

  router.get('/', controller.getAll);
  router.get('/:code', controller.get);
  router.post('/', controller.create);

  module.exports = router;

})();