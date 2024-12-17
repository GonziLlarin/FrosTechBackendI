import fs from "fs"
import { v4 as uuidv4 } from 'uuid';
export class CartsManager {
    static #path = ""

    static setPath(rutaArchivo = "") {
        this.#path = rutaArchivo
    }

    static async getCarts() {
        if (fs.existsSync(this.#path)) {
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }))
        } else {
            return []

        }
    }
    static async getCartsById(id) {
        let carts = await this.getCarts()
        let indexCart = carts.findIndex(p => p.id === id)
        if (indexCart === -1) {
            throw new Error(`Producto no existe con id ${id}`)
        }
        return indexCart
    }

    static async #record(datos = "") {
        if (typeof datos != "string") {
            throw new Error(`Error método Record - argumento con formato inválido`)
        }
        await fs.promises.writeFile(this.#path, datos)
    }

    static async addProductCarts(products = []) {
        let carts = await this.getCarts();
        let newId = 1;
        if (carts.length > 0) {
            newId = Math.max(...carts.map(c => c.id)) + 1;
        }
        const productsWithIds = products.map((product, id) => {
            if (!product.id) {
                product.id = id + 1;
            }
            return product;
        });

        let newCart = {
            id: newId,
            products: productsWithIds || []
        };
        carts.push(newCart);

        await this.#record(JSON.stringify(carts, null, 5));

        return newCart;
    }





}