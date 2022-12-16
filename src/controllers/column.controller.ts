import { ColumnModel } from "../models/column.model";
import { Response, Request, NextFunction } from "express";
import { HttpStatusCode } from "../utils/constants";
import { BoardModel } from "../models/board.model";

const ColumnController = {
    createColumn: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newColumn = new ColumnModel(req.body);
            const savedColumn = await newColumn.save();
            if (req.body.boardId) {
                const board = BoardModel.find({ _id: req.body.boardId });
                await board.updateOne({ $push: { columns: savedColumn._id } });
            }
            res.status(HttpStatusCode.OK).json(savedColumn);
        } catch (err) {
            res.status(HttpStatusCode.INTERVAL_SERVER).json(err);
        }
    },
    updateColumn: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateColumn: any = await ColumnModel.findById(req.params.id);
            await updateColumn.updateOne({ $set: req.body });
            res.status(HttpStatusCode.OK).json({
                message: "Updated successfully !!!",
            });
        } catch (err) {
            res.status(HttpStatusCode.INTERVAL_SERVER).json(err);
        }
    },
    getColumn: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const column = await ColumnModel.findById(req.params.id).populate(
                "cards"
            );

            res.status(HttpStatusCode.OK).json(column);
        } catch (err) {
            res.status(HttpStatusCode.INTERVAL_SERVER).json(err);
        }
    },
};

export { ColumnController };
