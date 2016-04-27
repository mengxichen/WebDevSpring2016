/**
 * Created by mengxichen on 4/8/16.
 */
module.exports = function(mongoose){
    var ReviewSchema = mongoose.Schema({
        vendorUsername: Object,
        username: Object,
        time: Date,
        rating: Number,
        comment:String

    },{collection:'review'});

    return ReviewSchema;
}