var Producto = require('../models/producto');

var productoController = {};

productoController.list = function(req, res){
  Producto.find({}).exec(function(err, productos){
    if(err){ console.log(err); return; }
    res.render('productos/index', { productos: productos, titulo: 'Lista de Productos' });
  });
};

productoController.show = function(req, res){
  Producto.findOne({_id: req.params.id}).exec(function(err, producto){
    if(err){ console.log(err); return; }
    res.render('productos/show', { producto: producto });
  });
};

productoController.create = function(req, res){
  res.render('productos/create');
};

productoController.save = function(req, res){
  var producto = new Producto(req.body);
  producto.save(function(err){
    if(err){ console.log(err); return; }
    res.redirect('/productos/show/' + producto._id);
  });
};

productoController.edit = function(req, res){
  Producto.findOne({_id: req.params.id}).exec(function(err, producto){
    if(err){ console.log(err); return; }
    res.render('productos/edit', { producto: producto });
  });
};

productoController.update = function(req, res){
  Producto.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, producto){
    if(err){ console.log(err); return; }
    res.redirect('/productos/show/' + producto._id);
  });
};

productoController.delete = function(req, res){
  Producto.deleteOne({_id: req.params.id}, function(err){
    if(err){ console.log(err); return; }
    res.redirect('/productos');
  });
};

module.exports = productoController;
