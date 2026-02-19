const tls = require('tls');
const fs = require('fs');

const options = {
    host: 'google.com',
    port: 443,
    // rejectUnauthorized: false // Try with and without this
};

console.log(`Attempting TLS connection to ${options.host}:${options.port}...`);

const socket = tls.connect(options, () => {
    console.log('client connected',
        socket.authorized ? 'authorized' : 'unauthorized');
    process.exit(0);
});

socket.on('error', (err) => {
    console.error("TLS Connection Error:", err);
    process.exit(1);
});

socket.on('end', () => {
    console.log('client disconnected');
});

socket.setEncoding('utf8');
