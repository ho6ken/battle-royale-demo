import { EventSrc } from "../../../cfg/EventCfg";
import { SpineSrc } from "../../../cfg/SpinCfg";
import { TextureSrc } from "../../../cfg/TextureCfg";
import { AssetMgr } from "../../../comm/asset/AssetMgr";
import { Spine } from "../../../comm/cmpt/Spine";
import { EventMgr } from "../../../comm/event/EventMgr";
import { WaitUtil } from "../../../comm/util/WaitUtil";
import { TILE_H, TILE_W, TileGroup, TileType } from "../../../define/TileDefine";
import { TilePlay } from "../GridCmd";
import { TileModel } from "../model/TileModel";

const { ccclass, property } = cc._decorator;

/**
 * 棋子
 */
@ccclass
export class TileView extends cc.Component {
    // 數據
    private _model: TileModel = new TileModel(-1);

    // 編號
    public get id(): number { return this._model.id; }

    // 棋種
    public get type(): TileType { return this._model.type; }

    // 群組
    public get group(): TileGroup { return this._model.group; }

    // 造型
    @property(cc.Sprite)
    private avatar: cc.Sprite = null;

    // 資訊
    @property(cc.Label)
    private info: cc.Label = null;

    // 血條
    @property(cc.ProgressBar)
    private bar: cc.ProgressBar = null;

    // spine
    @property(Spine)
    private spine: Spine = null;

    // anim
    @property(cc.Animation)
    private anim: cc.Animation = null;

    // cooldown
    @property(cc.Label)
    private cooldown: cc.Label = null;
    public set cd(value: number) { this.cooldown.string = value?.toString() ?? "0"; }

    /**
     * 
     */
    protected onDestroy(): void {
        this._model = null; 
    }

    /**
     * 
     */
    public clear(): void {
        this.avatar.node.active = true;

        this.spine.stop();
        this.spine.scale(1);
        this.spine.node.active = false;
        
        this.anim.stop();
        this.anim.node.active = false;
    }

    /**
     * 初始化
     * @param model 
     */
    public async init(model: TileModel): Promise<void> {
        let name = model.id.toString();
        this.node.name = name;
        this.info.string = name;

        this.bar.node.active = false;

        // 複製原始數據
        Object.assign(this._model, model);

        // 進場位置
        this.node.x = TILE_W * (model.entry.x + 0.5);
        this.node.y = TILE_H * (model.entry.y + 0.5);

        this.spine && (this.spine.node.active = false);

        await this.setType(model.type);
    }

    /**
     * 變更棋類
     * @param type 
     */
    public async setType(type: TileType): Promise<void> {
        this._model.type = type;

        if (type != TileType.None) {
            let url = TextureSrc[TileType[type]];
            this.avatar.spriteFrame = await AssetMgr.inst().loadAsset(url, cc.SpriteFrame, true);

            // 調整顯示階層
            this.node.zIndex = this.group;

            // spine
            if (this.spine) {
                if (this.group == TileGroup.Norm || this.group == TileGroup.Player) {
                    let url = SpineSrc[TileType[type]];
                    this.spine.init(await AssetMgr.inst().loadAsset(url, sp.SkeletonData, true));
                }
            }

            this.cooldown.node.active = this.group == TileGroup.Player || this.group == TileGroup.Enemy;
            this.cd = this._model.cd;
        }

        await this.setBar();
    }

    /**
     * 顯示血條
     */
    private async setBar(): Promise<void> {
        let url = this.group == TileGroup.Player ? TextureSrc.PlayerHp : (this.group == TileGroup.Enemy ? TextureSrc.EnemyHp : null);

        if (url) {
            this.bar.barSprite.spriteFrame = await AssetMgr.inst().loadAsset(url, cc.SpriteFrame, true);
            this.refreshBar();

            this.bar.node.active = true;
        }
    }

    /**
     * 刷新血條
     */
    private refreshBar(): void {
        this.bar.progress = this._model.currHp / this._model.maxHp;
    }

    /**
     * 減血
     * @param value 
     */
    public decHp(value: number): void {
        this._model.decHp(value);
        this.refreshBar();

        this.refreshBlock();

        // 玩家扣血至0認定失敗
        if (this._model.group == TileGroup.Player && this._model.currHp <= 0) {
            EventMgr.inst().emit(EventSrc.Lose);
        }
    }

