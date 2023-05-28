import { Schema, model } from "mongoose";
import { IKeywordType } from "./interfaces/keyword.interface";


const keywordTypeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true }
},{
    timestamps: true,
})

export default model<IKeywordType>("KeywordType", keywordTypeSchema);