const { SerialPort } = require('serialport');
const WebSocket = require('ws');

let port;
let wss; // Variável para armazenar a instância do WebSocket Server

// Classe CircularBuffer
class CircularBuffer {
    constructor(size) {
        this.size = size;
        this.buffer = new Array(size);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    push(item) {
        this.buffer[this.head] = item;
        this.head = (this.head + 1) % this.size;
        if (this.length < this.size) {
            this.length++;
        } else {
            this.tail = (this.tail + 1) % this.size;
        }
    }

    toArray() {
        let result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(this.buffer[(this.tail + i) % this.size]);
        }
        return result;
    }
}

const bufferSize = 50;

let timeBuffer = new CircularBuffer(bufferSize);
let pressaoBuffer = new CircularBuffer(bufferSize);
let altitudeBuffer = new CircularBuffer(bufferSize);
let temperaturaBuffer = new CircularBuffer(bufferSize);
let accelXBuffer = new CircularBuffer(bufferSize);
let accelYBuffer = new CircularBuffer(bufferSize);
let accelZBuffer = new CircularBuffer(bufferSize);
let gyroXBuffer = new CircularBuffer(bufferSize);
let gyroYBuffer = new CircularBuffer(bufferSize);
let gyroZBuffer = new CircularBuffer(bufferSize);
let GPSlatBuffer = new CircularBuffer(bufferSize);
let GPSlngBuffer = new CircularBuffer(bufferSize);
let GPSdateBuffer = new CircularBuffer(bufferSize);
let GPStimeBuffer = new CircularBuffer(bufferSize);
let GPSspeedBuffer = new CircularBuffer(bufferSize);
let GPSsatellitesBuffer = new CircularBuffer(bufferSize);

function processarDados(data) {
    const dataString = data.toString('utf8').trim();
    console.log('Dados recebidos:', dataString);

    const linhas = dataString.split('\n');
    linhas.forEach(linha => {
        const dataParts = linha.split(',');

        if (dataParts[0] === 'MPU6050' && dataParts.length === 8) {
            const [_, temp, ax, ay, az, gx, gy, gz] = dataParts.map(parseFloat);
            // Adiciona os dados aos buffers
            accelXBuffer.push(ax);
            accelYBuffer.push(ay);
            accelZBuffer.push(az);
            gyroXBuffer.push(gx);
            gyroYBuffer.push(gy);
            gyroZBuffer.push(gz);
        } else if (dataParts[0] === 'GPS' && dataParts.length === 7) {
            const [_, lat, lng, date, time, speed, satellites] = dataParts;
            // Adiciona os dados aos buffers
            GPSlatBuffer.push(parseFloat(lat));
            GPSlngBuffer.push(parseFloat(lng));
            GPSdateBuffer.push(date);
            GPStimeBuffer.push(time);
            GPSspeedBuffer.push(parseFloat(speed));
            GPSsatellitesBuffer.push(parseInt(satellites, 10));
        } else if (dataParts[0] === 'BMP280' && dataParts.length === 4) {
            const [_, temp, pressao, altitude] = dataParts.map(parseFloat);
            // Adiciona os dados aos buffers
            temperaturaBuffer.push(temp);
            pressaoBuffer.push(pressao);
            altitudeBuffer.push(altitude);
        }
    });

    // Adiciona o tempo atual ao buffer de tempo
    timeBuffer.push(Date.now());

    // Envia os dados processados via WebSocket
    if (wss && wss.clients) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'data',
                    value: {
                        time: timeBuffer.toArray(),
                        pressao: pressaoBuffer.toArray(),
                        altitude: altitudeBuffer.toArray(),
                        temperatura: temperaturaBuffer.toArray(),
                        accelX: accelXBuffer.toArray(),
                        accelY: accelYBuffer.toArray(),
                        accelZ: accelZBuffer.toArray(),
                        gyroX: gyroXBuffer.toArray(),
                        gyroY: gyroYBuffer.toArray(),
                        gyroZ: gyroZBuffer.toArray(),
                        GPSlat: GPSlatBuffer.toArray(),
                        GPSlng: GPSlngBuffer.toArray(),
                        GPSdate: GPSdateBuffer.toArray(),
                        GPStime: GPStimeBuffer.toArray(),
                        GPSspeed: GPSspeedBuffer.toArray(),
                        GPSsatellites: GPSsatellitesBuffer.toArray()
                    }
                }));
            }
        });
    } else {
        console.error('WebSocket Server não está disponível.');
    }

    console.log("Dados processados e enviados.");
}

function iniciarPortaSerial(WebSocketServer) {
    console.log('Iniciando porta serial...');
    wss = WebSocketServer;
    port = new SerialPort({ baudRate: 115200, path: '/dev/ttyUSB0' });

    port.on('data', processarDados);

    port.on('error', function (error) {
        console.error('Erro na porta serial:', error.message);
        console.log('Certifique-se de que o dispositivo está conectado e funcional.');
    });

    console.log('Porta serial iniciada com sucesso.');
}

module.exports = iniciarPortaSerial;
