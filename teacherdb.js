var mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/studentData', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
}).then(()=> {
    console.log("connection teacher mongodb");}).catch(()=>{
    console.log("connection not sorry");
});
var Schema=mongoose.Schema;
var teacherShema=new Schema({
    name:{type:String ,required:true },
    fname:{type:String ,required:true },
    city:{type:String ,required:true },
    idt:{type:String ,required:true,unique:true},
    password:{type:String ,required:true },
    quli:{type:String ,required:true },
    subn:{type:String ,required:true },
    subid:{type:String ,required:true },

});
module.exports=mongoose.model('teacher',teacherShema);
