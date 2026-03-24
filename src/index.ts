import http from 'http';
import { createApp } from './app';
import { config } from './core/config';
import { handleUpgrade } from './utils/wsServer';
import { getServerDomain } from './utils/ngrokUtils';

const initServer = async () => {
    const app    = createApp();
    const server = http.createServer(app);

    server.on('upgrade', handleUpgrade);

    process.on('SIGTERM', () => server.close(() => process.exit(0)));
    process.on('SIGINT',  () => server.close(() => process.exit(0)));

    server.listen(config.port, '0.0.0.0', () => {
        console.log(`[${config.nodeEnv}] Server running on port ${config.port}`);

        setTimeout(async () => {
            const domain = await getServerDomain();
            process.env.SERVER_DOMAIN = domain;
            console.log(`[domain] ${domain || 'unknown'}`);
        }, 3000);
    });
};

initServer();