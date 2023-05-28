import { IKeywordType } from "src/models/interfaces/keyword.interface";

export class KeywordDomain{
    key: string;
    value: string;
    type: string;
    active: boolean;

    constructor(key: string, value: string, type: string){
        if(key === undefined || key === null || key === ""){
            throw new Error("key is required");
        }
        if(key.length < 6){
            throw new Error(`key must be at least 6 characters long. Received: /${key}/ - ${key.length} characters`);
        }

        this.key = key;
        this.value = value;
        this.type = type;
        this.active = true;
    }
}