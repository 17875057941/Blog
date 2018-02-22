// const mongolass=require('mongolass');
// const mongolass=new Mongolass();
// mongolass.connect('mongodb://localhost:27017/hello');

// const User=mongolass.model('User');
const User=require('../mongo/mongo.js').User;

module.exports={
	create:function create(user){//注册增加新用户，将信息保存数据库
		return	User
				.insertOne(user)//
				.exec()
				.then()
				.catch('插入失败');
	},

	getUserByName:function getUserByName(name){//通过用户名查找
		return User
			   .findOne({name:name})
			   .exec();
	}
}





