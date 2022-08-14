var mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/studentData', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
}).then(()=> {
    console.log("connection student mongodb");}).catch(()=>{
    console.log("connection not sorry");
});
var Schema=mongoose.Schema;
var studentShema=new Schema({
    name:{type:String ,required:true },
    fname:{type:String ,required:true },
    city:{type:String ,required:true },
    id:{type:String ,required:true ,unique:true },
    password:{type:String ,required:true },
    phoneno:{type:Number ,required:true },
    interno:{type:Number ,required:true },
    clas:{type:String ,required:true }

});
module.exports=mongoose.model('student',studentShema);
