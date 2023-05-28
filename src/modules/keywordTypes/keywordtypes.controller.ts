import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../helpers/CustomError";
import keywordType from "../../models/keywordType";
import { keywordTypeDomain } from "./domain/keywordType.domain";

export class KeywordTypeController{
    async getkeywordtypes(req: Request, res: Response, next: NextFunction){
        try {
            const data = await keywordType.find();
            return res.status(200).json(data)
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }

    async addkeywordtype(req: Request, res: Response, next: NextFunction){
        try {
            const { name } = req.body;
            const data = new keywordTypeDomain(name);
            const keyword = new keywordType(data);
            await keyword.save();
            return res.status(201).json({
                message: "Keyword type added successfully",
                data: keyword
            })
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }

    async deletekeywordtype(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const obj = await keywordType.findById(id);
            if(!obj || obj === null){
                const err = new CustomError("Keyword type not found", CustomError.statusCodes.NOT_FOUND);
                next(err);
                return
            }
            await keywordType.findByIdAndDelete(id);
            return res.status(200).json({
                message: "Keyword type deleted successfully"
            })
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }

    async updatekeywordtype(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const { name } = req.body;
            const obj = await keywordType.findById(id);
            if(!obj || obj === null){
                const err = new CustomError("Keyword type not found", CustomError.statusCodes.NOT_FOUND);
                next(err);
                return
            }
            const keywordTypeUpdate = new keywordTypeDomain(name);
            await keywordType.findByIdAndUpdate(id, keywordTypeUpdate);
            return res.status(200).json({
                message: "Keyword type updated successfully",
                data: keywordTypeUpdate
            })
        } catch (error) {
            const err = new CustomError(error.message, CustomError.statusCodes.INTERNAL_SERVER);
            next(err);
            return
        }
    }
}