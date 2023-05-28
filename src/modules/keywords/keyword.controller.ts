import { NextFunction, Request, Response } from "express";
import Keyword from "../../models/keyword";
import { CustomError } from "../../helpers/CustomError";
import { KeywordDomain } from "./domain/keyword-domain";
import KeywordType from "../../models/keywordType";

class KeywordController{

    async getkeywords(req: Request, res: Response, next: NextFunction){
        try {
            const data = await Keyword.find().populate({ path: "type", select: "_id name" });
            return res.status(200).json(data)
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }

    async addkeyword(req: Request, res: Response, next: NextFunction){
        try {
            const { key, value, type } = req.body;
            const objType = await KeywordType.findOne({ name: type });
            if(!objType || objType === null){
                const err = new CustomError("Keyword type not found", CustomError.statusCodes.NOT_FOUND);
                next(err);
                return
            }
            const keyword = new KeywordDomain(key, value, objType._id.toString());
            const data = new Keyword(keyword);
            await data.save();
            return res.status(201).json({
                message: "Keyword added successfully",
                data
            })
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }

    async deleteKeyword(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const obj = await Keyword.findById(id);
            if(!obj || obj === null){
                const err = new CustomError("Keyword not found", CustomError.statusCodes.NOT_FOUND);
                next(err);
                return
            }
            console.log(obj);
            await Keyword.findByIdAndDelete(id);
            return res.status(200).json({
                message: "Keyword deleted successfully"
            })
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }

    async updateKeyword(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const { key, value, type } = req.body;
            const keyObj = await Keyword.findById(id).select("key value type");
            if(!keyObj || keyObj === null){
                const err = new CustomError("Keyword not found", CustomError.statusCodes.NOT_FOUND);
                next(err);
                return
            }
            const keywordUpdated = new KeywordDomain(key, value, type);
            await Keyword.findByIdAndUpdate(id, keywordUpdated)
            return res.status(200).json({
                message: "Keyword updated successfully",
                data: keywordUpdated
            })
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }
    
    async getKeywordById(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const keywordById = await Keyword.findById(id);
            if(!keywordById || keywordById === null){
                const err = new CustomError("Keyword not found", CustomError.statusCodes.NOT_FOUND);
                next(err);
                return
            }
            return res.status(200).json(keywordById)
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }
}

export default KeywordController;