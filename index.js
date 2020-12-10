const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')
const { User } = require('./models/User');
const { auth } = require('./middleware/auth')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
  console.log('...database connected successfully!')
}).catch((err) => {
  console.error(err)
})



app.get('/', (req, res) => {
  res.send('connected server-side app')
})

app.post('/api/user/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.post('/api/user/login', (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.json({ success: false, err })
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '존재하지 않는 사용자입니다.'
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.json({ success: false, err })
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 일치하지 않습니다.'
        });
      }
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // cookie에 저장
        res.cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      })
    })
  })
})

app.get('/api/user/auth', auth, (req, res) => {
  const isAdmin = (role) => {
    switch (role) {
      case 0:
        //0은 총괄 어드민
        return true;
      default:
        return false;
    }
  }
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    image: req.user.image,
    role: req.user.role,
    isAdmin: isAdmin(req.user.role),
    isAuth: true
  })
})


app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})