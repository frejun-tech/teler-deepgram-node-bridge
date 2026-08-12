import { WebSocket } from "ws";
import { agentConfig } from "./agentConfig";

export class DeepgramClient {
    private deepgramWs: WebSocket;

    constructor(deepgramWs: WebSocket) {
        this.deepgramWs = deepgramWs;
    }

    public waitForRemote = () => {
        const interval = setInterval(() => {
            if (this.deepgramWs.readyState === WebSocket.OPEN) {
                try {
                    this.deepgramWs.send(agentConfig);
                    clearInterval(interval);
                } catch (err) {
                    console.error('send failed:', err);
                }
            }
        }, 3000);
    }
}