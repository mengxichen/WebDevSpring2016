/**
 * Created by mengxichen on 3/25/16.
 */
module.exports=function(mongoose){
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [{type:mongoose.Schema.Types.Object, ref:'field'}],
        created: {type: Date, default: Date.now},
        update: {type: Date, default: Date.now}
    },{collection:'service'});

    return FormSchema;
}