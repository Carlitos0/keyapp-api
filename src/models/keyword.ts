import { Schema, model } from "mongoose";
import { IKeyword } from "./interfaces/keyword.interface";

const keywordSchema = new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, ref: "KeywordType", default: "sin clasificar" },
    active: { type: Boolean, default: true }
},{
    timestamps: true,
    versionKey: false
});

export default model<IKeyword>("Keyword", keywordSchema);