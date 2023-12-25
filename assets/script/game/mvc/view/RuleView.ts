import { AudioSrc } from "../../../cfg/AudioCfg";
import { TextureSrc } from "../../../cfg/TextureCfg";
import { AssetMgr } from "../../../comm/asset/AssetMgr";
import { SfxAudio } from "../../../comm/audio/SfxAudio";
import { TileType } from "../../../define/TileDefine";

const { ccclass, property } = cc._decorator;

/**
 * 通關條件
 * @summary 單一條件
 */
@ccclass
export class RuleView extends cc.Component {
    // 棋種
    @property(cc.Sprite)
    private type: cc.Sprite = null;

    // 剩餘數量
    @property(cc.Label)
    private num: cc.Label = null;

    // 已達成
    private _finished: boolean = false;

    //
    public tileType: TileType = TileType.None;

    //
    public tileNum: number = 0;

    /**
     * 清除
     */
    public clear(): void {
        this._finished = false;
        this.node.active = false;

        this.setColor();
    }

    /**
     * 設定顏色
     */
    private setColor(): void {
        let color = this._finished ? cc.Color.BLACK : cc.Color.WHITE;

        this.type.node.color = color;
        this.num.node.color = color;

        if (this._finished) {
            AssetMgr.inst().loadAsset(AudioSrc.Rule, cc.AudioClip, true).then(audio => SfxAudio.inst().play(audio));
        }
    }

    /**
     * 設定剩餘數量
     * @param num 
     */
    public setNum(num: number): void {
        this.num.string = `x${num.limit(0, Number.MAX_VALUE)}`;
        this.tileNum = num;

        if (num <= 0 && this._finished == false) {
            this._finished = true;
            this.setColor();
        }
    }

    /**
     * 初始化
     * @param type 棋種
     * @param num 數量
     */
    public async init(type: TileType, num: number): Promise<void> {
        this.clear();

        if (type != TileType.None) {
            // 數量
            this.setNum(num);

            // 棋種圖片
            let url = TextureSrc[TileType[type]];
            this.type.spriteFrame = await AssetMgr.inst().loadAsset(url, cc.SpriteFrame, true);

            // 開始
            num > 0 && (this.node.active = true);   

            this.tileType = type;
            this.tileNum = num;
        }
    }
}
