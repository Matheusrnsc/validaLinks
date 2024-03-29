import pegaArquivo from "./index.js";
import chalk from "chalk";
import fs from "fs";
import listaValidada from "./http.validação.js";


const caminho = process.argv;
async function imprimeLista(valida ,resultado, identificador =''){
    if(valida){
    console.log(chalk.yellow(`Lista validada ${identificador}`), await listaValidada(resultado));
    }else{
    console.log(chalk.yellow(`Lista: ${identificador}`), resultado);
    }
}

async function processaTexto(argumentos){
    const caminho =argumentos[2];
    const valida =  argumentos[3] === "--valida";
    console.log(valida)

    try{
        fs.lstatSync(caminho)
    }catch(erro){
        if(erro.code === "ENOENT"){
            console.log("Arquivo ou diretório não existe")
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho);
        imprimeLista(valida, resultado);
     }else if(fs.statSync(caminho).isDirectory()){
        const arqivos = await fs.promises.readdir(caminho)
        arqivos.forEach(async (nomeDoArquivo)=> {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`)
            imprimeLista(valida, lista, nomeDoArquivo)
        })
     }
}

processaTexto(caminho);