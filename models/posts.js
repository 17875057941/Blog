const Post=require('../mongo/mongo.js').Post;
//const marked=require('marked');
module.exports={
	//创建文章
	create:function create(post){
		return Post
			   .insertOne(post)
			   .exec()
	},
	
	getPostById:function getPostById(postId){
		return Post
			   .findOne({_id:postId})
			   .populate({path:'author',model:'User'})
			   .exec();
	},

	getPosts: function getPosts (author) {
	    const query = {}
	    if (author) {
	      query.author = author
	    }
	    return Post
	      .find(query)
	      .populate({ path: 'author', model: 'User' })
	      .sort({ _id: -1 })
	      //.addCreatedAt()
	      //.addCommentsCount()
	      //.contentToHtml()
	      .exec()
  	},
  	incPv:function invPc(postId){
  		return Post
  			.update({_id:postId},{$inc:{pv:1}})
  			.exec()
  	},
  	//删除一篇文章
  	delPostById:function delPostById(postId){
  		return Post
  			.deleteOne({_id:postId})
  			.exec()
  	},
  	//更新文章
  	updatePostById:function updatePostById(postId,data){
  		return Post
  			.update({_id:postId},{$set:data})
  			.exec()
  	},
  	getEssayById:function getEssayById(postId){//获取一篇文章
  		return Post
  			.findOne({_id:postId})
  			.populate({path:'author',model:'User'})
  			.exec()
  	}
}