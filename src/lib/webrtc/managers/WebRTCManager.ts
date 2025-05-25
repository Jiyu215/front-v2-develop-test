type WebRTCManagerProps = {
  name: string;
  wsSend: (msg: any) => void;
};

export default class WebRTCManager {
  private name: string;
  private wsSend: (msg: any) => void;
  private rtcPeer: any = null;

  constructor({ name, wsSend }: WebRTCManagerProps) {
    this.name = name;
    this.wsSend = wsSend;
  }

  async createOffer(videoElement: HTMLVideoElement) {
    const options = {
      localVideo: videoElement,
      mediaConstraints: {
        audio: true,
        video: { width: 640, height: 480 }
      },
      onicecandidate: (candidate: any) => {
        this.wsSend({
          id: 'onIceCandidate',
          candidate,
        });
      },
    };

    this.rtcPeer = new (window as any).kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
      options,
      async (err: any) => {
        if (err) {
          console.error('[WebRTC] createOffer error', err);
          return;
        }
        const sdpOffer = await this.rtcPeer.generateOffer();
        this.wsSend({
          id: 'receiveVideoFrom',
          sender: this.name,
          sdpOffer,
        });
      }
    );
  }

  async createAnswer(videoElement: HTMLVideoElement, sender: string) {
    const options = {
      remoteVideo: videoElement,
      onicecandidate: (candidate: any) => {
        this.wsSend({
          id: 'onIceCandidate',
          candidate,
          name: sender,
        });
      },
    };

    this.rtcPeer = new (window as any).kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      async (err: any) => {
        if (err) {
          console.error('[WebRTC] createAnswer error', err);
          return;
        }
        const sdpOffer = await this.rtcPeer.generateOffer();
        this.wsSend({
          id: 'receiveVideoFrom',
          sender,
          sdpOffer,
        });
      }
    );
  }

  async processAnswer(sdpAnswer: string) {
    if (this.rtcPeer) {
      await this.rtcPeer.processAnswer(sdpAnswer);
    }
  }

  addIceCandidate(candidate: any) {
    if (this.rtcPeer) {
      this.rtcPeer.addIceCandidate(candidate);
    }
  }

  dispose() {
    if (this.rtcPeer) {
      this.rtcPeer.dispose();
      this.rtcPeer = null;
    }
  }
}