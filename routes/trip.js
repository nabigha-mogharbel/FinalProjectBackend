import express from 'express';
const router = express.Router();
import {add, getAll, get, update} from '../controllers/trip.js';
router.post("/", add)
router.get("/", getAll)
router.get("/trip/:id", get)
router.put("/:id", update)
export default router