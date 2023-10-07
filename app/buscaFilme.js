import { conectaApi } from "./conectaApi.js";
import { mostraFilmes } from "./mostraFilmes.js";
import { favoritos } from "./favoritaFilme.js";
import mostraFilmesFavoritos from "./checkbox.js";

const checkbox = document.getElementById("filmes-favoritos");
var query = document.getElementById("busca-query");

async function buscaFilme(query) {
    var lista = document.getElementById("cards");

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    var listaApi = await conectaApi.transformaLista("buscar", query);

    const listaFavoritos = JSON.parse(favoritos.getFilmesFavoritos());

    try {
        if (listaFavoritos === null) {
            listaApi.forEach((filme) => {
                lista.appendChild(mostraFilmes.criaFilme(filme.imagem, filme.titulo, filme.avaliacao,
                    filme.ano, filme.descricao, filme.favoritado));
            })
            favoritos.favoritaFilme(listaApi);
        }

        else {
            listaApi.forEach((filme) => {
                if (listaFavoritos.find(favorito => favorito.descricao === filme.descricao)) {
                    filme.favoritado = true;
                }
                lista.appendChild(mostraFilmes.criaFilme(filme.imagem, filme.titulo, filme.avaliacao, filme.ano, filme.descricao, filme.favoritado));
            })
            favoritos.favoritaFilme(listaApi);
        }
    } catch (erro) {
        console.log(erro.message);
    }
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