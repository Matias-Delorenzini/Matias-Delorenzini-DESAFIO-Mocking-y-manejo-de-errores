import express from 'express';
import { generateProduct } from '../utils.js';
const router = express.Router();

export function authorize(role) {
    return (req, res, next) => {
        if (!req.session.user || req.session.user.role !== role) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
} 

function publicRouteAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        res.redirect("/login");
    } else {
        next();
    }
}

router.get('/', publicRouteAuth, async (req, res) => {
    try {
        let products = [];
        for(let i=0;i<100;i++){
            const product = generateProduct();
            products.push(product)
        }
        res.send({stats:"success", payload:products})
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Error al obtener los productos: ' + error.message });
    }
});

export default router;