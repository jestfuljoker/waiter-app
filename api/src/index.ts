import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { Server } from 'socket.io';

import { router } from './router';

const PORT = 3001;
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

io.on('connection', () => {
	console.log('🚀 Client connected');
});

app.use((_, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', '*');
	response.setHeader('Access-Control-Allow-Headers', '*');

	next();
});
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.json());

app.use(router);

server.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
