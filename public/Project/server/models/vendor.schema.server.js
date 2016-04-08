/**
 * Created by mengxichen on 4/8/16.
 */
module.exports = function(mongoose){
    var VendorSchema = mongoose.Schema({
        vendorName: String,
        address: String,
        phone: String,
        email: String,
        rating: Number,
        specialty: [String]

    },{collection:'vendor'});

    return VendorSchema;
}