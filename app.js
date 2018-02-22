const express=require('express');
const  session=require('express-session');
const  bodyParse=require('body-parser');
const  flash=require('connect-flash');
const  MongoStore=require('connect-mongo')(session);
const Mongolass=require('mongolass');
const  routes=require('./routes');
const  app=express();
const mongolass=new Mongolass();
const User=mongolass.model('User');
app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialized:true,
	cookie:{
		maxAge:1000*30*60
	},
	store:new MongoStore({
		url: 'mongodb://127.0.0.1:27017/Blog',
		touchAfter: 24 * 3600 // time period in seconds
	})
}));
app.use(bodyParse.urlencoded({extended:false}));

app.set('view engine','ejs');

app.use(express.static('public'));

routes(app);//路由

app.listen(4000);


