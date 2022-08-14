var express=require("express");
var bodyParser=require("body-parser");
var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
var student=require('./studentdb.js');
var teacher=require('./teacherdb.js');
var grade=require('./gradedb.js');
app.use(express.static('public'));
//app.use(express.static(__dirname+'/public'));


//                                   ***check login***

app.post("/check",(req,res)=>{
    let e=req.body.eid;
    let p=req.body.psd;
    if(e[0]==1)
    {

        console.log("student");

        student.findOne({id:e},(err,allstudent)=>{
            if(err){
                res.type('html').status(500);
                res.send('Error: '+ err);
            }
            else if(allstudent.length==0){
                res.type('html').status(200);
                res.send('There are no people');
            }
            else{

                if(allstudent.id==e && allstudent.password==p)
                {
                    console.log("stident login");
                    res.render('student_main_page.ejs',{Student:allstudent});
                }
                else
                {
                    res.render('login.ejs');
                }

            }
        });

    }
    else if(e[0]=='t'){


        teacher.findOne({idt:e},(err,allteacher)=>{
            if(err){
                res.type('html').status(500);
                res.send('Error: '+ err);
            }
            else if(allteacher.length==0){
                res.type('html').status(200);
                res.send('There are no people');
            }
            else{
                if(allteacher.idt==e && allteacher.password==p)
                {

                    res.render('teacher_main_page.ejs',{Teacher:allteacher});
                }
                else
                {
                    res.render('login.ejs');
                }
            }
        });


    }
    else{
        if(e==777 && p==777) {
            res.render("admin_main_page.ejs");
            // res.send("welcome "+e);
        }
        else
        {
            res.render('login.ejs');
        }
    }



});//end function

//                                            check grade
app.get('/checkgrade/:id/:suid',(req,res)=>{
    var sid=req.params.id;
    var sbid=req.params.suid;
    console.log(sid);
    console.log(sbid);
    grade.find((err,allgrade)=>{
        if(err){
            res.type('html').status(500);
            res.send('Error: '+ err);
        }
        else if(allgrade.length==0){
            res.type('html').status(200);
            res.send('There aew no people');
        }
        else{
            res.render('show_student_grade.ejs',{Grade:allgrade,sbid,sid});
        }
    });



});







var idss;
var idstd="19014156-00";

///                                     ***save student form and store data***
app.post('/save_student_data',(req,res)=>{


var newstudent=new student({
    name:req.body.name,
    fname:req.body.fname,
    city:req.body.city,
    id:req.body.ids,
    password:req.body.psd,
    phoneno:req.body.phoneno,
    interno:req.body.interno,
    clas:req.body.clas,
});
newstudent.save((err)=>{

   if(err){
       res.type('html').status(500);
       res.send('Error: '+ err);
   }
   else{
       res.render('showstudent.ejs',{student:newstudent});
   }
});
});//end function

//                                     ***save teacher form and store data***
app.post('/save_teacher_data',(req,res)=>{


    var newteacher=new teacher({
        name:req.body.name,
        fname:req.body.fname,
        city:req.body.city,
        idt:req.body.id,
        password:req.body.password,
        quli:req.body.Qualification,
        subn:req.body.Subject_name,
        subid:req.body.Subject_ID,

    });
    newteacher.save((err)=>{

        if(err){
            res.type('html').status(500);
            res.send('Error: '+ err);
        }
        else{
            res.render('showteacher.ejs',{teacher:newteacher});
        }
    });
});

//                                                     **save student grade**
app.post('/save_student_grade',(req,res)=>{


    var newgrade=new grade({
        id:req.body.id,
        quiz:req.body.quiz,
        Ass:req.body.ass,
        pre:req.body.pre,
        mid:req.body.mid,
        final:req.body.final,
        subid:req.body.subid
    });
    newgrade.save((err)=>{

        if(err){
            res.type('html').status(500);
            res.send('Error: '+ err);
        }
        else{
            res.render('showgrade.ejs',{Grade:newgrade});
        }
    });
});//end function






app.use('/a',(req,res)=>{
    res.send("RANA ABOBAKAR");
});
// send login ejs file                                         www.edu.com
app.use('/www.edu.com',(req,res)=>{
    res.sendfile(__dirname+"/login.html");
});
//login ejs
app.use('/uog',(req,res)=>{
    res.render("login.ejs");
});

//                                               ***student management***
app.use('/studentManage',(req,res)=>{
    res.render("student_edit.ejs");
});

//                                                 ***teacher management***
app.use('/teacherManage',(req,res)=>{
    res.render("teacher_edit.ejs");
});

//                                                         ****login html

app.use('/login',(req,res)=>{
    res.sendfile(__dirname+"/login.html");
});

//                                                    ***student form***
app.use('/studentform',(req,res)=>{
    res.sendfile(__dirname+"/studentform.html");
});

//                                                    ***teacher form***
app.use('/teacherform',(req,res)=>{
    res.sendfile(__dirname+"/teacherform.html");
});

//                                                      ***grade form***
app.use('/gradeform',(req,res)=>{
    res.sendfile(__dirname+"/gradeform.html");
});



//                                                     **show all student**
app.use('/allstudent',(req,res)=>{
    student.find((err,allstudent)=>{
        if(err){
            res.type('html').status(500);
            res.send('Error: '+ err);
        }
        else if(allstudent.length==0){
           res.type('html').status(200);
           res.send('There aew no people');
        }
        else{
            res.render('showstudentdata.ejs',{studentall:allstudent});
        }
    });
});


//                                                        **show all teacher**

app.use('/allteacher',(req,res)=>{
    teacher.find((err,allteacher)=>{
        if(err){
            res.type('html').status(500);
            res.send('Error: '+ err);
        }
        else if(allteacher.length==0){
            res.type('html').status(200);
            res.send('There aew no people');
        }
        else{
            res.render('showteacherdata.ejs',{teacherall:allteacher});
        }
    });
});


//                                                        **show all grade**

app.use('/allgrade',(req,res)=>{
    grade.find((err,allgrade)=>{
        if(err){
            res.type('html').status(500);
            res.send('Error: '+ err);
        }
        else if(allgrade.length==0){
            res.type('html').status(200);
            res.send('There aew no people');
        }
        else{
            res.render('showgradedata.ejs',{Grade:allgrade});
        }
    });
});

//                                                             ***gpa***
app.use('/gpa',(req,res)=>{
    res.render("gpa.ejs");
});
//                                                           ***TIME TABLE***
app.use('/timetable',(req,res)=>{
    res.render("time_table.ejs");
});

//                                                                ***info***
app.use('/info',(req,res)=>{
    res.render("info.ejs");
});

     //                                                        ***server port***
app.listen(8000,()=>{
    console.log("server 8000 run");
});
//mongodb+srv://abobakar:rana777@cluster0.gock5.mongodb.net/test?retryWrites=true&w=majority

