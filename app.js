require('dotenv').config();
const secret = process.env.sessSecret;
const express = require('express')
const app = express();
const port = 4000;
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const userRouter = require('./routes/user');
const spotRouter = require('./routes/spot');

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true
  })
);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false, }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  if (req.session.userid) {
    res.status(200).json({ exist: true })
  } else {
    res.status(200).json({ exist: false })
  }
})

app.use('/user', userRouter);
app.use('/spot', spotRouter);



app.listen(port, () => {
  console.log(`app is listening in PORT http://localhost:${port}`)
})

