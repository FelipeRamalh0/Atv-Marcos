import { getDb } from "../db.js";
import { ObjectId } from "mongodb";

// 🔹 Criar Autor
export async function criarAutor(req, res) {
    const { nome, email, bio } = req.body;

    try {
        const db = getDb();

        if (!nome || !email || !bio) {
            return res.status(400).json({ erro: "Insira dados válidos" });
        }

        const novoAutor = {
            nome,
            email,
            bio
        };

        const result = await db.collection('autores').insertOne(novoAutor);

        console.log("Autor criado");

        res.status(201).json({
            message: "Sucesso ao criar autor"
        });

    } catch (error) {
        console.error("Erro ao criar autor", error);
        res.status(500).json({ message: "Erro ao criar autor" });
    }
}


// 🔹 Listar Autores
export async function listarAutores(req, res) {
    try {
        const db = getDb();
        const autores = await db.collection('autores').find({}).toArray();

        if (autores.length === 0) {
            return res.status(404).json({ erro: "Não há autores registrados" });
        }

        res.status(200).json(autores);

    } catch (error) {
        console.error("Erro ao listar autores", error);
        res.status(500).json({ message: "Erro na listagem de autores" });
    }
}


// 🔹 Buscar Autor por ID
export async function buscarAutor(req, res) {
    try {
        const db = getDb();
        const id = req.params.id;

        // valida se o id é válido
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        const autor = await db.collection('autores').findOne({
            _id: new ObjectId(id)
        });

        if (!autor) {
            return res.status(404).json({ erro: "Autor não encontrado" });
        }

        res.status(200).json(autor);

    } catch (error) {
        console.error("Erro ao buscar autor", error);
        res.status(500).json({ message: "Erro ao buscar autor" });
    }
}