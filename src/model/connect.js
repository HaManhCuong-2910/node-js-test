const mongoose = require('mongoose');
async function connect(){
  try{
    await mongoose.connect('mongodb+srv://cuonghm:vanha110100@cluster0.e74cvwr.mongodb.net/perfumeDB?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("connection successfully!!!");
  }
  catch(error){
    console.log("connection fail!!!");
  }
}

module.exports = {connect}