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
