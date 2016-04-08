/**
 * Created by mengxichen on 4/8/16.
 */
module.exports = function(mongoose){
    var AppointmentSchema = mongoose.Schema({
        vendorId: Object,
        userId: Object,
        startTime: Date,
        endTime: Date,
        price: Number,
        payment_Method:String, enum:['credit Card','check payment','cash'],
        discount: Number

    },{collection:'appointment'});

    return AppointmentSchema;
}