
const mongoose = require('mongoose');
const uri=process.env.ATLAS_URI;
let _db;

async function dbConnection(){
  await mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true})  
  .then((db)=>{ //db ref to DB
    _db=db.connection;
    console.log("Conexión exitosa"); 
  })
  .catch(e=>console.log("Error de conexión: ",e.message));
  return _db;
}

mongoose.connection.on('connected', console.error.bind(console, 'MongoDB connected'));
mongoose.connection.on('disconnected', console.error.bind(console, 'MongoDB disconnected'));

module.exports={
  conectarse:function(){
    return dbConnection();
  }
};

