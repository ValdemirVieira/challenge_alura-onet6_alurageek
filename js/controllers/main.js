import { servicesProdutos } from "../services/produto-services.js";

const produtoContainer = document.querySelector("[data-produto]");
const form = document.querySelector("[data-form]");

function criaElemento(nome, preco, imagem, id) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute('data-id', id);
    card.innerHTML = `
        <div class="container-imagem">
            <img src="${imagem}" alt="${nome}">
        </div>

        <div class="container-card--info">
            <p>${nome}</p>
            <div class="container-card--value">
                <p>R$ ${preco}</p>
                <button class="botao-delete" data-id="${id}">
                    <img src="./assets/icon_trash.png" alt="Imagem lixeira">
                </button>
            </div>
        </div>
    `

    const botaoDeletar = card.querySelector(".botao-delete");
    botaoDeletar.addEventListener("click", async (e) => {
        e.preventDefault();

        let confirmaDelete = confirm('Deseja realmente deletar este produto?');
        if(confirmaDelete == true) {
            botaoDeletar.closest("div").remove();
            await servicesProdutos.deletarProduto(id);
            alert('Produto deletado com sucesso!');
        }
    });

    produtoContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProdutos = await servicesProdutos.listaProdutos();
        listProdutos.forEach((produto) => {
            produtoContainer.appendChild(criaElemento(produto.nome, produto.preco, produto.imagem, produto.id));
        });
    } catch(error) {
        console.log(error);
    }
}

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const name = document.querySelector("[data-nome]").value;
    const price = document.querySelector("[data-preco]").value;
    const image = document.querySelector("[data-imagem]").value;

    servicesProdutos.criarProduto(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

});

render();