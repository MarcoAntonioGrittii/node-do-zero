import { fastify } from "fastify" //Importando um biblioteca
//import { DataBaseMemory } from "./database-memory.js"
import { DataBasePostgres } from "./database-postgres.js"

const server = fastify() //Jogandos as fucionalidades de fasfity, dentro se server


//const database = new DataBaseMemory()
const database = new DataBasePostgres()

 server.post("/videos", async (req,res) =>{
    
    const {title,description,duration} = req.body //Aqui eu estou fazendo a Desestruturação de um objeto, no caso a requição 
    
    await database.create({ 
        title,
        description,
        duration,  
    })

    
    return res.status(201).send() //Retornando uma resposta 201(Video criado com sucesso) e etou enviado ao usuario
})

server.get("/videos", async (req) =>{
    const search = req.query.search //Estou pegando o valor da search enviada no meu endpoint

    const videos = await database.list(search) /*pegando o conteudo inteiro do meu database, caso seja
                                 passado uma search, então será retornado somente o conteudo da search*/

    return videos
})

server.put("/videos/:id", async (req,res) =>{
    const videoId = req.params.id

    const {title,description,duration} = req.body

    await database.update(videoId,{
        title,
        description,
        duration,
    })

    return res.status(204).send()
})


server.delete("/videos/:id", async (req,res) =>{
    const videoId = req.params.id

    database.delete(videoId)

    return res.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})