import express from 'express';
const router = express.Router();
import {add, getAll} from '../controllers/schedule.js';
router.post("/", add)
router.get("/", getAll)
export default router