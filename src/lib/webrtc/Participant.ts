type SendMessageFunc = (message: any) => void;

export default class Participant {
    sessionId: string;
    username: string;
    videoOn: boolean;
    audioOn: boolean;
    rtcPeer: any;
    sendMessage: SendMessageFunc;

    constructor(
        sessionId: string,
        username: string,
        sendMessage: SendMessageFunc,
        videoOn: boolean,
        audioOn: boolean
    ) 

    {
        this.sessionId = sessionId;
        this.username = username;
        this.sendMessage = sendMessage;
        this.videoOn = this.convertToBoolean(videoOn);
        this.audioOn = this.convertToBoolean(audioOn);
        this.rtcPeer = null; // 나중에 WebRtcPeer 인스턴스 설정
    }

    private convertToBoolean(value: string | boolean): boolean {
        return typeof value === 'string' ? value.toLowerCase() == 'true' : !!value;
    }

    offerToReceiveVideo = (error: any, offerSdp: any, wp: any) => {
        if (error) {
            console.error('SDP offer error:', error);
            return;
        }

        const message = {
            eventId: 'receiveVideoAnswer',
            sessionId: this.sessionId,
            sdpOffer: offerSdp,
        };

        this.sendMessage(message);
    };

    onIceCandidate = (candidate: any, wp: any) => {
        const message = {
            eventId: 'onIceCandidate',
            sessionId: this.sessionId,
            candidate,
        };

        this.sendMessage(message);
    };

    dispose = () => {
        if (this.rtcPeer) {
            this.rtcPeer.dispose();
            this.rtcPeer = null;
        }
    };
}