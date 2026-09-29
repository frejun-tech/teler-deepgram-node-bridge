export class Call {
    callId?: string;
    isAgentConfigSent: boolean;
    isSettingsApplied: boolean;
    isWelcomed: boolean;

    constructor() {
        this.isAgentConfigSent = false;
        this.isSettingsApplied = false;
        this.isWelcomed = false;
    }
}