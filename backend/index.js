var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'procurementassistantvit21@gmail.com',
      pass: 'N0sleept0d@y'
    }
});
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'cc4mxFSMWm',
    password : '8NmwE8H5Sh',
    database : 'cc4mxFSMWm'
});
connection.connect();
var sendres=null;
connection.query('SELECT vendorname, email from Vendor where vendorid in (select vendorid from Agreement where productid in(select productid from Agreement where datediff(expirydate,curdate())<15))', function (error, results, fields) {
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
    function vendorq(){
        connection.query(`select vendorname from Vendor where vendorid=(select vendorid from Agreement where agreementid= ${req.params.agreeId})`, (error, results, fields)=> {
            if (error)
                throw error;
            else{
                results = JSON.parse(JSON.stringify(results));
                console.log(results[0]["vendorname"]);
                sendnames["vendorname"]=results[0]["vendorname"];
            }
        });
    }
    
    function productq(){
        connection.query(`select productname from Product where productid=(select productid from Agreement where agreementid= ${req.params.agreeId})`, (error, resultsp, fields) =>{
            if (error) throw error;
            else{
                resultsp=JSON.parse(JSON.stringify(resultsp));
                console.log(resultsp[0]["productname"]);
                sendnames["productname"]=resultsp[0]["productname"];
            }
        });
    }
    
    function sendq(){
        res.send(sendnames);
    }
    function executeAsynchronously(functions, timeout) {
        for(var i = 0; i < functions.length; i++) {
          setTimeout(functions[i], timeout);
          timeout*=5;
        }
      }
    executeAsynchronously(
        [vendorq, productq, sendq], 20);
    
    
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));  


