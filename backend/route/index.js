const Home = require('./list/home')
const User = require('./list/user')
const Post = require('./list/post')
const Comment = require('./list/comment')
const Reply = require('./list/reply')

exports.index =(app,io)=> {
 Home.index(app)
 Post.index(app,io)
 Comment.index(app)
 Reply.index(app)
 
}