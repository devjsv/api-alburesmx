var mongoose = require('mongoose');
//mongoose.set('bufferCommands',false);
//manda error si uso el modelo sin haberme conectado a la bd, con true(default) no pasa
const uri=process.env.ATLAS_URI;
var _db;
console.log('en conn');
async function dbConnection(){
  mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true})  
  .then((db)=>{
    _db=db.connection;
    
    console.log("Conexión exitosa")//db es la referencia a la base de datos 
  })
  .catch(e=>console.log("Error de conexión: ",e.message));
  //_db=mongoose.connection;
}
dbConnection();

mongoose.connection.on('open', function () {
    //console.log("Host de la base de datos: ",_db.host);
    //console.log("Nombre de la base de datos: ",_db.name);
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      console.log('Lista de colecciones en la base de datos:');
      names.forEach(name=>console.log(name.name));
    }
    //mongoose.connection.close();
  });
});
/*
mongoose.connection.db.collections()
        .then(response=>{
            response.forEach(res=>{
                console.log(res.collectionName)
            })
        });
*/

//_db.on('connected', console.error.bind(console, 'MongoDB connected'));
//_db.on('open', console.error.bind(console, 'MongoDB open'));
//_db.on('disconnecting', console.error.bind(console, 'MongoDB disconnecting'));
mongoose.connection.on('disconnected', console.error.bind(console, 'MongoDB disconnected'));

module.exports={
  getDB:function(){
    return _db;
  }
}


/*
_db.on('disconnected',()=>{
    console.log('conectame');
    dbConnection()
});
*/

/* conn.js
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
module.exports = {
  connectToServer: function (callback,ladb) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db(ladb);
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};


reviews.js
let db_connect =dbo.getDb();
  
  db_connect
    .collection("initial_data")
    .find({}).limit(3)
    .toArray(function (err, result) {
      if (err){ 
        res.json({error:err,message:err.message});
        throw err;
      }else
        res.json(result);
    });    
  });
*/
