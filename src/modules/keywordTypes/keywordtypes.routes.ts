import { Router } from "express";
import { KeywordTypeController } from "./keywordtypes.controller";

class KeywordTypesRoute{
    router: Router;
    controller: KeywordTypeController;
    
    constructor(){
        this.router = Router();
        this.controller = new KeywordTypeController();
        this.routes();
    }

    routes(){
        this.router
            .get("/get", this.controller.getkeywordtypes)
            .post("/add", this.controller.addkeywordtype)
            .patch("/update/:id", this.controller.updatekeywordtype)
            .delete("/delete/:id", this.controller.deletekeywordtype)
    }

}

export default new KeywordTypesRoute().router;