import { AudioSrc } from "../cfg/AudioCfg";
import { AssetMgr } from "../comm/asset/AssetMgr";
import { BgmAudio } from "../comm/audio/BgmAudio";
import { SfxAudio } from "../comm/audio/SfxAudio";
import { EventMgr } from "../comm/event/EventMgr";
import { CmptPool } from "../comm/pool/CmptPool";

const { ccclass, property } = cc._decorator;

/**
 * 遊戲管理
 */
@ccclass
export class GameMgr extends cc.Component {
    /**
     * 
     */
    protected onLoad(): void {
        // 更新率
        cc.game.setFrameRate(60);

        // 除錯資訊
        cc.debug.setDisplayStats(true);

        // 動態合圖
        cc.dynamicAtlasManager.enabled = true;

        // 顯示動態合圖內容
        // let node = cc.dynamicAtlasManager.showDebug(true);
        // node.parent = this.node;
        // node.setPosition(cc.Vec2.ZERO);

        // 碰撞
        let mgr = cc.director.getCollisionManager();
        mgr.enabled = true;
        mgr.enabledDebugDraw = false;
    }

    /**
     * 
     */
    protected onDestroy(): void {
        SfxAudio.destroy();
        BgmAudio.destroy();
        EventMgr.destroy();
        CmptPool.destroy();
        AssetMgr.destroy();
    }

    /**
     * 
     */
    protected start(): void {
        // 背景音樂
        AssetMgr.inst().loadAsset(AudioSrc.LoopBgm, cc.AudioClip, true).then(audio => {
            BgmAudio.inst().play(audio);
        });
    }
}