    /**
     * 刷新障礙物
     * @summary 障礙物會依剩餘血量變化顯示圖片
     */
    private async refreshBlock(): Promise<void> {
        if (this._model.group == TileGroup.Block) {
            let hp = this._model.currHp;
            let url = hp == 1 ? TextureSrc.Stone : (hp == 2 ? TextureSrc.Rock : null);
            url && (this.avatar.spriteFrame = await AssetMgr.inst().loadAsset(url, cc.SpriteFrame, true));
        }
    }

    /**
     * 進入次回
     */
    public nextRound(dec: boolean = true): void {
        this._model.nextRound(dec);
        this.cd = this._model.cd;
    }

    /**
     * 受擊表演
     */
    public async hit(): Promise<void> {
        let self = this;

        if (this.group == TileGroup.Enemy) {
            let animDyn = (dyn: boolean) => {
                self.avatar.node.active = !dyn;
                self.anim && (this.anim.node.active = dyn);
            }

            animDyn(true);
            this.anim?.play(TileType[this.type] + "Hit");

            await WaitUtil.waitMs(800);

            this.anim?.stop();
            animDyn(false);
        }
        else {
            let tween = cc.tween(this.avatar.node);
            tween.to(0.1, { color: cc.Color.RED });
            tween.to(0.1, { color: cc.Color.WHITE });
            tween.start();
        }
    }

    /**
     * 死亡
     */
    public async die(): Promise<void> {
        if (this.group == TileGroup.Enemy) {
            EventMgr.inst().emit(EventSrc.Crushed, this.type, 1);
        }

        // 充能
        this._model.energy > 0 && (EventMgr.inst().emit(EventSrc.Charge, this._model.energy));
    }

    /**
     * 被選
     * @param selected 
     */
    public select(selected: boolean): void {
        let self = this;

        let spineDyn = (dyn: boolean) => {
            self.avatar.node.active = !dyn;
            self.spine.node.active = dyn;
        }
        
        switch (this.group) {
            // 一般
            case TileGroup.Norm:
                spineDyn(true);
    
                if (selected) {
                    this.spine.playLoop("Idle");
                }
                else {
                    this.spine.stop();
                    spineDyn(false);
                }

                break;

            // 玩家
            case TileGroup.Player:
                spineDyn(true);

                if (selected) {
                    this.spine.playOnce("WinFreeGame").then(() => {
                        this.spine.playLoop("AnticipationLoop");
                    });
                }
                else {
                    this.spine.stop();
                    spineDyn(false);
                }

                break;
        }
    }

    /**
     * 攻擊
     */
    public async atk(): Promise<void> {
        let self = this;

        if (this.group == TileGroup.Enemy) {
            let animDyn = (dyn: boolean) => {
                self.avatar.node.active = !dyn;
                self.anim && (this.anim.node.active = dyn);
            }

            animDyn(true);
            this.anim?.play(TileType[this.type] + "Atk");

            await WaitUtil.waitMs(800);

            this.anim?.stop();
            animDyn(false);
        }
    }

    /**
     * 行走表演
     */
    public async walk(): Promise<void> {
        let self = this;

        if (this.group == TileGroup.Enemy) {
            let animDyn = (dyn: boolean) => {
                self.avatar.node.active = !dyn;
                self.anim && (this.anim.node.active = dyn);
            }

            animDyn(true);
            this.anim?.play(TileType[this.type] + "Walk");

            await WaitUtil.waitMs(800);

            this.anim?.stop();
            animDyn(false);
        }
    }

    /**
     * 消除
     */
    public async crushed(): Promise<void> {
        let self = this;

        let spineDyn = (dyn: boolean) => {
            self.avatar.node.active = !dyn;
            self.spine.node.active = dyn;
        }

        if (this.group == TileGroup.Norm) {
            spineDyn(true);

            await this.spine.playOnce("Win");

            this.spine.stop();
            spineDyn(false);
        } 
    }

    /**
     * 冷卻
     */
    public doCooldown(): void {
        this.cd = this._model.cooldown();
    }
}
