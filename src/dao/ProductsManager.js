import fs from "fs"
export class ProductsManager {

    static #path = ""

    static setPath(rutaArchivo = "") {
        this.#path = rutaArchivo
    }

    static async getProducts() {
        if (fs.existsSync(this.#path)) {
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }))
        } else {
            return []
        }
    }


    static async getProductsById(id) {
        let products = await this.getProducts()
        let product = products.find(p => p.id === id)

        return product
    }

    static async getProductsByTitle(title) {
        let products = await this.getProducts()
        let product = products.find(p => p.title.toLowerCase() === title.trim().toLowerCase())
        return product
    }



    static async #record(datos = "") {
        if (typeof datos != "string") {
            throw new Error(`Error método Record - argumento con formato inválido`)
        }
        await fs.promises.writeFile(this.#path, datos)
    }


    static async createProduct(product = {}) {

        let products = await this.getProducts()
        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map(d => d.id)) + 1
        }


        let newProduct = {
            id,

            ...product
        }

        products.push(newProduct)

        await this.#record(JSON.stringify(products, null, 5))
        return newProduct
    }


    static async modifyProduct(id, modifications = {}) {
        let products = await this.getProducts()
        let indexProduct = products.findIndex(p => p.id === id)
        if (indexProduct === -1) {
            throw new Error(`Producto no existe con id ${id}`)
        }

        products[indexProduct] = {
            ...products[indexProduct],
            ...modifications,
            id
        }
        await this.#record(JSON.stringify(products, null, 5))
        return products[indexProduct]
    }

    static async deleteProduct(id) {

        let products = await this.getProducts()
        let productIndex = products.findIndex(p => p.id === id)
        if (productIndex === -1) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: `Producto no encontrado` })
        }


        products.splice(productIndex, 1);

        await this.#record(JSON.stringify(products, null, 5))

        return productIndex
    }

}



