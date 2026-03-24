import { Router } from "express";
import { Request, Response } from "express";
import { getServerDomain } from "../utils/ngrokUtils";
import { config } from "../core/config";

export const systemRouter = Router();

systemRouter.get('/', async (_req: Request, res: Response) => {
    const currentNgrokURL = await getServerDomain();
    res.json({
        "message": "Teler Deepgram Node Bridge is running", 
        "status": "healthy",
        "server_domain": currentNgrokURL
    });
});

systemRouter.get('/health', (_req: Request, res: Response) => {
    res.json({
        "status": "healthy", 
        "service": "teler-deepgram-node-bridge"}
    )
});

systemRouter.get('/ngrok-status', async (_req: Request, res: Response) => {
    const currentNgrokURL = await getServerDomain();
    res.json({
        "ngrok_running": currentNgrokURL ?? false,
        "current_ngrok_url": currentNgrokURL ? `https://${currentNgrokURL}` : false,
        "fallback_domain": config.serverDomain
    })
});