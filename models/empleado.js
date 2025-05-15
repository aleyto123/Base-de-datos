var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String },
  puesto: { type: String },
  fechaIngreso: { type: Date },
  salario: { type: Number }
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
