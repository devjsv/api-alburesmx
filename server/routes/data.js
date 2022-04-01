const express = require("express");
const route = express.Router();
const conn=require('../db/conn.js');
let categorias=["pregunta","comparativo","enunciado","nombre","piropo"];
console.log('en data');

//sin commit, agregue async para categorias
route.get('/api/categorias',async (req,res)=>{
    let ladb=await conn.conectarse();//ladb=mongoose.connection
    if(ladb.readyState===1){
        console.log('conectado');
    }else{
        console.log('no conectado');
    }
    await ladb.collection('mx_albures').aggregate([{$project:{"categoria":1,"_id":0}},
    {$group:{"_id":"$categoria"}}]).
    toArray((err,result)=>{
        if (err){ 
            res.json({error:err,message:err.message});
            throw err;
        }else{
            let resultado=result.map(obj=>obj._id);
            res.json(resultado);
        }
        ladb.close();
    });
})

route.get('/api/:categoria/todos',async (req,res,next)=>{
    console.log(req.params);
    let {categoria}=req.params;
    if(!categorias.includes(categoria)){
        next()
    }else{
    let ladb=await conn.conectarse();
    if(ladb.readyState===1){
        console.log('conectado');
    }else{
        console.log('no conectado');
    }
    //conn.getDB()
    await ladb.collection('mx_albures').find({"categoria":categoria}).toArray(function (err, result) {
        //result es un objeto
        if (err){ 
          res.json({error:err,message:err.message});
          throw err;
        }else{
            let resultado=result.map(dato=>dato.albur);
            res.json(resultado);
            
        }
        ladb.close();
      }); 
    }   
});

route.get('/api/:categoria',async (req,res,next)=>{
    console.log(req.params);
    console.log(req.query);
    let {categoria}=req.params;
    if(!categorias.includes(categoria)){
        next()
    }else{
    let ladb=await conn.conectarse();
    if(ladb.readyState===1){
        console.log('conectado');
    }else{
        console.log('no conectado');
    }
    //conn.getDB()
    await ladb.collection('mx_albures').find({"categoria":categoria}).toArray(function (err, result) {
        //result es un objeto
        if (err){ 
          res.json({error:err,message:err.message});
          throw err;
        }
        if(result.length){
            console.log("cantidad:",result.length);
            let indice=Math.floor(Math.random()*result.length);
            resultado=result[indice];
            delete resultado._id;
            res.json(resultado);
        }
        ladb.close();
      }); 
    }   
});

//console.log("nombre de la coleccion: ", dataModel.collection.collectionName);
//console.log("Nombre del modelo: ", dataModel.modelName);
route.get('/asd',async(req,res)=>{
    let data=await conn.getDB().collection('initial_datas').find({}).toArray();
    res.send(data)
});

module.exports=route;




/*
route.get('/apis/prueba',async (req,res)=>{
    let response=await conn.collection("mx_albures").find({categoria:"nombre"});
    let arr=await response.toArray();
    console.log(arr);
})
*/

/*
conn.collection('initial_datas').find({}).toArray()
    .then(response=>{
        res.send({data:response});
    })
    .catch(err=>{
        console.log('ocurrio un error');
        res.status(500).send({error:err.message});
    })
*/