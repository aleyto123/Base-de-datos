var Empleado = require('../models/empleado');

var empleadoController = {};

empleadoController.list = function(req, res){
  Empleado.find({}).exec(function(err, empleados){
    if(err){ console.log(err); return; }
    res.render('empleados/index', { empleados: empleados, titulo: 'Lista de Empleados' });
  });
};

empleadoController.show = function(req, res){
  Empleado.findOne({_id: req.params.id}).exec(function(err, empleado){
    if(err){ console.log(err); return; }
    res.render('empleados/show', { empleado: empleado });
  });
};

empleadoController.create = function(req, res){
  res.render('empleados/create');
};

empleadoController.save = function(req, res){
  var empleado = new Empleado(req.body);
  empleado.save(function(err){
    if(err){ console.log(err); return; }
    res.redirect('/empleados/show/' + empleado._id);
  });
};

empleadoController.edit = function(req, res){
  Empleado.findOne({_id: req.params.id}).exec(function(err, empleado){
    if(err){ console.log(err); return; }
    res.render('empleados/edit', { empleado: empleado });
  });
};

empleadoController.update = function(req, res){
  Empleado.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, empleado){
    if(err){ console.log(err); return; }
    res.redirect('/empleados/show/' + empleado._id);
  });
};

empleadoController.delete = function(req, res){
  Empleado.deleteOne({_id: req.params.id}, function(err){
    if(err){ console.log(err); return; }
    res.redirect('/empleados');
  });
};

module.exports = empleadoController;
