// var express=require('express');

// var app=express();

// app.get('/',function(req,res){
// 	res.redirect('/posts');
// });

// app.use('/signup',require('./signup'));
// app.use('/posts',require('./posts'));


module.exports=function(app){
	app.get('/',function(req,res){
		res.redirect('/posts');
		//res.send('/路由');
	});
	app.use('/signup',require('./signup'));
	app.use('/signin',require('./signin'));
	app.use('/signout',require('./signout'));
	app.use('/posts',require('./posts'));
}

