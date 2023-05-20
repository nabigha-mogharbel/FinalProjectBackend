import express from 'express';
const router = express.Router();
import {add, getAll} from '../controllers/bus.js';
router.post("/", add)
router.get("/", getAll)
export default router