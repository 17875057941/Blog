
module.exports={
	checkLogin:function checkLogin(req,res,next){
		if(!req.session.user){
			console.log('未登录');
			return res.redirect('/signin');
		}
		next();
	},

	checkNotLogin:function checkNotLogin(req,res,next){
		if(req.session.user){
			console.log('已登录');
			return res.redirect('back');
		}
		next();
	}
}