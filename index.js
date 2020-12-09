const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://justinjeong:<password>@general.nbo0d.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
  console.log('...database connected successfully!')
}).catch((error) => {
  console.error(error)
})



app.get('/', (req, res) => {
  res.send('connected server-side app')
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})