// ID da planilha
const sheetId = "1W0AGVO5GQUYSS4MPZPbcCGlVY00-H19sJNSTMd-N1H8";

// URL para acessar os dados da planilha em formato JSON
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

// função para buscar os dados
async function carregarProdutos() {
    // fetch API para obter os dados da planilha
    try {
        const resposta = await fetch(url);
        // JSON armazenado como texto
        const texto = await resposta.text();
        
        // removendo caracteres extras para obter um JSON válido
        const json = JSON.parse(texto.substring(47).slice(0, -2));
        
        const linhas = json.table.rows;

        const saboresList = document.querySelector(".sabores-list");

        saboresList.innerHTML = "";

        // lambda para cada linha (produto)
        linhas.forEach((linha) => {

            let nome = linha.c[0]?.v || "";
            let ingredientes = linha.c[1]?.v || "";
            let preco = linha.c[2]?.v || "";
            let imagem = linha.c[3]?.v || "";
            let ativo = linha.c[4]?.v || "FALSE";

            // mostra apenas os produtos disponiveis
            if (ativo.toString().toUpperCase() !== "TRUE" || nome === "") {
                return;
            }

            // criação do elemento html
            const artigo = document.createElement("article");
            artigo.classList.add("produto");

            artigo.innerHTML = `
                <img src="${imagem}" alt="${nome}">
                <h3>${nome}</h3>
                <p class={"ingredientes"}>(${ingredientes})</p>
                <h4>R$ ${preco}</h4>`;
            
            saboresList.appendChild(artigo);
        });

    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        return;
    }   
}
 document.addEventListener("DOMContentLoaded", carregarProdutos);