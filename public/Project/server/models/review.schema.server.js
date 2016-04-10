/**
 * Created by mengxichen on 4/8/16.
 */
module.exports = function(mongoose){
    var ReviewSchema = mongoose.Schema({
        vendorId: Object,
        userId: Object,
        time: Date,
        serviceType: String,enum:['Carpet Cleaning', 'Plumber','Roof Repair', 'Home Innovation', 'Arborist/Tree Pruning',' Yard Care'],
        rating: Number

    },{collection:'review'});

    return ReviewSchema;
}