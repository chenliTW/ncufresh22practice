var express = require('express');
var app = express();
var cors = require('cors');
var mongoose=require('mongoose');
var jwt = require('jsonwebtoken');
var sha256 = require('sha256');
const { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser')

const jwt_secret = 'secret';
const hash_salt = 'owo';
const base_path = '';
const port = '8000';

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

mongoose.connect("mongodb://127.0.0.1/blog");

var posts = new mongoose.Schema({
    id: String,
    title: String,
    body: String,
    image: String,
    ip: String,
    comments: [{index:Number, body: String, author: String, date: { type: Date, default: Date.now }, ip:String ,deleted: Boolean}],
    author: String,
    date: { type: Date, default: Date.now },
    deleted:Boolean
  });
  
var Posts = mongoose.model('posts', posts);
  
var users = new mongoose.Schema({
    username: String,
    password: String,
    posts: [String]
  });
  
var Users = mongoose.model('users', users);

function isAuthed(req,res,next){
    try{
        decoded = jwt.verify(req.body['token'], jwt_secret);
        res.locals.username=decoded['username'];
        next();
    }catch(err){
        res.send({error:"not login"});
    }
}

app.post(base_path+'/users/login',function(req,res,next){
    var username = req.body['username'];
    var password = sha256(req.body['password'] + hash_salt);
    Users.findOne({ username: username, password: password }, function (err, user) {
        if (user) {
            var token = jwt.sign({ username: username }, jwt_secret);
            res.send({success:"user login",token:token})
        } else {
            res.send({error:"帳密錯誤"});
        }
    });
})

app.post(base_path+'/users/new',function(req,res,next){
    Users.findOne({ username: req.body['username'] }, (err, user) => {
        if (user) {
          res.send({error:'用戶已存在'});
        } else {
          Users.create({
            username: req.body['username'],
            password: sha256(req.body['password'] + hash_salt),
            posts: []
          }, (err, user) => {
            if (err) {
              res.send({error:'???'});
            } else {
              res.send({success:'註冊成功'});
            }
          });
        }
      });
})

app.get(base_path+'/posts/list',function(req,res,next){
    Posts.find({}).sort({ date: 'desc' }).exec(function (err, posts) {
        res.send(posts);
    });
})

app.get(base_path+'/posts/get',function(req,res,next){
  Posts.findOne({ id: req.query['id'] }, (err, post) => {
    console.log(post)
    res.send({ post: post });
  });
})

app.post(base_path+'/posts/new',isAuthed,function(req,res,next){
    console.log(req.body);

    let nid = uuidv4();
    Posts.create({
      id: nid,
      title: req.body['title'],
      body: req.body['body'],
      //image: req.body.image,
      ip: req.ip,
      comments: [],
      author: res.locals.username,
      date: Date.now()
    });

    Users.findOne({ username: res.locals.username }, function (err, user) {
      user.posts.push(nid);
      user.save();
    });
    res.send({success:"new post created"});
});

app.put(base_path+'/posts/edit',isAuthed,function(req,res,next){
    Posts.findOne({ id: req.body.id }, (err, post) => {
        if(post.author===res.locals.username){
          post.body = req.body.body;
          post.save();
          res.send({success:'編輯成功'});
        }else{
          res.send({error:'你不是作者'});
        }
      });
});

app.delete(base_path+'/posts/:id/delete',isAuthed,function(req,res,next){
    Posts.findOne({ id: req.body.id }, function (err, post) {
        if (post.author === username) {
          Posts.deleteOne({ id: req.body.id }, function (err, post) {
            Users.findOne({ username: res.locals.username }, function (err, user) {
              user.posts.splice(user.posts.indexOf(req.body.id), 1);
              user.save();
            });
          });
        }
      });
});

app.post(base_path+'/posts/:id/comment/new',isAuthed,function(req,res,next){
    Posts.findOne({ id: req.params.id }, (err, post) => {
        post.comments.push({
          index: post.comments.length+1,
          body: req.body.body,
          author: res.locals.username,
          date: Date.now(),
          ip: req.ip,
          deleted: false
        });
        post.save();
        res.send({success:'留言成功'});
      });
});


app.listen(port);
