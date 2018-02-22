const express=require('express');

var UserModel=require('../models/users');

var checkNotLogin=require('../middlewares/check').checkNotLogin;

const router=express.Router();
router.get('/',checkNotLogin,function(req,res,next){
	res.render('signin');
})
router.post('/',checkNotLogin,function(req,res,next){
	const name=req.body.name;
	const password=req.body.password;
	try{
		if(!name.length){
			throw new Error('请填写用户名');
		}

		if(!password.length){
			throw new Error("请填写密码");
		}
	}catch(e){
		return res.redirect('back');
	}
	UserModel.getUserByName(name)
		     .then(function(user){
		     	if(!user){
		     		console.log('用户名不存在');
		     		return res.redirect('back');
		     	}

		     	if(password!==user.password){
		     		console.log('用户名或密码错误');
		     		return res.redirect('back');
		     	}
		     	delete user.password;
		     	req.session.user=user;
		     	res.redirect('/posts');
		     })
		     .catch(next);
})
module.exports=router;
