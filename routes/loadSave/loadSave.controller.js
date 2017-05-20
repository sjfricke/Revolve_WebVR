(function() {
    'use strict';

    var Data = require('./loadSave.model');


//Basic CRUD
    
    //grab all for display
    module.exports.getAll = function(req, res) { 
        Data.find({}, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };
    
    module.exports.get = function(req, res) {
        Data.find({code: req.params.code}, function(err, post) {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
          if (post.length < 1) {
              return res.status(501).send("Code Not Found!");
          }
          res.json(post);

        });
    };
    
    //create a new post
    module.exports.create = function(req, res) {
        var data = new Data(req.body);
        data.save(function(err, post) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }
          res.json(post);
        });
     };
    

  

 
    
    
})();