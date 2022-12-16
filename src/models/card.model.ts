import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema(
    {
        boardId: { type: mongoose.Schema.Types.ObjectId, required: true },
        columnId: { type: mongoose.Schema.Types.ObjectId, required: true },
        title: { type: String, required: true, minLength: 3, maxLength: 20 },
        cover: { type: String, default: null },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const CardModel = mongoose.model("Card", cardSchema);
