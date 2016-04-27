/**
 * Created by mengxichen on 4/8/16.
 */
module.exports = function(mongoose){
    var AppointmentSchema = mongoose.Schema({
        vendorUsername: String,
        username: String,
        startTime: Date,
        endTime: Date,
        price: Number,
        payment:String, enum:['credit Card','check payment','cash'],
        status:String,enum:['pending','confirmed','canceled']

    },{collection:'appointment'});

    return AppointmentSchema;
}