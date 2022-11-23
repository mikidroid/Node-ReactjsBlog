//Load controllers
const PostController = require('../controller/postController')
const ReplyController = require('../controller/replyController')
const CommentController = require('../controller/commentController')
const AuthController = require('../controller/authController')
const CategoryController = require('../controller/categoryController')
//without this multer store, req.body will be empty
const store = require(_root+'/backend/config/file-upload')
//comment store
const cStore = store('comments')
//Posts store
const pStore = store('posts')
//Middleware
const verifyToken = require(_base+'/middleware/verify-token')
const VT = verifyToken

//All Apis
const index = (app)=> {
 //Posts
 app.get('/post',PostController.Index)
 app.post('/post/add',VT,pStore.single('image'),PostController.Create)
 app.get('/post/view/:id',PostController.View)
 app.post('/post/rating',VT,pStore.single('image'),PostController.Rating)
 
 //Reply
 app.get('/reply/:id',ReplyController.View)
 app.post('/reply/add',VT,cStore.single('image'),ReplyController.Create)
 app.post('/reply/reaction',VT,ReplyController.Reaction)
 app.post('/reply/reaction/unlike',VT,ReplyController.Unlike)
 
 //Comment
 app.get('/comment/:id',CommentController.View)
 app.post('/comment/add',VT,cStore.single('image'),CommentController.Create)
 app.post('/comment/reaction',VT,CommentController.Reaction)
 app.post('/comment/reaction/unlike',VT,CommentController.Unlike)
 
 //Auth
 app.post('/login',cStore.single('image'),AuthController.Login)
 app.post('/register',cStore.single('image'),AuthController.Register)
 
  //Category
 app.post('/category/add',VT,CategoryController.Create)
 app.get('/category',CategoryController.Index)
 app.post('/category/delete/:id',VT,CategoryController.Remove)
}

module.exports = index