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
        "speak": [
            {
                "provider": {
                    "type": "eleven_labs",
                    "model_id": "eleven_turbo_v2_5",
                    "language_code": "hi"
                },
                "endpoint": {
                    "url": `wss://api.elevenlabs.io/v1/text-to-speech/${config.elevenlabsVoiceId}/multi-stream-input`,
                    "headers": {
                        "xi-api-key": config.elevenlabsApiKey
                    }
                }
            },
            {
                "provider": {
                "type": "deepgram",
                "model": "aura-2-asteria-en"
                }
            }
        ],
        "listen": {
            "provider": {
                "type": "deepgram",
                "model": "flux-general-multi",
                "version": "v2",
                "eot_threshold": 0.8,
                "eager_eot_threshold": 0.5,
                "language_hints": ["en", "hi"]
            }
        },
        "think": {
            "provider": {
                "type": "open_ai",
                "model": "gpt-4o",
                "temperature": 0.7
            },
            "prompt": "#Role\nYou are a general-purpose virtual assistant speaking to users over the phone. Speak to the user in Hindi."
        },
        "greeting": "Hello! How may I help you?"
    }
});