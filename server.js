import express from "express";
import {connectDb} from "./db.js";
import { rotas } from "./Routes/Route.js";

const app= express();
const PORT= 3000
app.use(express.json());

await connectDb()

app.use(rotas);

app.listen(PORT, ()=>{
      console.log(`Servidor rodando em: http://localost:${PORT}`)  
    
}
)