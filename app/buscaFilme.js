import { conectaApi } from "./conectaApi.js";
import { mostraFilmes } from "./mostraFilmes.js";
import { favoritos } from "./favoritaFilme.js";
import mostraFilmesFavoritos from "./checkbox.js";

const checkbox = document.getElementById("filmes-favoritos");
var query = document.getElementById("busca-query");

async function buscaFilme(query) {
    var lista = document.getElementById("cards");

    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }

    var listaApi = await conectaApi.transformaLista("buscar", query);

    const listaFavoritos = JSON.parse(favoritos.getFilmesFavoritos());

    listaApi.forEach((e) => {
        if(listaFavoritos.find(f => f.descricao === e.descricao)){
            e.favoritado = true;
        }
        lista.appendChild(mostraFilmes.criaFilme(e.imagem, e.titulo, e.avaliacao, e.ano, e.descricao, e.favoritado));
    })
    favoritos.favoritaFilme(listaApi);
}

const formulario = document.getElementById("busca-form");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    query.dataset.resultado = query.value;
    buscaFilme(query.value);

    checkbox.checked = false;
})

checkbox.addEventListener("click", () => {
    mostraFilmesFavoritos();
})

export const search = {
    buscaFilme
}