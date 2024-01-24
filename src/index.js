//const chalk = require('chalk') era a forma antiga de fazer os imports, está sendo abandonada
import fs from "fs";
import chalk from 'chalk';

function extraiLinks (texto) {
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.]*.[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]:captura[2]}))
    return resultados.length !== 0 ? resultados : "Não há links no arquivo" ;
}

function trataErro(erro){
    throw new Error(chalk.red(erro.code, "Não há arquivo no diretório"));
}
// async e awayt

async function pegaArquivo(caminhoDoArquivo){
    try{
        const encoding = "utf-8";
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return (extraiLinks(texto))
    }catch(erro){
    trataErro(erro)
    }
}

pegaArquivo('./arquivos/texto.md')


export default pegaArquivo;


//------------------------------------------------------------------------------
// Função assíncorna com promisses e then
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = "utf-8";
//     fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(chalk.magenta(texto)))
//     .catch(trataErro)
// }
// ------------------------------------------------------------------------------
 // Função Síncrona
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = "utf-8";
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if(erro){
//             trataErro(erro)
//         }
//         console.log(chalk.magenta(texto));
//     })
// }

