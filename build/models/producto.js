"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let productoSchema = new mongoose_1.Schema({
    nombre: {
        type: String, required: [true, 'El nombre es requerido']
    },
    precioUni: {
        type: Number, required: [true, 'El precio es requerido']
    },
    descripcion: {
        type: String, required: [false]
    },
    disponible: {
        type: Boolean, required: [true, 'Esta disponible'], default: true
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Categoria'
    }
});
exports.default = mongoose_1.model('Producto', productoSchema);
