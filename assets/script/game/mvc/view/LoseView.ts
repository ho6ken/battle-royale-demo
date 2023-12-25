import { AudioSrc } from "../../../cfg/AudioCfg";
import { AssetMgr } from "../../../comm/asset/AssetMgr";
import { SfxAudio } from "../../../comm/audio/SfxAudio";
import { WaitUtil } from "../../../comm/util/WaitUtil";

const { ccclass, property } = cc._decorator;

/**
 * 失敗
 */
@ccclass
export class LoseView extends cc.Component {
    /**
     * 
     */
    protected onLoad(): void {
        this.node.active = false; 
        this.node.x = 0;
    }

    /**
     * 播放
     */
    public async play(): Promise<void> {
        SfxAudio.inst().play(await AssetMgr.inst().loadAsset(AudioSrc.Lose, cc.AudioClip, true));

        this.node.active = true;
        await WaitUtil.waitSec(2.5);
    }
}