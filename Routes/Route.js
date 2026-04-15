import Router from "express";
import { criarAutor, listarAutores, buscarAutor} from "../Controller/autoresController.js";
import {criarPost, listarPosts, buscarPost} from "../Controller/postagensController.js";
const router= Router();

router.post("/autores", criarAutor);
router.post("/postagens", criarPost);
router.get("/postagens", listarPosts);
router.get("/postagens/autor/:autorId", buscarPost)
router.get("/autores", listarAutores);
router.get("/autores/:id", buscarAutor);


export const rotas= router;