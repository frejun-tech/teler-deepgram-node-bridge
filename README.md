# Teler-Deepgram-Node-Bridge

A reference integration between Teler and DEEPGRAM in Node, based on [Media Streaming Bridge](https://frejun.ai/docs/category/media-streaming/) over WebSockets.


## Setup

1. **Clone and configure:**

   ```bash
   git clone https://github.com/frejun-tech/teler-deepgram-node-bridge.git
   cd teler-deepgram-node-bridge
   cp .env.example .env
   # Edit .env with your actual values
   ```

2. **Run with Docker:**
   ```bash
   docker compose up -d --build
   ```

## Environment Variables

| Variable                   | Description                   | Default  |
| -------------------------- | ----------------------------- | -------- |
| `DEEPGRAM_WS_URL`        | DEEPGRAM Web Socket URL        | Required |
| `DEEPGRAM_API_KEY`             | Your DEEPGRAM API key             | Required |
| `DEEPGRAM_SAMPLE_RATE`         | Audio sample rate of DEEPGRAM     | 8000     |
| `DEEPGRAM_MESSAGE_BUFFER_SIZE` | Messages to buffer before relay| 50      |
| `TELER_API_KEY`            | Your Teler API key            | Required |
| `TELER_SAMPLE_RATE`        | Audio sample rate of Teler    | 8k       |
| `TELER_CHUNK_SIZE`        | Chunk size of Teler audio      | 500      |
| `NGROK_AUTHTOKEN`          | Your ngrok auth token         | Required |

## API Endpoints

- `GET /` - Health check with server domain
- `GET /health` - Service status
- `GET /ngrok-status` - Current ngrok status and URL
- `POST /api/v1/calls/initiate-call` - Start a new call with dynamic phone numbers
- `POST /api/v1/calls/flow` - Get call flow configuration
- `WebSocket /api/v1/calls/media-stream` - Audio streaming
- `POST /api/v1/webhooks/receiver` - Teler webhook receiver

### Call Initiation Example

```bash
curl -X POST "https://your_ngrok_domain/api/v1/calls/initiate-call" \
  -H "Content-Type: application/json" \
  -d '{
    "from_number": "+918064xxx",
    "to_number": "+919967xxx"
  }'
```

## Features

- **Bi-directional media streaming** - Bridges audio between Teler and Deepgram (Voice API) over WebSockets.
- **Real-time audio handling** - Receives live audio chunks from Teler, processes them, and forwards to Deepgram; streams responses back to Teler.
- **Dockerized setup** - Comes with Dockerfile and docker-compose.yaml for easy local development and deployment.
- **Dynamic ngrok URL detection** - Automatically detects current ngrok domain
