import { ROLE_TABLE, RoleData } from "../../../define/GameDefine";
import { TileGroup, TileType } from "../../../define/TileDefine";
import { TileModelBase } from "./TileModelBase";

/**
 * 棋子
 */
export class TileModel extends TileModelBase {
    // 即將消除
    public crushed: boolean = false;

    // 禁止位移
    public hold: boolean = false;

    // 變化種類
    private _trans: TileType = TileType.None;
    public get trans(): TileType { return this._trans; }
    public set trans(value: TileType) { this.setTrans(value); }

    // 數值
    private get _data(): RoleData { return ROLE_TABLE[this._type]; }

    // 最大血量
    public maxHp: number = 0;

    // 當前血量
    public currHp: number = 0;

    // 已死
    public get dead(): boolean { return this.currHp <= 0; }

    // 攻擊力
    public get atk(): number { return this._data.atk ?? 0; }

    // 防禦力
    public get def(): number { return this._data.def ?? 0; }

    // 行動力
    public get dex(): number { return this._data.dex ?? 0; }

    // 能量
    public get energy(): number { return this._data.energy ?? 0; }

    // 冷卻時間
    public cd: number = 0;

    // 加入管理函式
    public manage: Function = null;

    /**
     * 清除
     */
    public clear(): void {
        this.crushed = false;
        this._trans = TileType.None;
    }

    /**
     * 設定種類
     * @param type 
     */
    protected setType(type: TileType): void {
        super.setType(type);
        
        this.crushed = false;
        this.hold = this.group == TileGroup.Block;
        
        this.fullHp();
        this.cooldown();

        // 加入管理
        this.manage && this.manage(this);
    }

    /**
     * 設定變化
     * @param type 
     */
    private setTrans(type: TileType): void {
        this._trans = type;
        this.crushed = false;
    }

    /**
     * 進入次回
     */
    public nextRound(dec: boolean = true): void {
        if (dec) {
            this.cd = (--this.cd).limit(0, this._data.cd ?? 0);
        }
        
        // TODO: 其他變動
    }

    /**
     * 滿血
     * @returns 剩餘血量
     */
    public fullHp(): number {
        this.maxHp = this._data.hp ?? 0;
        this.currHp = this.maxHp;

        return this.currHp;
    }

    /**
     * 加血
     * @param value 
     * @returns 剩餘血量
     */
    public addHp(value: number): number {
        this.currHp = (this.currHp + value).limit(0, this.maxHp);
        return this.currHp;
    }

    /**
     * 減血
     * @param value 
     * @returns 剩餘血量
     */
    public decHp(value: number): number {
        this.currHp = (this.currHp - value).limit(0, this.maxHp);
        return this.currHp;
    }

    /**
     * 開始冷卻
     * @returns 剩餘冷卻時間
     */
    public cooldown(): number {
        this.cd = this._data.cd ?? 0;
        return this.cd;
    }

    /**
     * 增加冷卻時間
     * @param value 
     * @returns 剩餘冷卻時間
     */
    public addCd(value: number = 1): number {
        this.cd = (this.cd + value).limit(0, this._data.cd ?? 0);
        return this.cd;
    }
}
