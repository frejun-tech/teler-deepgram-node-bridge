import axios from 'axios';

interface NgrokTunnel {
    proto: string;
    public_url: string;
}

interface NgrokResponse {
    tunnels: NgrokTunnel[];
}

const NGROK_API = process.env.NODE_ENV === 'production'
    ? 'http://ngrok:4040/api/tunnels'
    : 'http://localhost:4040/api/tunnels';

export const getCurrentNgrokUrl = async (): Promise<string | null> => {
    try {
        const response = await axios.get<NgrokResponse>(NGROK_API, {
            timeout: 5000,
        });

        const tunnels = response.data.tunnels ?? [];
        for (const tunnel of tunnels) {
            if (tunnel.proto === 'https' && tunnel.public_url) {
                const domain = tunnel.public_url.replace('https://', '');
                console.log(`Detected ngrok URL: ${tunnel.public_url}`);
                return domain;
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.warn(`Could not connect to ngrok API: ${error.message}`);
        } else {
            console.error(`Error fetching ngrok URL: ${error}`);
        }
    }

    return null;
};

export const getServerDomain = async (): Promise<string> => {
    const ngrokUrl = await getCurrentNgrokUrl();
    if (ngrokUrl) return ngrokUrl;

    const fallback = process.env.SERVER_DOMAIN ?? '';
    if (fallback) {
        console.log(`Using fallback SERVER_DOMAIN: ${fallback}`);
        return fallback;
    }

    console.warn('No SERVER_DOMAIN available - ngrok may not be running');
    return '';
};