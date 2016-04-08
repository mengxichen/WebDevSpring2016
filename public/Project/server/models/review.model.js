/**
 * Created by mengxichen on 4/8/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {
    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    var ReviewModel = mongoose.model('Review', ReviewSchema);

    var api = {};

    return api;

}