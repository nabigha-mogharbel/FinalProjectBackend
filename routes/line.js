import express from 'express';
const router = express.Router();
import {add, getAll} from '../controllers/line.js';
router.post("/", add)
router.get("/", getAll)
export default router