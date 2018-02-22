
const express=require('express');

const router=express.Router();
router.get('/',function(req,res,next){
	req.session.user=null;
	//res.render('posts');//退出后返回主页
	res.redirect('/posts');
})
module.exports=router;