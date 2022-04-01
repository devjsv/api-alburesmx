const express = require("express");
const route = express.Router();
const conn=require('../db/conn.js');
let categorias=["pregunta","comparativo","enunciado","nombre","piropo"];
console.log('en data');

route.get('/albures/categorias',async (req,res)=>{
    console.log('en ctaegorias');
    let ladb=await conn.conectarse();//ladb=mongoose.connection
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
    let {categoria}=req.params; 
    let ladb=await conn.conectarse();
    await ladb.collection('mx_albures').find({"categoria":categoria}).toArray(function (err, result) {
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



//console.log("nombre de la coleccion: ", dataModel.collection.collectionName);
//console.log("Nombre del modelo: ", dataModel.modelName);
route.get('/asd',async(req,res)=>{
    let data=await conn.getDB().collection('initial_datas').find({}).toArray();
    res.send(data)
});

module.exports=route;
/*


//"/v1/excuse/:num(\\d+)?"
//https://excuser.herokuapp.com/v1/excuse/4  
//"/v1/excuse/id/:num(\\d+)?"
//https://excuser.herokuapp.com/v1/excuse/office/4

///v1/excuse/college/4
///v1/excuse/id/:num(\\d+)?
//:cate(\\d) solo un digito
//:cate(\\d)? un digito o ninguno
///categorias? coincide con categoria o categorias
//:categoria[\\s]$ coincide con cualquier terminancion en s
///albures/:categoria[\\s$]? coincide con terminacion en s o no
//app.get('/:type(discussion|page)/:id', ...)
//sin commit, agregue async para categorias
*/


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