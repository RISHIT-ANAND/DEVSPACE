var express = require('express');
var app = express();
const path = require('path');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use('/:agreeId',express.static(path.join(__dirname, 'vendorForm')));

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'procurementassistantvit21@gmail.com',
      pass: 'N0sleept0d@y'
    }
});
var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : 'remotemysql.com',
    user     : 'Uiz0hUNUje',
    password : 'k24nEVIJ78',
    database : 'Uiz0hUNUje'
});
//connection.connect();
var sendres=null;


schedule.scheduleJob('0 0 * * *', () => { 
    connection.query('select vpid, vendorname, email from vp left join Vendor on vp.vendorid=Vendor.vendorid where Vendor.vendorid in (select vendorid from vp where productid in(select productid from Agreement where datediff(expirydate,curdate())<15))', function (error, results, fields) {
        if (error) throw error;
        var arr=results.map((val,index)=>{
            var mailOptions = {
                from: 'procurementassistantvit21@gmail.com',
                to: val["email"],
                subject: 'Hello'+val["vendorname"],
                text: 'Please click this link to view our initial prices https://proc-assist.herokuapp.com/'+val["vpid"]
            };  
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
                
        });
        sendres=results;
    }); 
})
connection.query('select vpid, vendorname, email from vp left join Vendor on vp.vendorid=Vendor.vendorid where Vendor.vendorid in (select vendorid from vp where productid in(select productid from Agreement where datediff(expirydate,curdate())<15))', function (error, results, fields) {
    if (error) throw error;
    var arr=results.map((val,index)=>{
        // var mailOptions = {
        //     from: 'procurementassistantvit21@gmail.com',
        //     to: val["email"],
        //     subject: 'Hello'+val["vendorname"],
        //     text: 'Basic mail testing'
        //   };  
        // transporter.sendMail(mailOptions, function(error, info){
        // if (error) {
        //     console.log(error);
        // } else {
        //     console.log('Email sent: ' + info.response);
        // }
        // });
            
    });
    sendres=results;
});
   


app.get('/', function (req, res) {
   res.send(sendres);
    
    
});
app.get('/:agreeId',(req,res)=>{
    sendnames={};
    correct=true;
    function vendorq(){
        connection.query(`select vendorname from Vendor where vendorid=(select vendorid from vp where vpid= ${req.params.agreeId})`, (error, results, fields)=> {
            if (error)
                console.log(error);
            else if(results[0]!=undefined){
                results = JSON.parse(JSON.stringify(results));
                console.log(results[0]["vendorname"]);
                sendnames["vendorname"]=results[0]["vendorname"];
            }
            else{
                correct=false;
            }
        });
    }
    
    function productq(){
        connection.query(`select productname from Product where productid=(select productid from vp where vpid= ${req.params.agreeId})`, (error, resultsp, fields) =>{
            if (error) 
            console.log(error);
            else if(resultsp[0]!=undefined){
                resultsp=JSON.parse(JSON.stringify(resultsp));
                console.log(resultsp[0]["productname"]);
                sendnames["productname"]=resultsp[0]["productname"];
            }
            else{
                correct=false;
            }
        });
    }
    
    function sendq(){
        if(correct)
            res.render(__dirname + "/vendorForm", {name:sendnames["vendorname"],agreeId:req.params.agreeId});
        else
            res.send("404 not found");
    }
    function executeAsynchronously(functions, timeout) {
        for(var i = 0; i < functions.length; i++) {
          setTimeout(functions[i], timeout);
          timeout*=5;
        }
      }
    if(!isNaN(req.params.agreeId))
        executeAsynchronously(
            [vendorq, productq, sendq], 30);
    
    
});

app.post('/:agreeId',(req,res)=>{
    
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));  


