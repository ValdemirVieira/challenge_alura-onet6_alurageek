const listaProdutos = () => {
    return fetch("http://localhost:3000/produtos")
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

const criarProduto = (nome, preco, imagem) => {
    return fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome,
            preco,
            imagem
        })
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const deletarProduto = async (id) => {
    const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}

export const servicesProdutos = {
    listaProdutos,
    criarProduto,
    deletarProduto
}
