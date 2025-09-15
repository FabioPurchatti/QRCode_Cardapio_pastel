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
        const bebidasList = document.querySelector(".bebidas-list");
        

        saboresList.innerHTML = "";

        // lambda para cada linha (produto)
        linhas.forEach((linha) => {

            let nome = linha.c[0]?.v || "";
            let info = linha.c[1]?.v || "";
            let preco = linha.c[2]?.v || "";
            let imagem = linha.c[3]?.v || "";
            let ativo = linha.c[4]?.v || "FALSE";
            let tipo = linha.c[5]?.v || "";

            // mostra apenas os produtos disponiveis
            if (ativo.toString().toUpperCase() !== "TRUE" || nome.toString() === "") {
                return;
            }

            // criação do elemento html
            if (tipo.toString().toUpperCase() === "SABOR") {
              console.log(preco);
              const artigo = document.createElement("article");
              artigo.classList.add("produto");
  
              artigo.innerHTML = `
                  <img src="${imagem}" alt="${nome}">
                  <div class={"info"}>
                      <h3>${nome}</h3>
                      <p class={"ingredientes"}>(${info})</p>
                  </div>
                  <h4>${preco.toString()}</h4>`;
              
              saboresList.appendChild(artigo);
            }
            else if (tipo.toString().toUpperCase() === "BEBIDA") {
              const artigo = document.createElement("article");
              artigo.classList.add("produto");
  
              artigo.innerHTML = `
                  <img src="${imagem}" alt="${nome}">
                  <h3>${nome}</h3>
                  <p>${info}</p>
                  <h4>${preco}</h4>`;
              
              bebidasList.appendChild(artigo);
            }
        });

    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
        return;
    }   
}
document.addEventListener("DOMContentLoaded", carregarProdutos);

// Botão voltar ao topo

 (function () {
  const btn = document.getElementById('toTop');
  if (!btn) return;

  const THRESHOLD = 120; // px de rolagem para mostrar

  // mostrar/ocultar no scroll
  const onScroll = () => {
    if (window.scrollY > THRESHOLD) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  };

  // rolagem suave até o topo
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ligar eventos
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', scrollToTop);

  // chamada inicial (caso entre em âncoras já roladas)
  onScroll();
})();