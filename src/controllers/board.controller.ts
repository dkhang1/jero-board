import { BoardModel } from "../models/board.model";
import { Response, Request, NextFunction } from "express";
import { HttpStatusCode } from "../utils/constants";
import { ColumnModel } from "../models/column.model";
const BoardController = {
    createBoard: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newBoard = new BoardModel(req.body);
            const savedBoard = await newBoard.save();
            res.status(HttpStatusCode.OK).json(savedBoard);
        } catch (err) {
            res.status(HttpStatusCode.INTERVAL_SERVER).json(err);
        }
    },
    getBoard: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const board = await BoardModel.findById(req.params.id).populate(
                "columns"
            );
            await board?.columns.forEach((column) =>
                ColumnModel.findById(column).populate("cards")
            );
            res.status(HttpStatusCode.OK).json(board);
        } catch (err) {
            res.status(HttpStatusCode.INTERVAL_SERVER).json(err);
        }
    },
};

export { BoardController };
