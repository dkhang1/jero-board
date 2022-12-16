import express from "express";
import { CardController } from "../controllers/card.controller";

const router = express.Router();
router.post("/createCard", CardController.createCard);
export = router;
