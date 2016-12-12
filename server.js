var express = require('express')
var mongo = require('mongodb')
const MongoClient = mongo.MongoClient
const bodyParser= require('body-parser')
var BSON = mongo.BSONPure;
var app = express()
var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({extended: true}))
var db 

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/newpost', function (req, res) {
    res.render('new_post');
})

app.get('/post/:id', function (req, res) {
    res.render('post');
})

app.get('/edit/:id', function(req, res) {
    res.render('edit');
})

app.post('/api/post', function(req, res){
    postContent = req.body.postContent
    db.collection('posts').save(req.body, (err, result) => {
        if (err) {
            res.send({
                status:'failed',
                error:err
            })
        } else {
            res.send({status:"success"})
        }
    })
})

app.post('/api/post/:id', function(req, res) {
    postContent = req.body.postContent
    var obj_id = mongo.ObjectID(req.params.id)
    req.body["_id"] = obj_id
    db.collection('posts').save(req.body, (err, result) => {
        if (err) {
            res.send({
                status:'failed',
                error:err
            })
        } else {
            res.send({status:"success"})
        }
    })
})

app.get('/api/post', function(req,res){
    db.collection('posts').find().sort({timestamp:-1}).toArray(function(err, results) {
        if (err) {
            res.send({status:"failed"})
        } else {
            res.send({status:'success', data:results})
        }
    })
})

app.get('/api/post/:id', function(req,res){
    var obj_id = mongo.ObjectID(req.params.id)
    db.collection('posts').findOne({_id:obj_id}, function(err, results) {
        if (err || !results) {
            res.send({status:"failed"})
        } else {
            results['status'] = 'success'
            res.send(results)
        }
    })
    // res.send("a single post with id " + id)
})

MongoClient.connect('mongodb://admin:admin123@ds052819.mlab.com:52819/blog', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port, () => {
    console.log('listening on 3000')
  })
})
