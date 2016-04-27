/**
 * Created by mengxichen on 3/25/16.
 */
module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        name:String,
        phone:String,
        email: String,
        zipCode:String,
        address:String,
        categories:[String],
        role:String,enum:['admin','customer','vendor']

    },{collection: 'projectUser'});


    return UserSchema;
};