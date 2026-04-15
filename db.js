import {MongoClient} from "mongodb";

const uri= "mongodb://localhost:27017/";

const client= new MongoClient(uri);
let db = client.db("Blog");

export async function connectDb(){

    try {
        await client.connect();
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error("Erro ao conectar ao banco", error)
    }
}
export function getDb(){
    return db;
}
