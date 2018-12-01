var bebida = require('../models/bebida');
var controller = {};

controller.create = async function(req,res){
    let data = new bebida({
        marca: req.body.marca,
        tipo: req.body.tipo,
        anios: req.body.anios
    })

    const beb = await data.save();
    return res.json(beb);
}

controller.getAll = function(req,res){
    bebida.find({}, function(err,bebidas){
        if(err){
            return res.send(err);
        }
        else{
            return res.json({bebidas});
        }
    })
}

controller.getOne = function(req,res){
    let {id} = req.params;
    bebida.findById(id, function(err, bebida){
        if(err){
            return res.send(err);
        }
        else{
            return res.json(bebida);
        }
    })
}

controller.delete = function(req,res){
    let {id}= req.params;
    bebida.findOneAndDelete({_id:id}, function(err){
        if(err){
            return res.send(err);
        }
        else{
            return res.json('BOrrado con exito');
        }
    });
}

controller.update = function(req,res){
    let {id} = req.params;
    let data = {
        marca: req.body.marca,
        tipo: req.body.tipo,
        anios: req.body.anios
    }
    bebida.findOneAndUpdate({_id:id}, data, function(err,old){
        if(err){
            return res.send(err);
        }
        else{
            return res.json('Actualizacion exitosa');
        }
    });
}

module.exports = controller;