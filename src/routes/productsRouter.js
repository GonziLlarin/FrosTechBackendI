import { Router } from "express"
import { ProductsManager } from '../dao/ProductsManager.js';
import { controlError } from "../utils.js";

export const router = Router()

ProductsManager.setPath('./src/data/products.json')



router.get('/', async (req, res) => {
    try {
        let products = await ProductsManager.getProducts()

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ products });

    } catch (error) {

        controlError(res, error)
    }
})

router.get('/:pid', async (req, res) => {
    let products = ProductsManager.getProducts()
    let { pid } = req.params
    pid = Number(pid)
    if (products.length === 0) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No hay productos ` })
    }

    if (isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Debe indicar un valor numérico` })
    }


    if (pid < 1 || pid > products.length) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `La posición debe estar entre 1 y ${products.length}` })
    }
    try {
        let product = await ProductsManager.getProductsById(pid)
        if (!product) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: `No existe ningun producto con id: ${pid}` })

        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ product });
    } catch {
        controlError(res, error)
    }
})


router.post('/', async (req, res) => {
    let { title, description, code, price, status, stock, category } = req.body
    // let { title, ...otros } = req.body
    if (!title || !description || !code || !price || !status || !stock || !category)
    // if (!title)
    {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Todas las propiedades son requeridas` })
    }

    try {
        let existe = await ProductsManager.getProductsByTitle(title)

        if (existe) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ya existe ${title} en base de datos` })
        }

        let newProduct = await ProductsManager.createProduct({ title, description, code, price, status, stock, category })
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: `Alta exitosa`, newProduct });
    } catch (error) {
        controlError(res, error)
    }
})

router.put('/:pid', async (req, res) => {
    let products = ProductsManager.getProducts()
    let { pid } = req.params
    pid = Number(pid)
    if (products.length === 0) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No hay productos para modificar` })
    }

    if (isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Debe indicar un valor numérico` })
    }


    if (pid < 1 || pid > products.length) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `La posición debe estar entre 1 y ${products.length}` })
    }
    let productToModify = req.body
    if (productToModify.id) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No se puede modificar el Id` })
    }

    try {
        if (productToModify.title) {

            let products = await ProductsManager.getProducts()
            let existe = products.find(p => p.title.toLowerCase() === productToModify.title.trim().toLowerCase() && p.id != pid)
            if (existe) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `Ya existe un producto con title ${existe.title} en DB, Tiene el id :${existe.id}` })
            }

        }
        let modifiedProduct = await ProductsManager.modifyProduct(pid, productToModify)

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: `Se modifico el producto ${pid}`, modifiedProduct });
    } catch (error) {
        controlError(res, error)
    }

})

router.delete('/:pid', async (req, res) => {

    let products = ProductsManager.getProducts()
    let { pid } = req.params

    pid = Number(pid)
    if (products.length === 0) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No hay productos para eliminar` })
    }

    if (isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Debe indicar un valor numérico` })
    }


    if (pid < 1 || pid > products.length) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `La posición debe estar entre 1 y ${products.length}` })
    }

    try {
        let productDeleted = await ProductsManager.deleteProduct(pid)


        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: `Se elimino a ${productDeleted} con éxito` }
        );
    } catch (error) {
        controlError(res, error)
    }

})