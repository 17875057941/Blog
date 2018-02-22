var express=require('express');

var fs=require('fs');

var router=express.Router();

var UserModel=require('../models/users');

var checkNotLogin=require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function(req,res){
	res.render('signup');
})

router.post('/',checkNotLogin,function(req,res){
	const name=req.body.name;
	const password=req.body.password;
	const password_1=req.body.password_1;
	const avtar=req.body.avtar;
	try{
		if(!(name.length>=1&&name.length<=10)){
			throw new Error('用户名在1~10个字符之间');
		}
		if(!(password.length>=1&&password.length<=20)){
			throw new Error('密码在1~20个字符之间');
		}
		if(password_1!==password){
			throw new Error('密码不一致，请重新输入');
		}
	}catch(e){
		//console.log(e.message);
		console.log(e.message);
		return res.redirect('/signup');
	}

	let user={//保存用户信息
		name:name,
		password:password,
		avtar:avtar
		//password_1:password_1
	}
	//req.session.user=user;
	//console.log(req.session.user.name.length);

	//判断用户名是否已经被占用
	//console.log(UserModel.getUserByName(user.name));
	/*UserModel.getUserByName(name)
			 .then(function(user){
			 	if(!user){
			 		//console.log('用户名不存在');
			 		console.log('用户名未被占用');
			 		req.session.user=user;//用户名存在，则重新
			 	}
			 })
	*/

	/*if(req.session.user){
		UserModel.create(req.session.user);//增加新用户，将信息保存数据库
		console.log('增加用户成功');
		console.log(req.session.user.password);
	}
	*/
	UserModel.create(user)
		     .then(function(result){
		     	user=result.ops[0];
		     	delete user.password;
		     	req.session.user=user;
		     	console.log('注册成功');
		     	res.redirect('/posts');//注册成功后跳转到主页
		     })
		     .catch(function(e){
		     	res.redirect('/signup');
		     })
	//res.redirect('/posts');
})
module.exports = router;