//配置数据库及相关操作
const Mongolass=require('mongolass');
const mongolass=new Mongolass();
mongolass.connect('mongodb://localhost:27017/Blog');

exports.User=mongolass.model('User',{
	name:{type:'string',required:true},
	password:{type:'string',required:true}
})
exports.User.index({name:1},{unique:true}).exec();

exports.Post=mongolass.model('Post',{
	author:{type:Mongolass.Types.ObjectId,required:true},
	title:{type:'string',required:true},
	content:{type:'string',required:true},
	pv:{type:'number',default:0},
	time:{type:'string',required:true}
});
exports.Post.index({author:1,_id:-1}).exec();