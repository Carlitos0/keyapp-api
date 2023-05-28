import { NextFunction, Request, Response } from "express";
import winston from "winston";

class HandleError{
    public errorHandler(err: any, req: Request, res: Response, next: NextFunction){
        const logger = winston.createLogger({
                level: "error",
                format: winston.format.json(),
                transports: [
                    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
                    new winston.transports.Console()
                ],
        })
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        const is_success = err.is_success || false;
    

        logger.error({
            timestamp: new Date().toISOString(),
            url: req.originalUrl,
            method: req.method,
            file: err.fileName || null,
            code: statusCode,
            message: message,
            is_success: is_success,
            stack: err.stack
        })

        res.status(statusCode).json({
            error:{
                code: statusCode,
                message: message,
                is_success: is_success
            }
        }); 
    }
}

export default new HandleError().errorHandler;