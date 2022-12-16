import { CardModel } from "../models/card.model";
import { Response, Request, NextFunction } from "express";
import { HttpStatusCode } from "../utils/constants";
import { ColumnModel } from "../models/column.model";

const CardController = {
    createCard: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newCard = new CardModel(req.body);
            const savedCard = await newCard.save();
            if (req.body.columnId) {
                const column = ColumnModel.findById(req.body.columnId);
                await column.updateOne({ $push: { cards: savedCard._id } });
            }
            res.status(HttpStatusCode.OK).json(savedCard);
        } catch (err) {
            res.status(HttpStatusCode.INTERVAL_SERVER).json(err);
        }
    },
};

export { CardController };
