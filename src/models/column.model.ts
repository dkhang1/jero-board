import mongoose, { Schema } from "mongoose";

const columnSchema = new Schema(
    {
        boardId: { type: mongoose.Types.ObjectId, required: true },
        cardOrder: { type: Array, default: [] },
        title: { type: String, required: true, minLength: 3, maxLength: 20 },
        _destroy: { type: Boolean, default: false },
        cards: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Card",
            },
        ],
    },
    { timestamps: true }
);

export const ColumnModel = mongoose.model("Column", columnSchema);
