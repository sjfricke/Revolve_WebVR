(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var DataSchema = new Schema({
        "vertexs[]": [Number],
        "code": Number
    });

module.exports = mongoose.model('Data', DataSchema);

})();