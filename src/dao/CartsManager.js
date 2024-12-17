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

    static async addProductCarts() {
        let carts = await this.getCarts()

        const newCart = {
            id: uuidv4(), // Generamos un ID único para el carrito
            products: []   // El carrito comienza vacío
        };

        // // Si el cuerpo de la petición contiene productos, los agregamos al carrito
        // if (products && Array.isArray(products)) {
        //     nuevoCarrito.products = products;
        // }

        // Guardamos el nuevo carrito en el arreglo
        carts.push(newCart);

        // Respondemos con el carrito creado

        await this.#record(JSON.stringify(carts, null, 5))
        return newCart
    }




}