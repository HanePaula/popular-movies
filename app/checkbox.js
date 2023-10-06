import { favoritos } from "./favoritaFilme.js";
import { mostraFilmes } from "./mostraFilmes.js";
import { search } from "./buscaFilme.js";

export default function mostraFilmesFavoritos() {
    const checkbox = document.getElementById("filmes-favoritos");
    const listaFavoritos = JSON.parse(favoritos.getFilmesFavoritos());
    var lista = document.getElementById("cards");
    const searchbar = document.getElementById("busca-query");
    const buscaResultado = searchbar.dataset.resultado;

    if (checkbox.checked === true) {
        while(lista.firstChild){
            lista.removeChild(lista.firstChild);
        }

        listaFavoritos.forEach((favoritos) => {
            lista.appendChild(mostraFilmes.criaFilme(favoritos.imagem, favoritos.titulo, favoritos.avaliacao, favoritos.ano, favoritos.descricao, favoritos.favoritado));
        })

        favoritos.favoritaFilme(listaFavoritos);
    }

    else if (buscaResultado !== undefined) {
        search.buscaFilme(buscaResultado);
    }

    else {
        mostraFilmes.listaDeFilmes();
    }
    
}