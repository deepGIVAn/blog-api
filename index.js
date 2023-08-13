const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const User = require("./models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const Post = require("./models/Post");

// setting up upload middleware here ,,
const uploadMiddleware = multer({ dest: "uploads/" });

// mongodb+srv://givan:givan@blog.zlfblxj.mongodb.net/blog?retryWrites=true&w=majority

// app.use(cors())
// Yarn add cors
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// we are setting here static files so that we can use uploads images at front-end side ..
app.use("/uploads", express.static(__dirname + "/uploads"));

const salt = bcrypt.genSaltSync(10); // we are here using salt to bycrypt the password
const secret = "HJSAKteywqu6789%^GHJ"; // for jsonwebtoken okk!!!

// Yarn add mongoose
mongoose.connect(
  "mongodb+srv://givan:givan@blog.zlfblxj.mongodb.net/blog?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    // Yarn add bcrypt
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json({ msg: `${e}` });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    console.log(passOk);
    // res.json(passOk);
    if (passOk) {
      // Yarn add jsonwebtoken
      //logged in
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        console.log(token); // can save one token at a time for a single user okkk!!!!
        // res.cookie("token", token).json("ok");
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json({ msg: "wrong credentials" });
    }
  } else {
    res.status(400).json({ msg: "username not found!!" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info); // 'iat' means issued at
  });
  // res.json(req.cookies); updated now
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok"); // we can use here null okkk!!!
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  // first yarn add multer  , to grab it and save it the uploads folder okk!!!..
  const { originalname, path } = req.file;

  const parts = originalname.split("."); //  "logo.jpg"   --->    logo
  const ext = parts[parts.length - 1]; // jpg
  // for renaming the file we use fs library okk!!!
  const newFileName = path + "." + ext;
  fs.renameSync(path, newFileName);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newFileName,
      author: info.id,
    });

    res.json(postDoc);
  });

  // res.json({ msg: "Cannot verfiy the user" });   updated now
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    // they are object type so we need to do json Stringify
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).json("You are not the author");
      // throw 'you are not the author';
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json({ postDoc });
    // res.json({ isAuthor, postDoc, info });
    // if (info.id === id){

    // }
  });

  // res.json({msg:"ok"});
});

app.get("/post", async (req, res) => {
  // const post = await Post.find().populate('author');         // for popultating the author details here okkk!!!

  // const post = await Post.find()
  //   .populate("author", ["username"])
  //   .sort({ createdAt: -1 })
  //   .limit(20); // to get username not password for safety ...

  // res.json(post);

  // updated now
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`);
});
