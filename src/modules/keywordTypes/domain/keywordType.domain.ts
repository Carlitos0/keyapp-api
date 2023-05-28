export class keywordTypeDomain{
    name: string;
    active: boolean;
    constructor(name: string){

        if(name === undefined || name === null || name === ""){
            throw new Error("name is required");
        }

        if(name.length <= 3){
            throw new Error(`name must be at least 4 characters long. Received: /${name}/ - ${name.length} characters`);
        }

        this.name = name;
        this.active = true;
    }
}