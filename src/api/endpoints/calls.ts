import { Router, Request, Response } from 'express';
import { config } from '../../core/config';
import { Client} from "@frejun/teler";

export const callRouter = Router();

export const getFlowUrl             = () => `https://${process.env.SERVER_DOMAIN}/api/v1/calls/flow`;
export const getStatusCallbackUrl   = () => `https://${process.env.SERVER_DOMAIN}/api/v1/webhooks/receiver`;
export const getMediaStreamURL      = () => `wss://${process.env.SERVER_DOMAIN}/api/v1/media-stream`;

callRouter.post('/initiate-call', async (req: Request, res: Response) => {
    try {
        const { fromNumber, toNumber, record } = req.body;

        const client            = new Client(config.telerKey);
        const flowUrl           = getFlowUrl();
        const statusCallbackUrl = getStatusCallbackUrl();

        const call = await client.calls.create({
            from_number: fromNumber,
            to_number: toNumber,
            flow_url: flowUrl,
            status_callback_url: statusCallbackUrl,
            record: record ?? true
        });

        console.log(`Call created successfully: ${JSON.stringify(call)}`);
        res.status(200).json({ message: 'Call initiated', call: call });
    } catch (error) {
        res.status(500).json({ message: 'Failed to initiate call', error: error});
    }
});

callRouter.post('/flow', (_req: Request, res: Response) => {
    const mediaStreamURL = getMediaStreamURL();

    res.json({
        action:      'stream',
        ws_url:      mediaStreamURL,
        sample_rate: config.telerSampleRate,
        chunk_size:  500,
        record:      false,
    });
});
