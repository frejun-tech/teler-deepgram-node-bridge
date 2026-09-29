import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { StreamConnector } from '@frejun/teler';
import { StreamType }      from '@frejun/teler';
import { callStreamHandler, remoteStreamHandler } from './streamHandlers';
import { config } from '../core/config';
import { Call } from '../models/call';

export const wss = new WebSocketServer({ noServer: true });

wss.on('connection', async (callWs: WebSocket) => {
    console.log('Teler connected to WebSocket');
    
    const wsURL = config.deepgramWsURL;
    const configuration = {
        Authorization: `Token ${config.deepgramApiKey}`
    }

    if(!wsURL) {
        callWs.close(1008, "Deepgram didn't responded with a WebSocket URL");
        return;
    }
    
    const call = new Call();

    const connector = new StreamConnector(
        wsURL,
        callStreamHandler(call),
        remoteStreamHandler(call),
        StreamType.BIDIRECTIONAL,
        configuration
    );

    await connector.bridgeStream(callWs);
});

export const handleUpgrade = (request: IncomingMessage, socket: Socket, head: Buffer) => {
    if (request.url === '/api/v1/media-stream') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws);
        });
    } else {
        socket.destroy();
    }
};