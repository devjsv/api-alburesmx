
const express = require("express");
const app = express();
let path=require('path');
const cors=require('cors')
require("dotenv").config({ path: "./config.env" });////{path:__dirname+'/config.env'}
const port = process.env.PORT || 5000;
//const host=process.env.HOST || '0.0.0.0';

app.set('port',port);
app.use(cors());

//app.use('/publico',express.static(path.join(__dirname,'/publico')));
app.use(express.static(__dirname+'/public'));
//app.use(express.static('public')); 

/****** */
/*
app.all("*", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
*/
/****** */

app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Methods', 'GET');
  console.log('use sin nada');//pasa por todas las peticiones
  next();
});

app.use('/',(req,res,next)=>{
  console.log('use con /');
  //console.log(req.originalUrl);
  next();
});


//path.resolve(__dirname, '../public/index.html')
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html');
});

app.all('/api/*',(req,res,next)=>{
  console.log('con todas las rutas /api/*');
  //console.log(req.url);
  //console.log(req.originalUrl);
  next();
});

app.use(require("./server/routes/data"));


//app.use('/public',express.static(path.join(__dirname,'/public')));
let pagina404=path.resolve(__dirname, '../public/404.html');
app.get('*',(req,res)=>{
  //res.sendFile(pagina404);
  res.status(404).send('Error')//.json({error:"Ruta no encontrada"})
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