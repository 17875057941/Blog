var express=require('express');
var router=express.Router();
var checkLogin=require('../middlewares/check').checkLogin;
var PostModel=require('../models/posts');
var $=require('jquery');

var mydate=new Date();

//var time=mydate.getFullYear()+"-"+mydate.getMonth()+"-"+mydate.getDate()+" "+mydate.getHours()+":"+mydate.getMinutes();
var time =mydate.toLocaleString();
router.get('/', function (req, res, next) {
  const author = req.query.author

  PostModel.getPosts(author)
    .then(function (posts) {
      res.render('posts', {
        posts: posts//获取作者的所有文章
      })
    })
    .catch(next)
})

router.get('/create',function(req,res,next){
	res.render('create');
})

router.post('/create',function(req,res,next){
	const author=req.session.user._id;
	const title=req.body.title;
	const content=req.body.content;

	let post={
		author:author,
		title:title,
		content:content,
		time:time
	}
	//将文章存入数据库，然后发表，发表后跳转到该文章首页
	PostModel.create(post)
		.then(function(result){
			post=result.ops[0];
			console.log('发表成功');
			res.redirect(`/posts/${post._id}`);
			console.log(time);
		})
		.catch(next);
})

router.get('/:postId',function(req,res,next){//对应文章的路由
	const postId=req.params.postId;
	Promise.all([
		PostModel.getPostById(postId),
		PostModel.incPv(postId)
		])
			.then(function(result){
				const post=result[0];
				//const comments=result[1];
				if(!post){
					throw new Error('该文章不存在');
				}
				res.render('post',{
					post:post//获取刚刚发表的文章
				})
			})
			.catch(next);
})

router.get('/:postId/delete',checkLogin,function(req,res,next){//删除一篇文章
	const postId=req.params.postId;
	const author=req.session.user._id;
	PostModel.delPostById(postId)
				.then(function(post){
					console.log('删除成功');
					res.redirect('/posts');
				})
				.catch(next);

	// PostModel.getEssayById(postId)
	// 	.then(function(post){
	// 		if(post.author._id.toString()!==author.toString()){
	// 			throw new Error('没有权限');
	// 		}

	// 		PostModel.delPostById(postId)
	// 			.then(function(post){
	// 				console.log('删除成功');
	// 				res.redirect('/posts');
	// 			})
	// 			.catch(next);
	// 	})
})

router.get('/:postId/edit',function(req,res,next){//编辑

	const postId=req.params.postId;
	Promise.all([
		PostModel.getPostById(postId)
		])
			.then(function(result){
				const post=result[0];
				//const comments=result[1];
				if(!post){
					throw new Error('该文章不存在');
				}
				res.render('edit',{
					post:post//获取刚刚发表的文章
				})
			})
			.catch(next);
})

router.post('/:postId/edit',function(req,res,next){//更新编辑的内容
	const title=req.body.title;
	const content=req.body.content;
	const postId=req.params.postId;

	let post={
		title:title,
		content:content
	}
	PostModel.updatePostById(postId,{title:title,content:content})
		.then(function(){
			res.redirect(`/posts/${postId}`)
		})
		.catch(next)
})
module.exports=router;