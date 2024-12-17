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
        let cart = carts.find(p => p.id === id)

        return cart
    }

    static async #record(datos = "") {
        if (typeof datos != "string") {
            throw new Error(`Error método Record - argumento con formato inválido`)
        }
        await fs.promises.writeFile(this.#path, datos)
    }

    static async addProductCarts(products) {
        let carts = await this.getCarts();

        const newCart = {
            id: uuidv4(),
            products: products || []
        };
        carts.push(newCart);

        await this.#record(JSON.stringify(carts, null, 5));

        return newCart;
    }





}