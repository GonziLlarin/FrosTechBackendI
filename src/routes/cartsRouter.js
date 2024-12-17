import { Router } from 'express'
import { CartsManager } from '../dao/CartsManager.js';
import { controlError } from "../utils.js";


export const router = Router()
CartsManager.setPath('./src/data/carts.json')

router.post('/', (res, req) => {

})