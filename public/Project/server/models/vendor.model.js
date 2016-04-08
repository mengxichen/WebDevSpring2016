/**
 * Created by mengxichen on 4/8/16.
 */
var q = require("q");

module.exports = function(mongoose, db) {
    var VendorSchema = require("./vendor.schema.server.js")(mongoose);

    var VendorModel = mongoose.model('Vendor', VendorSchema);

    var api = {



    };

    return api;


}