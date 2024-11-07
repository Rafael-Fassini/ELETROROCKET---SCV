const app = require('./config-express.js');
const appWs = require('../app-ws.js');
const iniciarPortaSerial = require('../serial-port.js'); // Atualize o caminho se necessário

// Inicia o servidor Express primeiro
const server = app.listen(3010, (err) => {
    if (err) {
        console.error('Erro ao iniciar o servidor Express:', err);
        process.exit(1);  // Finaliza o processo em caso de erro
    } else {
        console.log('App Express is running!');
        
        const wss = appWs(server);
        
        iniciarPortaSerial(wss); 
       
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
