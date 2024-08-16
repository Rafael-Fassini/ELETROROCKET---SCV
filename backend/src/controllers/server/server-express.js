const app = require('./config-express.js');
const appWs = require('../app-ws.js');
const iniciarPortaSerial = require('../serial-port.js'); // Atualize o caminho se necessário

// Inicia o servidor Express primeiro
const server = app.listen(3000, (err) => {
    if (err) {
        console.error('Erro ao iniciar o servidor Express:', err);
        process.exit(1);  // Finaliza o processo em caso de erro
    } else {
        console.log('App Express is running!');
        
        // Inicia o WebSocket Server somente se o servidor Express iniciou corretamente
        const wss = appWs(server);
        
        // Inicia a porta serial após o servidor e WebSocket estarem prontos
        iniciarPortaSerial(wss); // Passa a instância do WebSocket Server

        // Manipulador para finalizar corretamente os servidores
        process.on('SIGINT', () => {
            console.log('Encerrando o servidor...');

            if (wss) {
                wss.close(() => {
                    console.log('Servidor WebSocket encerrado.');
                });
            }

            server.close(() => {
                console.log('Servidor Express encerrado.');
                process.exit(0);
            });
        });
    }
});
