import { getDb } from "../db.js";
//CORRIGIR DATA
export async function criarPost(req, res) {
    const {titulo, conteudo, data, autor}= req.body;
try {
    const db= getDb();
   
if(!titulo || !conteudo || !data || !autor){
    return res.status(400).json({erro: "Insira dados válidos"});
}

    const novoPost={
        titulo,
        conteudo,
        data,
        autor
    }
    const result= await db.collection('postagens').insertOne(novoPost);
      console.log("Post criado");
        res.status(201).send({message: "Sucesso ao criar post"});

} catch (error) {
    console.error("Erro ao criar post", error);
    res.status(500).send({message: "Erro ao criar post"});
}
}

export async function listarPosts(req, res){
try {
    const db= getDb();
    const posts= await db.collection('postagens').find({}).toArray();
    if(posts.length===0){
        return res.status(404).send({message: "Não há posts encontrados"})
    }
    res.status(200).json(posts);

} catch (error) {
    console.error("Erro ao listar posts", error);
    res.status(404).send({message: "Erro ao listar posts"});
}
}

export async function buscarPost(req, res){
    try {
        const db= getDb();
        const a= String(req.params.autor);
        const post= await db.collection('postagens').findOne({autor: a})
         if(!post){
        return res.status(500).json({erro: "Post não encontrado"})
    }
    res.status(200).json(post)
    
    } catch (error) {
        console.error("Erro ao buscar post", error);
        res.status(404).send({message: "Post não encontrado"})

    }
}