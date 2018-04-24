var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var cors=require('cors');
var path=require('path');

var app=express();
var route=require('./routes/route');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/authentication1');
mongoose.connection.on('connected',function(){
  console.log('Connected to database');
});

mongoose.connection.on('error',function(err){
    if(err)
    {
        console.log(err);
    }
  });

app.use(express.static(path.join(__dirname,'public')));

app.use('/api',route);

app.get('/',function(req,res){
    res.send('Hello');
});

app.listen(3000);
console.log('Running on port 3000...');