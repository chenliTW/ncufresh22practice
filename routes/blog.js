var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var sha256 = require('sha256');
const { v4: uuidv4 } = require('uuid');

const jwt_secret = 'secret';
const hash_salt = 'owo';

mongoose.connect("mongodb://127.0.0.1/blog");

var posts = new mongoose.Schema({
  id: String,
  title: String,
  body: String,
  image: String,
  comments: [{index:Number, body: String, author: String, date: { type: Date, default: Date.now }, deleted: Boolean}],
  author: String,
  date: { type: Date, default: Date.now },
});

var Posts = mongoose.model('posts', posts);

var users = new mongoose.Schema({
  username: String,
  password: String,
  posts: [String]
});

var Users = mongoose.model('users', users);


router.get('/', function (req, res, next) {
  var decoded = {};
  try {
    decoded = jwt.verify(req.cookies.token, jwt_secret);
    Posts.find({}).sort({ date: 'desc' }).exec(function (err, posts) {
      res.render('index', { username: decoded.username, posts: posts });
    });
  } catch (err) {
    res.clearCookie("token");
    Posts.find({}).sort({ date: 'desc' }).exec(function (err, posts) {
      res.render('index', { username: '', posts: posts });
    });
  }
});

router.get('/view/:id', function (req, res, next) {
  try {
    decoded = jwt.verify(req.cookies.token, jwt_secret);
    Posts.findOne({ id: req.params.id }, (err, post) => {
      res.render('view', { username: decoded.username, post: post });
    });
  } catch (err) {
    res.clearCookie("token");
    Posts.findOne({ id: req.params.id }, (err, post) => {
      res.render('view', { username: '', post: post });
    });
  }
}
);

router.get('/new', function (req, res, next) {
  try {
    decoded = jwt.verify(req.cookies.token, jwt_secret);
    res.render('new', { username: decoded.username });
  } catch (err) {
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.post('/new', function (req, res, next) {
  try {
    decoded = jwt.verify(req.cookies.token, jwt_secret);
    let nid = uuidv4();
    Posts.create({
      id: nid,
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      comments: [],
      author: decoded.username,
      date: Date.now()
    })

    Users.findOne({ username: decoded.username }, function (err, user) {
      user.posts.push(nid);
      user.save();
    });

    res.redirect('/');
  } catch (err) {
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.get('/edit/:id', function (req, res, next) {
  try {
    decoded=jwt.verify(req.cookies.token, jwt_secret);
    Posts.findOne({ id: req.params.id }, (err, post) => {
      if(post.author===decoded.username){
        res.render('edit', { username: decoded.username, post: post });
      }else{
        res.redirect('/');
      }
    });
  } catch (err) {
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.post('/edit/:id', function (req, res, next) {
  try {
    decoded=jwt.verify(req.cookies.token, jwt_secret);
    Posts.findOne({ id: req.params.id }, (err, post) => {
      if(post.author===decoded.username){
        post.title = req.body.title;
        post.body = req.body.body;
        post.image = req.body.image;
        post.save();
        res.redirect('/');
      }else{
        res.redirect('/');
      }
    });
  } catch(err){
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.post('/comment/:id/new',function(req,res,next){
  try {
    decoded = jwt.verify(req.cookies.token, jwt_secret);
    Posts.findOne({ id: req.params.id }, (err, post) => {
      post.comments.push({
        index: post.comments.length+1,
        body: req.body.body,
        author: decoded.username,
        date: Date.now(),
        deleted: false
      });
      console.log(post.comments);
      post.save();
      res.redirect('/view/'+req.params.id);
    });
  }catch(err){
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.get('/comment/:id/delete',function(req,res,next){
  try{
    decoded=jwt.verify(req.cookies.token, jwt_secret);
    Posts.findOne({ id: req.params.id }, (err, post) => {
      post.comments.forEach(comment => {
        if(comment.index==req.query.index&&comment.author===decoded.username){
          comment.deleted=true;
        }
      });
      post.save();
      res.redirect('/view/'+req.params.id);
    });
  }catch(err){
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.post('/comment/:id/edit',function(req,res,next){
  try{
    decoded=jwt.verify(req.cookies.token, jwt_secret);
    console.log(req.params.id+" "+req.body.index+" "+req.body.body);
    Posts.findOne({ id: req.params.id }, (err, post) => {
      post.comments.forEach(comment => {
        if(comment.index==req.body.index&&comment.author===decoded.username){
          comment.body=req.body.body;
        }
      });
      post.save();
      res.send('ok');
    });
  }catch(err){
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.get('/delete/:id', function (req, res, next) {
  try {
    decoded = jwt.verify(req.cookies.token, jwt_secret);
    Posts.findOne({ id: req.params.id }, function (err, post) {
      if (post.author === decoded.username) {
        Posts.deleteOne({ id: req.params.id }, function (err, post) {
          Users.findOne({ username: decoded.username }, function (err, user) {
            user.posts.splice(user.posts.indexOf(req.body.id), 1);
            user.save();
          });
        });
      }
    });
    res.redirect('/');
  } catch (err) {
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.get('/user', function (req, res, next) {
  try {
    decoded = jwt.verify(req.cookies.token, jwt_secret);

    Users.findOne({ username: decoded.username }, function (err, user) {
      var user_posts = [];
      for (let i = 0; i < user.posts.length; i++) {
        //console.log(user.posts[i]);
        Posts.findOne({ id: user.posts[i] }, (err, post) => {
          user_posts.push(post);
          console.log(user_posts.length);
          console.log(user.posts.length);
          if (user.posts.length == user_posts.length) {
            res.render('user', { username: decoded.username, posts: user_posts });
          }
        });
      }
      if (user.posts.length == 0) {
        res.render('user', { username: decoded.username, posts: user_posts });
      }
    });
  } catch (err) {
    res.clearCookie("token");
    res.redirect('/');
  }
});

router.post('/login', function (req, res, next) {
  var username = req.body['username'];
  var password = sha256(req.body['password'] + hash_salt);
  Users.findOne({ username: username, password: password }, function (err, user) {
    if (user) {
      var token = jwt.sign({ username: username }, jwt_secret);
      res.cookie('token', token);
      res.send('ok');
    } else {
      res.send('error');
    }
  });
});

router.post('/register', function (req, res, next) {
  Users.findOne({ username: req.body['username'] }, (err, user) => {
    if (user) {
      res.send("user exist");
    } else {
      Users.create({
        username: req.body['username'],
        password: sha256(req.body['password'] + hash_salt),
        posts: []
      }, (err, user) => {
        if (err) {
          res.send("error");
        } else {
          res.send("register success");
        }
      });
    }
  });
});

router.get('/logout', function (req, res, next) {
  res.clearCookie("token");
  res.redirect('/');
});


module.exports = router;
