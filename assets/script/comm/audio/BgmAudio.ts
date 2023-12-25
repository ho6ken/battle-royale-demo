import { AudioSrc } from "../../cfg/AudioCfg";
import { AssetMgr } from "../asset/AssetMgr";
import { Singleton } from "../util/Singleton";

/**
 * 音樂
 */
export class BgmAudio extends Singleton {
    // 音量
    public get vol(): number { return cc.audioEngine.getMusicVolume(); }
    public set vol(value) { cc.audioEngine.setMusicVolume(value.limit(0, 1)); }

    /**
     * 
     */
    protected onDestroy(): void {}

    /**
     * 撥放
     * @param audio 
     */
    public async play(audio: cc.AudioClip | AudioSrc): Promise<void> {
        let src = audio instanceof cc.AudioClip ? audio : await AssetMgr.inst().loadAsset(audio, cc.AudioClip, true);
        cc.audioEngine.playMusic(src, true);
    }

    /**
     * 停止
     */
    public stop(): void {
        cc.audioEngine.stopMusic();
    }

    /**
     * 暫停
     */
    public pause(): void {
        cc.audioEngine.pauseMusic();
    }

    /**
     * 續播
     */
    public resume(): void {
        cc.audioEngine.resumeMusic();
    }
}