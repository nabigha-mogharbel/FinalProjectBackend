import auth from "../middleware/auth.js"
import express from 'express';
const router = express.Router();
import {add, getAll, get, update, book, manageBook, deleteBook} from '../controllers/trip.js';
router.post("/", auth(["passenger", "manager"]), add)
router.get("/",auth(["passenger", "manager"]), getAll)
router.get("/trip/:id",auth(["passenger", "manager"]), get)
router.put("/:id", auth(["passenger", "manager"]), update)
router.put("/book/:id", auth(["passenger"]), book)
router.put("/book/delete/:id", auth(["passenger"]), deleteBook)
router.put("/book/manager/:id", auth(["manager"]), manageBook)

export default router