import { getDb } from "../db.js";

export async function criarAutor(req, res){
    const {nome, email, bio}= req.body;
    try {
       const db= getDb();
        
        if(!nome || !email || !bio){
            return res.status(400).json({erro: "Insira dados válidos"})
        }

       const novoAutor={
        nome,
        email,
        bio
       }
       const result= await db.collection('autores').insertOne(novoAutor);
        console.log("Autor criado");
        res.status(201).send({message: "Sucesso ao criar autor"});
    } catch (error) {
        console.error("Erro ao criar autor", error);
        res.status(500).send({message: "Erro ao criar autor"});
    }

}

export async function listarAutores(req, res){
try {
    const db= getDb();
    const autores= await db.collection('autores').find({}).toArray();
      if(!autores){
        return res.status(404).json({erro: "Não há autores registrados"});
    }
    res.status(200).json(autores);
} catch (error) {
    console.error("Erro ao listar autores", error);
    res.status(500). send({message: "Erro na listagem de autores"});
}
}

export async function buscarAutor(req, res){
try {
    const db= getDb();
    const id= Number(req.params.id);
    const autor = await db.collection('autores').findOne({ id: id });

    if(autor.length===0){
        return res.status(404).json({erro: "Autor não encontrado"})
    }

    res.json(autor);

} catch (error) {
    console.error("Erro ao buscar autor", error);
    res.status(404).send({message: "Autor não encontrado"})
}
}


