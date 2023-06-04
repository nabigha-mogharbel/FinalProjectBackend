import auth from "../middleware/auth.js"
import express from 'express';
const router = express.Router();
import {add, getAll, get, update, book, manageBook, scheduler,deleteBook, getUpcoming} from '../controllers/trip.js';
router.post("/",  add)
router.get("/", getAll)
router.get("/trip/:id", get)
router.get("/sched/upcoming", getUpcoming)
router.put("/:id",  update)
router.put("/book/:id", book)
router.put("/book/delete/:id", deleteBook)
router.put("/book/manager/:id",manageBook)
router.get("/sched", scheduler)

export default router