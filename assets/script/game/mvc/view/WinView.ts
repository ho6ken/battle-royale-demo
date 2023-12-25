import { AudioSrc } from "../../../cfg/AudioCfg";
import { AssetMgr } from "../../../comm/asset/AssetMgr";
import { BgmAudio } from "../../../comm/audio/BgmAudio";
import { SfxAudio } from "../../../comm/audio/SfxAudio";
import { Spine } from "../../../comm/cmpt/Spine";
import { WaitUtil } from "../../../comm/util/WaitUtil";

const { ccclass, property } = cc._decorator;

/**
 * 獲勝
 */
@ccclass
export class WinView extends cc.Component {
    // 獲勝
    @property(Spine)
    private win: Spine = null;

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
        this.node.active = true;

        AssetMgr.inst().loadAsset(AudioSrc.Win, cc.AudioClip, true).then(audio => {
            BgmAudio.inst().pause();
            SfxAudio.inst().play(audio, () => BgmAudio.inst().resume());
        });

        await this.win.playOnce("LegendWin");
        this.win.playLoop("LegendWinLoop");

        await WaitUtil.waitSec(2.5);
        this.node.active = false;
    }
}
