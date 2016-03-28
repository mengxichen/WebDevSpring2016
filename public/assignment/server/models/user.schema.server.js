/**
 * Created by mengxichen on 3/25/16.
 */
module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        phones: [String]
    },{collection: 'user'});


    return UserSchema;
}