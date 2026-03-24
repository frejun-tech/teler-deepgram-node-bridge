import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { StreamConnector } from '@frejun/teler';
import { StreamType }      from '@frejun/teler';
import { callStreamHandler, remoteStreamHandler } from './streamHandlers';
import { config } from '../core/config';

export const wss = new WebSocketServer({ noServer: true });

wss.on('connection', async (callWs: WebSocket) => {
    console.log('Teler connected to WebSocket');
    
    const wsURL = 'wss://agent.deepgram.com/v1/agent/converse';
    const configuration = {
        Authorization: `Token ${config.deepgramApiKey}`
    }

    if(!wsURL) {
        callWs.close(1008, "Deepgram didn't responded with a WebSocket URL");
        return;
    }
    
    const connector = new StreamConnector(
        wsURL,
        StreamType.BIDIRECTIONAL,
        callStreamHandler,
        remoteStreamHandler(),
        configuration
    );

    const remoteWs = await connector.bridgeStream(callWs);

    const agentConfig = JSON.stringify({
        "type": "Settings",
        "audio": {
            "input": {
            "encoding": "linear16",
            "sample_rate": 8000
            },
            "output": {
            "encoding": "linear16",
            "sample_rate": 8000,
            "container": "none"
            }
        },
        "agent": {
            "language": "en",
            "speak": { "provider": { "type": "deepgram", "model": "aura-2-asteria-en" }},
            "listen": { "provider": { "type": "deepgram", "model": "flux-general-en", "version": "v2", "keyterms": ["weather", "forecast"], "eot_threshold": 0.8, "eager_eot_threshold": 0.5 }},
            "think": { 
                "provider": { "type": "open_ai", "model": "gpt-4o", "temperature": 0.7 },
                "prompt": "#Role\nYou are a general-purpose virtual assistant speaking to users over the phone..."
            },
            "greeting": "Hello! How may I help you?"
        }
    });

    function safeSend() {
        if (remoteWs.readyState === WebSocket.OPEN) {
            try {
                remoteWs.send(agentConfig);
                clearInterval(interval);
            } catch (err) {
                console.error('send failed:', err);
            }
        }
    }

    const interval = setInterval(safeSend, 3000);
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