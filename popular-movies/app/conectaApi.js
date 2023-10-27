async function listaDeFilmes() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzUwZTQxYTI0NmIxZjY5NDkzYzgzMjY1ZTBlOTg2NiIsInN1YiI6IjY1MWM0ODYzZWE4NGM3MDEyZDY4ZWIzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kxmKXp1fnf2xJwHZ0vTqZo7QctFLoqYcX2dss5-D_8Q'
        }
    };

    var conexao = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1', options);
    var conexaoConvertida = await conexao.json();
    var resultadoLista = conexaoConvertida.results;

    return resultadoLista;

}

async function buscaFilmes(query) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzUwZTQxYTI0NmIxZjY5NDkzYzgzMjY1ZTBlOTg2NiIsInN1YiI6IjY1MWM0ODYzZWE4NGM3MDEyZDY4ZWIzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kxmKXp1fnf2xJwHZ0vTqZo7QctFLoqYcX2dss5-D_8Q'
        }
    };

    var busca = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`, options)
    var buscaConvertida = await busca.json();
    var resultadoBusca = buscaConvertida.results;
    return resultadoBusca;
}

async function transformaLista(funcao, parametro) {
    if (funcao == "mostrar") {
        var listaRecebida = await listaDeFilmes();
    }
    else {
        var listaRecebida = await buscaFilmes(parametro);
    }

    var anosDeLancamento = [];
    var listaFilmes = [];

    listaRecebida.forEach((e, i) => {
        anosDeLancamento.push(e.release_date.slice(0, 4));
        listaFilmes.push({
            imagem: `https://image.tmdb.org/t/p/w500/${e.poster_path}`,
            titulo: e.title,
            avaliacao: e.vote_average,
            ano: anosDeLancamento[i],
            descricao: e.overview,
            favoritado: false
        })
    })

    return listaFilmes;
}

export const conectaApi = {
    transformaLista
}