
const express = require("express");
const app = express();
let path=require('path');
//const cors=require('cors')
require("dotenv").config({ path: "./config.env" });////{path:__dirname+'/config.env'}
const port = process.env.PORT || 5000;
//const host=process.env.HOST || '0.0.0.0';

app.set('port',port);
//app.use(cors());

app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Methods', 'GET');
  console.log('use sin nada');
  next();
});

app.use('/',(req,res,next)=>{
  console.log(req.originalUrl);
  next();
});

app.all('/api/*',(req,res,next)=>{
  console.log(req.url);
  next();
});

app.get('/api',(req,res)=>{
  console.log(req.originalUrl);
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

app.use(require("./server/routes/data"));


//app.use('/public',express.static(path.join(__dirname,'/public')));
let pagina404=path.resolve(__dirname, '../public/404.html');
app.get('*',(req,res)=>{
  //res.sendFile(pagina404);
  res.status(404).json({error:"Ruta no encontrada"})
  console.log('no se encontro la ágina');
})

// get driver connection
//const dbo = require("./db/conn");
 
/* */

/* */
app.listen(app.get('port'), () => {
  // perform a database connection when server starts
  /*
  dbo.connectToServer(function (err) {
    if (err) console.error("error desde index:"+err);
 
  },"data_test");
  */
  console.log(`Server is running on port: ${app.get('port')}`);
});

//module.exports=app;