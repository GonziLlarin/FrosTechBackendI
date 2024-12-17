import { Router } from 'express'
import { CartsManager } from '../dao/CartsManager.js';
import { controlError } from "../utils.js";


export const router = Router()
CartsManager.setPath('./src/data/carrito.json')

router.post('/', async (req, res) => {
    try {
        const { products } = req.body;


        if (!Array.isArray(products)) {
            return res.status(400).json({ error: "La prop debe ser un array" });
        }

        const newCart = await CartsManager.addProductCarts(products);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(newCart);

    } catch (error) {
        controlError(res, error);
    }
});



router.get('/:cid', async (req, res) => {
    let carts = CartsManager.getCarts()
    let { cid } = req.params
    // cid = Number(cid)
    // if (carts.length === 0) {
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(400).json({ error: `No hay productos ` })
    // }

    // if (isNaN(cid)) {
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(400).json({ error: `Debe indicar un valor numérico` })
    // }


    // if (cid < 1 || cid > carts.length) {
    //     res.setHeader('Content-Type', 'application/json');
    //     return res.status(400).json({ error: `La posición debe estar entre 1 y ${carts.length}` })
    // }
    try {
        let carts = await CartsManager.getCarts()
        let cart = await CartsManager.getCartsById(cid)
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: `No existe ningun producto con id: ${cart}` })
        }
        let cartToma = carts[cart]

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ cartToma });
    } catch (error) {
        controlError(res, error)
    }


})

router.post('/:cid/product/:pid', (req, res) => {

})