/**
 * Created by mengxichen on 3/25/16.
 */
module.exports=function(mongoose){
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [String],
        created: Date,
        update: Date
    })
}