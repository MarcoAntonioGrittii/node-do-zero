import { randomUUID } from "node:crypto"//Utilizando modulo nativo do js - crypto - Serve para gera um id unico

export class DataBaseMemory{
    
    #videos = new Map() //Objeto que permite criar pares chave-valor dentro dele, o primeiro sempre será a chave unica e o segundo será o valor daquela chave

    create(video){
        const videoId = randomUUID()//videoId ira receber um numero aleatório

        this.#videos.set(videoId, video)//Set serve para adicionar algo dentro do meu objeto, porem ele sempre ira pedir por um id primeiro
    }

    list(search){ //Função de linstagem(get)
       return Array.from(this.#videos.entries()).map(videoArray, () =>{ //Transformando meus valores em arrays, e cada array esta separado em chave-valor, e nisso eu estou acessando cada array
            const id = videoArray[0]    //Peguei o valor do meu id 
            const data = videoArray[1] //Peguei o valor do meu corpo

            return {
                id,
                ...data
            }//Retornando um formato de resposta, para que o id fique junto ao data 

       }).filter(video =>{ 
        if(search){
            return video.title.includes(search)
        }

        return true

       })
    }

    update(id,video){
        this.#videos.set(id, video)
    }
    

    delete(id){
        this.#videos.delete(id)
    }
}