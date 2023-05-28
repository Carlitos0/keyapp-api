import { Router } from "express";
import KeywordController from "./keyword.controller";

class KeywordRoute{
    router: Router;
    controller: KeywordController;

    constructor(){
        this.router = Router();
        this.controller = new KeywordController();
        this.routes();
    }

    routes(){
        this.router
            .get("/get", this.controller.getkeywords)
            .get("/get/:id", this.controller.getKeywordById)
            .post("/add", this.controller.addkeyword)
            .delete("/delete/:id", this.controller.deleteKeyword)
            .patch("/update/:id", this.controller.updateKeyword)
    }
}

export default new KeywordRoute().router;