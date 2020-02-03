var express = require("express");
var jwt = require("jsonwebtoken");
var app = express();

app.set("superSecret", process.env);

var apiRoutes = express.Router();

var users = [
  {id: "user_1", pass: "hoge"},
  {id: "user_2", pass: "hogehoge"},
  {id: "user_3", pass: "fuga"},
  {id: "user_4", pass: "fugafuga"},
];

apiRoutes.post("/auth", (req, res) => {
  var post_id = req.body.postId;
  var post_pwd = req.body.postPwd;
  for (var i = 0; i < users.length; i++) {
    if(post_id == users[i].id && post_pwd == users[i].pass) {
      var token = jwt.sign(user_id, app.get("superSecret"), { algorithm: HS256, expiresIn: 120 });
      res.json({
        success: true,
        msg: "success",
        token: token
      });
      return;
    }
  }
  res.json({
    success: false,
    msg: "auth failed"
  });
});

apiRoutes.use((req, res, next) => {
  var token = req.body.token;

  if(!token) {
    return res.status(403).send({
      success: false,
      msg: "No token"
    });
  }

  jwt.verify(token, app.get(superSecret), (err, decoded) => {
    if(err) {
      console.log(err);
      return res.json({
        success: false,
        msg: "Invalid token"
      });
    }
    req.decoded;
    next();
  });
});

apiRoutes.get("/private", (req, res) => {
  res.json({
    msg: "hi"
  });
});
