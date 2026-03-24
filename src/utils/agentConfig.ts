import { config } from "../core/config";

export const agentConfig = JSON.stringify({
    "type": "Settings",
    "audio": {
        "input": {
        "encoding": "linear16",
        "sample_rate": config.deepgramSampleRate
        },
        "output": {
        "encoding": "linear16",
        "sample_rate": config.deepgramSampleRate,
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