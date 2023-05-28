import express, { Application } from "express";
import errorHandler from "./middlewares/errorHandler";
import KeywordRoute from "./modules/keywords/keyword.routes";
import keywordtypesRoutes from "./modules/keywordTypes/keywordtypes.routes";
import morgan from "morgan";
import connect from './config/database';

class App{
    app: Application;

    constructor(){
        this.app = express();
        connect();
        this.middlewares();
        this.routes();
        this.app.use(errorHandler);
    }

    middlewares(){
        this.app.use(express.json()); 
        this.app.use(morgan("dev"))  
    }

    routes(){
        this.app.use("/api/v1/keyword", KeywordRoute)
        this.app.use("/api/v1/keywordTypes", keywordtypesRoutes)
    }
}


export default new App().app;