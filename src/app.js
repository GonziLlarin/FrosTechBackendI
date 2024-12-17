import express from 'express';
import { router as productsRouter } from './routes/productsRouter.js'
import { router as cartsRouter } from './routes/cartsRouter.js'


const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/products", productsRouter)
app.use('/api/carts', cartsRouter)


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('BIENVENIDO A FROSTECH by Gonzalo Llarin');
})


// app.get('/api/products', (req, res) => {
//     let products = ProductsManager.getProducts()

//     res.setHeader('Content-Type', 'application/json');
//     return res.status(200).json({ products });
// })

// app.get('/api/:pid', (req, res) => {
//     if (products.length === 0) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `No hay productos` })
//     }

//     let { pid } = req.params

//     pid = Number(pid)
//     if (isNaN(pid)) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `Debe indicar un valor numérico` })
//     }

//     if (pid < 1 || pid > products.length) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `La posición debe estar entre 1 y ${products.length}` })
//     }
//     let product = products[pid - 1]
//     res.setHeader('Content-Type', 'application/json');
//     return res.status(200).json({ product });


// })

// app.post('/api/products', (req, res) => {

//     let { product } = req.body
//     if (!product) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `La prop es requerida` })
//     }

//     products.push(product)
//     res.setHeader('Content-Type', 'application/json');
//     return res.status(201).json(`Se agrego ${product}`)
// });

// app.put('/api/:pid', (req, res) => {
//     if (products.length === 0) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `No hay productos para modificar` })
//     }

//     let { pid } = req.params

//     pid = Number(pid)
//     if (isNaN(pid)) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `Debe indicar un valor numérico` })
//     }

//     if (pid < 1 || pid > products.length) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `La posición debe estar entre 1 y ${products.length}` })
//     }

//     let productAnterior = products[pid - 1].title
//     let { title } = req.body

//     if (!title) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `La prop id es requerida` })
//     }
//     products[pid - 1].title = title
//     res.setHeader('Content-Type', 'application/json');

//     return res.status(200).json({ payload: `nombre modificado`, productAnterior, newProduct: title, products });
// })


// app.delete('/api/:pid', (req, res) => {
//     if (products.length === 0) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `No hay productos para eliminar` })
//     }

//     let { pid } = req.params

//     pid = Number(pid)
//     if (isNaN(pid)) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `Debe indicar un valor numérico` })
//     }

//     if (pid < 1 || pid > products.length) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `La posición debe estar entre 1 y ${products.length}` })
//     }
//     let productDelete = products[pid - 1]

//     products.splice(pid - 1, 1)


//     res.setHeader('Content-Type', 'application/json');
//     return res.status(200).json({ payload: `Se elimino a ${productDelete.title} con éxito`, products });

// })



const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

