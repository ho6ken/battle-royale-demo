import { AudioSrc } from "../../../cfg/AudioCfg";
import { EventSrc } from "../../../cfg/EventCfg";
import { AssetMgr } from "../../../comm/asset/AssetMgr";
import { BgmAudio } from "../../../comm/audio/BgmAudio";
import { SfxAudio } from "../../../comm/audio/SfxAudio";
import { onEnable, onEvent } from "../../../comm/event/EventDecor";
import { EventMgr } from "../../../comm/event/EventMgr";
import { START_STAGE, StageData } from "../../../define/GameDefine";
import { TileType } from "../../../define/TileDefine";
import { StageModel } from "../model/StageModel";
import { StageView } from "../view/StageView";
import { GridCtrl } from "./GridCtrl";

const { ccclass, property } = cc._decorator;

/**
 * 關卡控制
 */
@ccclass
@onEnable()
export class StageCtrl extends cc.Component {
    // 單例
    private static _inst: StageCtrl = null;
    public static get inst(): StageCtrl { return this._inst; }

    // 數據
    private _model: StageModel = null;

    // 顯示
    protected _view: StageView = null;

    // 關卡資料
    public get data(): StageData { return this._model.data; }

    /**
     * 
     */
    protected onLoad(): void {
        StageCtrl._inst = this; 
    }

    /**
     * 
     */
    protected onEnable(): void {
        this._model = new StageModel(); 

        this._view = this.getComponentInChildren(StageView);
        this._view.init(this._model);
    }

    /**
     * 
     */
    protected start(): void {
        this._model.setLv(START_STAGE);
        this.fight();
    }

    /**
     * 
     */
    protected onDestroy(): void {
        this._model = null;
    }

    /**
     * 消除方塊
     * @param type 
     * @param num 
     */
    @onEvent(EventSrc.Crushed)
    private crushed(type: TileType, num: number): void {
        this._model.decRule(type, num) && this.win();
        this._view.decRule(type, num);
    }

    /**
     * 直接獲勝
     */
    @onEvent(EventSrc.DebugWin)
    private async win(): Promise<void> {
        this._model.directWin();

        await this._view.playWin();

        this._model.incLv();

        await this.fight();
    }

    /**
     * 開打
     */
    private async fight(): Promise<void> {
        AssetMgr.inst().loadAsset(AudioSrc.Begin, cc.AudioClip, true).then(audio => {
            BgmAudio.inst().pause();
            SfxAudio.inst().play(audio, () => BgmAudio.inst().resume());
        });

        GridCtrl.inst.fight();
    }

    /**
     * 失敗
     */
    @onEvent(EventSrc.Lose)
    private lose(): void {
        this._view.playLose();
    }
}
