import express from "express";
import { BoardController } from "../controllers/board.controller";

const router = express.Router();

// [POST] create
router.post("/createBoard", BoardController.createBoard);
// [GET]
router.get("/getBoard/:id", BoardController.getBoard);
export = router;
