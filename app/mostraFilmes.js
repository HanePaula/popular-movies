import { conectaApi } from "./conectaApi.js";
import { favoritos } from "./favoritaFilme.js";

var lista = document.getElementById("cards");

function criaFilme(imagem, titulo, avaliacao, ano, descricao, favoritado) {
    const filme = document.createElement("div");
    filme.className = "cards-card";
    if (favoritado == false) {
        filme.innerHTML = `<div class="circular">
        <img src="${imagem}" class="cards-imagem">
        </div>
        <div class="cards-info">
            <a href="#" class="cards-titulo">${titulo} (${ano})</a>
            <ul class="cards-avaliacao">
                <li class="avaliacao-item">
                    <img src="assets/estrelinha.svg" class="avaliacao-estrela">
                    <p class="avaliacao-texto">${avaliacao.toFixed(1)}</p>
                </li>
                <li class="avaliacao-item">
                    <span class="avaliacao-coracao" data-favoritar="não"></span>
                    <p class="avaliacao-texto">Favoritar</p>
                </li>
            </ul>
        </div>
        <p class="card-descricao">${descricao}</p>`
    }
    else {
        filme.innerHTML = `<div class="circular">
        <img src="${imagem}" class="cards-imagem">
        </div>
        <div class="cards-info">
            <a href="#" class="cards-titulo">${titulo} (${ano})</a>
            <ul class="cards-avaliacao">
                <li class="avaliacao-item">
                    <img src="assets/estrelinha.svg" class="avaliacao-estrela">
                    <p class="avaliacao-texto">${avaliacao.toFixed(1)}</p>
                </li>
                <li class="avaliacao-item">
                    <span class="avaliacao-coracao" data-favoritar="sim"></span>
                    <p class="avaliacao-texto">Favoritar</p>
                </li>
            </ul>
        </div>
        <p class="card-descricao">${descricao}</p>`
    }
    return filme;
}

async function listaDeFilmes() {
    const listaApi = await conectaApi.transformaLista("mostrar");
    const listaFavoritos = JSON.parse(favoritos.getFilmesFavoritos());

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    try {
        listaApi.forEach((e) => {
            if (listaFavoritos.find(f => f.descricao === e.descricao && f.titulo === e.titulo)) {
                e.favoritado = true;
            }
            lista.appendChild(criaFilme(e.imagem, e.titulo, e.avaliacao, e.ano, e.descricao, e.favoritado));
        })
        favoritos.favoritaFilme(listaApi);
    }

    catch (erro) {
        console.log(erro.message);
        listaApi.forEach((e) => {
            lista.appendChild(criaFilme(e.imagem, e.titulo, e.avaliacao, e.ano, e.descricao, e.favoritado));
        })
        favoritos.favoritaFilme(listaApi);
    }
}

listaDeFilmes();

const botaoHome = document.getElementById("home");

botaoHome.addEventListener("click", () => location.reload());

export const mostraFilmes = {
    criaFilme,
    listaDeFilmes
}
