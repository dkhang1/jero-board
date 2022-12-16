import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import { ColumnModel } from "./column.model";
const boardSchema = new Schema(
    {
        title: { type: String, required: true, minLength: 3, maxLength: 20 },
        columnOrder: { type: Array, default: [] },
        columns: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Column",
            },
        ],
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const BoardModel = mongoose.model("Board", boardSchema);

