const express = require("express");
const route = express.Router();
const conn=require('../db/conn.js');

route.get('/albures/categorias',async (req,res)=>{
    console.log('en ctaegorias');
    let ladb=await conn.conectarse();
    await ladb.collection('mx_albures').aggregate([{$project:{"categoria":1,"_id":0}},
        {$group:{"_id":"$categoria"}}]).toArray((err,result)=>{
            if (err){ 
                res.json({error:err,message:err.message});
                throw err;
            }else{
                let resultado=result.map(obj=>obj._id);
                res.json(resultado);
            }
            ladb.close();
    });
});

route.get('/albures/:categoria',async (req,res,next)=>{
    console.log('en albures/categoria');
    let {categoria}=req.params; 
    let ladb=await conn.conectarse();
    await ladb.collection('mx_albures').find({"categoria":categoria}).toArray(function (err, result) {
        if (err){ 
            res.json({error:err,message:err.message});
            throw err;
        }
        if(result.length){
            let indice=Math.floor(Math.random()*result.length);
            resultado=result[indice];
            delete resultado._id;
            res.json(resultado);
        }else{
            res.json(result)
        }
        ladb.close();
      }); 
});

route.get('/albures/:categoria/todos',async (req,res,next)=>{
    console.log('en categoria/todos');
    let {categoria}=req.params;
    let ladb=await conn.conectarse();
    await ladb.collection('mx_albures').find({"categoria":categoria}).toArray((err, result) =>{
        if (err){ 
            res.json({error:err,message:err.message});
            throw err;
        }else{
            result.forEach(dato=>delete dato._id);
            res.json(result);
        }
        ladb.close();
      }); 
});


module.exports=route;
