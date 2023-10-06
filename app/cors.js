// Importar o módulo 'http' (ou 'https' se estiver usando HTTPS)
const http = require('https');

// Configurar as regras de CORS
const server = http.createServer((req, res) => {
  // Configurar os cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://popular-movies-seven.vercel.app/'); // Defina o domínio da Vercel aqui
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Resto do código do servidor e tratamento de solicitações
});

// Iniciar o servidor
server.listen(3000, () => {
  console.log('Servidor está escutando na porta 3000');
});