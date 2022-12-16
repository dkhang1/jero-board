import express from "express";
import { ColumnController } from "../controllers/column.controller";

const router = express.Router();
router.post("/createColumn", ColumnController.createColumn);
router.put("/updateColumn/:id", ColumnController.updateColumn);
router.get("/getColumn/:id",ColumnController.getColumn)
export = router;
