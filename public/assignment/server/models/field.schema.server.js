/**
 * Created by mengxichen on 3/25/16.
 */
module.exports = function(mongoose){
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label:String,value:String}]
    })
}