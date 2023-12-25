import { AudioSrc } from "../../cfg/AudioCfg";
import { AssetMgr } from "../asset/AssetMgr";
import { Singleton } from "../util/Singleton";

/**
 * 音效
 */
export class SfxAudio extends Singleton {
    // 音量
    public get vol(): number { return cc.audioEngine.getEffectsVolume(); }
    public set vol(value) { cc.audioEngine.setEffectsVolume(value.limit(0, 1)); }

    /**
     * 
     */
    protected onDestroy(): void {}

    /**
     * 撥放
     * @param audio 
     * @param done 播畢
     */
    public async play(audio: cc.AudioClip | AudioSrc, done?: Function): Promise<number> {
        let src = audio instanceof cc.AudioClip ? audio : await AssetMgr.inst().loadAsset(audio, cc.AudioClip, true);
        let id = cc.audioEngine.playEffect(src, false);

        if (done) {
            cc.audioEngine.setFinishCallback(id, done);
        }

        return id;
    }

    /**
     * 停止
     * @param id 
     */
    public stop(id: number): void {
        cc.audioEngine.stopEffect(id);
    }

    /**
     * 停止 
     */
    public stopAll(): void {
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 暫停
     * @param id 
     */
    public pause(id: number): void {
        cc.audioEngine.pauseEffect(id);
    }

    /**
     * 暫停 
     */
    public pauseAll(): void {
        cc.audioEngine.pauseAllEffects();
    }

    /**
     * 續播
     * @param id 
     */
    public resume(id: number): void {
        cc.audioEngine.resumeEffect(id);
    }

    /**
     * 續播
     * @param id 
     */
    public resumeAll(): void {
        cc.audioEngine.resumeAllEffects();
    }
}