import http from 'http';
import app from './app';
import { env } from './config/environment';

const server = http.createServer(app);

server
    .listen(env.PORT)
    .on('listening', () => {
        console.log(`Server on port ${env.PORT}`)
    })
    .on('error', (error: NodeJS.ErrnoException) => {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    })