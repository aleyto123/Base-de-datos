var mongoose = require('mongoose');
var Usuario = require("../models/usuario");

var usuarioController = {};

usuarioController.list = function(req, res){
    Usuario.find({}).exec(function(err, usuarios){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('usuarios/index', {usuarios: usuarios, titulo: 'INDEX'});
    });
};

usuarioController.show = function(req, res){
    Usuario.findOne({_id: req.params.id}).exec(function(err, usuario){
        if( err ){ console.log('Error: ', err); return; }
        res.render('usuarios/show', {usuario: usuario});
    });
};

usuarioController.create = function(req, res){
    res.render('usuarios/create');
};

usuarioController.save = function(req, res){
    var usuario = new Usuario(req.body);
    usuario.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        console.log("Successfully created a usuario. :)");
        res.redirect("/usuarios/show/"+usuario._id);
    });
};

usuarioController.edit = function(req, res) {
    Usuario.findOne({_id: req.params.id}).exec(function (err, usuario) {
        if (err) { console.log("Error:", err); return; }
        res.render('usuarios/edit', {usuario: usuario});
    });
};

usuarioController.update = function(req, res){
    Usuario.findByIdAndUpdate(req.params.id, {$set: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        estado: req.body.estado
    }}, { new: true },
    function(err, usuario){
        if(err){ 
            console.log('Error: ', err); 
            res.render('usuarios/edit', {usuario: req.body});
        }
        console.log(usuario);
        res.redirect('/usuarios/show/' + usuario._id);
    });
};

usuarioController.delete = function(req, res){
    Usuario.deleteOne({_id: req.params.id}, function(err){
        if( err ){ console.log('Error: ', err); return; }
        console.log("Usuario deleted!");
        res.redirect("/usuarios");
    });
};

module.exports = usuarioController;
