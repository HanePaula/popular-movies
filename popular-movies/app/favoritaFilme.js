function favoritaFilme(lista) {
    const botaoFavorito = document.querySelectorAll("[data-favoritar]");
    var filmesFavoritos = JSON.parse(getFilmesFavoritos());
    try {
        if (filmesFavoritos === null) {
            filmesFavoritos = [];
        }

        else {

        }
        botaoFavorito.forEach((botao, indice) => {
            botao.addEventListener("click", () => {
                if (lista[indice].favoritado == false) {
                    lista[indice].favoritado = true
                    botao.dataset.favoritar = "sim";
                    filmesFavoritos.push(lista[indice]);
                }
                else {
                    botao.dataset.favoritar = "não";
                    console.log(lista[indice]);
                    const indiceRemover = filmesFavoritos.findIndex((favorito) => favorito.descricao === lista[indice].descricao);
                    console.log(indiceRemover);
                    if (indiceRemover !== -1) {
                        lista[indice].favoritado = false;
                        filmesFavoritos = filmesFavoritos.toSpliced(indiceRemover, 1);
                    }
                }
                localStorage.clear();
                localStorage.setItem("filmesFavoritos", JSON.stringify(filmesFavoritos));
            })
        })

    } catch (erro) {
        console.log(erro.message);
    }
}

function getFilmesFavoritos() {
    const filmesFavoritos = localStorage.getItem("filmesFavoritos");
    return filmesFavoritos;
}

export const favoritos = {
    favoritaFilme,
    getFilmesFavoritos
}

