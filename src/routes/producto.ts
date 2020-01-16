import {Router, Request, Response} from 'express';

import ProductoModel from '../models/producto';
import CategoriaModel from '../models/categoria';

class Producto 
{
    router : Router;

    constructor()
    {
        this.router = Router();
        this.exponerRutas();
    }

     async getProducto(req: Request, res: Response)
    {
        try {
            let ProductoBD = await ProductoModel.find({}).sort('nombre');
            let conteo = await ProductoModel.countDocuments();

            CategoriaModel.populate(ProductoBD,{path:"Categoria",select:"nombre"});

            res.json(
                {
                    productosAlmacenados: ProductoBD,
                    conteodeProductos: conteo
                });

        } catch (error) {
            return res.status(400).json(
                {
                    errorGenerado: error
                });

        }
    }

    async getProductoId(req : Request, res : Response)
    {
        try {

            let idurl = req.params.id;
            let ProductoBD = await ProductoModel.findById(idurl);

            res.json(
                {
                    ok: true,
                    productoGenerado: ProductoBD
                }
            )
        } catch (error) {
            return res.status(400).json(
                {
                    errorGenerado: error
                });
        }
        

    }

    async postProducto(req : Request, res : Response)
    {
        try {
        let bodycabecera = req.body;
        let producto = new ProductoModel(
            {
                nombre: bodycabecera.nombre,
                precioUni : bodycabecera.precioUni,
                descripcion :bodycabecera.descripcion,
                categoria : bodycabecera.categoria
            }
        )
        let productoBD = await producto.save();

        res.json(
            {
                ProductoCreado : productoBD
            }
        )
        } catch (error) {
            return res.status(400).json(
                {
                    dato: error
                });
        }
        
    }

    async putProducto(req : Request, res : Response)
    {
        try {
            let idurl = req.params.id;
            let bodycabecera = req.body;
            let ProductoBD = await ProductoModel.findByIdAndUpdate(idurl, bodycabecera, 
                { new: true, runValidators: true, context: 'query' });
            res.json(
                {
                    producto: ProductoBD
                })

        } catch (error) {
            return res.status(400).json(
                {
                    ok: "ERROR",
                    dato: error
                });

        }

    }

    async deleteProducto(req : Request, res : Response)
    {
        try {

            let idurl = req.params.id;
            let ProductoBD = await ProductoModel.findByIdAndRemove(idurl);

            res.json(
                {
                    productoEliminado: ProductoBD
                }
            )
        } catch (error) {
            return res.status(400).json(
                {
                    errorGenerado: error
                });
        }
    }



    exponerRutas()
    {
        this.router.get('/', this.getProducto);
        this.router.get('/:id', this.getProductoId);
        this.router.post('/', this.postProducto);
        this.router.put('/:id',this.putProducto);
        this.router.delete('/:id', this.deleteProducto);
    }
}

const producto = new Producto();
export default producto.router;