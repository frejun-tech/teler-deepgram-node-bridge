import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port:                       Number(process.env.PORT) || 8000,
    nodeEnv:                    process.env.NODE_ENV || 'development',
    serverDomain:               process.env.SERVER_DOMAIN || 'your_fallback_domain',
    
    telerKey:                   process.env.TELER_API_KEY || '',
    telerSampleRate:            process.env.TELER_SAMPLE_RATE || "8k",
    telerChunkSize:             Number(process.env.TELER_CHUNK_SIZE) || 500,
    
    deepgramWsURL:              process.env.DEEPGRAM_WS_URL || 'wss://agent.deepgram.com/v1/agent/converse',
    deepgramApiKey:             process.env.DEEPGRAM_API_KEY || '',
    deepgramSampleRate:         Number(process.env.DEEPGRAM_SAMPLE_RATE) || 8000,
    deepgramBufferSize:         Number(process.env.DEEPGRAM_MESSAGE_BUFFER_SIZE) || 20,

    elevenlabsApiKey:           process.env.ELEVENLABS_API_KEY || '',
    elevenlabsVoiceId:          process.env.ELEVENLABS_VOICE_ID || ''
} as const;