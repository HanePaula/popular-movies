function favoritaFilme(lista) {
    const botaoFavorito = document.querySelectorAll("[data-favoritar]");
    var filmesFavoritos = [];
    filmesFavoritos = JSON.parse(getFilmesFavoritos());
    console.log(botaoFavorito);
    console.log(filmesFavoritos);
    botaoFavorito.forEach((e, i) => {
        e.addEventListener("click", () => {
            if(lista[i].favoritado == false){
                lista[i].favoritado = true
                e.dataset.favoritar = "sim";
                filmesFavoritos.push(lista[i]);
            }
            else{
                e.dataset.favoritar = "não";
                console.log(lista[i]);
                const indiceRemover = filmesFavoritos.findIndex((elemento) => elemento.descricao ===lista[i].descricao);
                console.log(indiceRemover);
                if (indiceRemover !== -1) {
                lista[i].favoritado = false;
                filmesFavoritos = filmesFavoritos.toSpliced(indiceRemover, 1);
                }
            }
            localStorage.clear();
            localStorage.setItem("filmesFavoritos", JSON.stringify(filmesFavoritos));
        })
    })
}

function getFilmesFavoritos() {
    const filmesFavoritos = localStorage.getItem("filmesFavoritos");
    return filmesFavoritos;
}

export const favoritos = {
    favoritaFilme,
    getFilmesFavoritos
}

