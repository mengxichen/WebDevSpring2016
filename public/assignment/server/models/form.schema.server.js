/**
 * Created by mengxichen on 3/25/16.
 */
module.exports=function(mongoose){
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: Date,
        update: Date
    },{collection:'form'});

    return FormSchema;
}