import express from 'express';
const router = express.Router();
import {register, login, get, update} from '../controllers/user.js';
router.post("/register", register)
router.post("/login", login)
router.get("/id/:id", get)
router.put("/update/:id",update )
export default router