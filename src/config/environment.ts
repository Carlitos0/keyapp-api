import dotenv from "dotenv"
dotenv.config();

export class env{
    static PORT = process.env.PORT || 3000;
    static MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;
    static MONGODB_USER = process.env.MONGODB_USER;
    static MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
    static MONGODB_NAME = process.env.MONGODB_NAME
}