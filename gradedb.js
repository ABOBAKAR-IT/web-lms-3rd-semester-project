var mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/studentData', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology:true,
}).then(()=> {
    console.log("connection grade mongodb");}).catch(()=>{
    console.log("connection not sorry");
});
var Schema=mongoose.Schema;
var gradeShema=new Schema({
    id:{type:String ,required:true },
    quiz:{type:Number ,required:true ,max:5},
    Ass:{type:Number ,required:true, max:10},
    pre:{type:Number ,required:true ,max:10},
    mid:{type:Number ,required:true ,max:25},
    final:{type:Number ,required:true ,max:50},
    subid:{type:String ,required:true }
});
module.exports=mongoose.model('grade',gradeShema);
