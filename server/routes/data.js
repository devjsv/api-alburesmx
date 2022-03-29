const express = require("express");
const route = express.Router();
const conn=require('../db/conn.js');
let categorias=["pregunta","comparativo","enunciado","nombre","piropo"];
console.log('en data');

//sin commit, agregue async para categorias
route.get('/api/categorias',async (req,res)=>{
    let col=await conn.getDB().collection('mx_albures').aggregate([{$project:{"tipo":1,"_id":0}},
    {$group:{"_id":"$tipo"}}]);
    await col.toArray((err,result)=>{
        if (err){ 
            res.json({error:err,message:err.message});
            throw err;
        }else{
            let resultado=result.map(obj=>obj._id);
            res.json(resultado);
        }
    });
})

route.get('/api/:tipo/todos',async (req,res,next)=>{
    console.log(req.params);
    let {tipo}=req.params;
    if(!categorias.includes(tipo)){
        next()
    }else{
    await conn.getDB().collection('mx_albures').find({"tipo":tipo}).toArray(function (err, result) {
        //result es un objeto
        if (err){ 
          res.json({error:err,message:err.message});
          throw err;
        }else{
            let resultado=result.map(dato=>dato.albur);
            res.json(resultado);
        }
      }); 
    }   
});

route.get('/api/:tipo',async (req,res,next)=>{
    console.log(req.params);
    console.log(req.query);
    let {tipo}=req.params;
    if(!categorias.includes(tipo)){
        next()
    }else{
        //let conn_a=await conn.getDB();
        //console.log("conn_a:",conn_a);
    await conn.getDB().collection('mx_albures').find({"tipo":tipo}).toArray(function (err, result) {
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
        }else
            res.json({mensaje:"nanai"})
      }); 
    }   
});

//console.log("nombre de la coleccion: ", dataModel.collection.collectionName);
//console.log("Nombre del modelo: ", dataModel.modelName);
route.get('/asd',async(req,res)=>{
    console.log("collection:",await conn.getDB().collection('initial_datas').find({}).toArray())
});

module.exports=route;




/*
route.get('/apis/prueba',async (req,res)=>{
    let response=await conn.collection("mx_albures").find({tipo:"nombre"});
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