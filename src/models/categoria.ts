import { Schema,model } from 'mongoose';

let categoriaSchema = new Schema(
    {
        nombre:{
            type: String,
            required: [true, 'Nombre es obligatorio']
    }
    });

export default model('Categoria',categoriaSchema);