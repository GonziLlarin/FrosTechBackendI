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
    let { cid } = req.params;
    cid = Number(cid);

    try {
        let carts = await CartsManager.getCarts();
        let { limit } = req.query
        if (limit) {
            carts = carts.slice(0, limit)
        }

        if (isNaN(cid)) {
            return res.status(400).json({ error: "Debe indicar un valor numérico" });
        }
        if (cid < 1 || cid > carts.length) {
            return res.status(400).json({ error: `La posición debe estar entre 1 y ${carts.length}` });
        }

        let cart = await CartsManager.getCartsById(cid);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ cart });
    } catch (error) {
        controlError(res, error);
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        let carts = await CartsManager.getCarts();
        const cart = carts.find(c => c.id === parseInt(cid));
        if (!cart) {
            return res.status(404).json({ error: `Carrito con ID ${cid} no encontrado` });
        }


        const updatedCart = await CartsManager.updateCart(cid, pid);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(updatedCart);

    } catch (error) {
        controlError(res, error);
    }
});


