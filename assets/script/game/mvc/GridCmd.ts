import { TileAct } from "../../define/TileDefine";
import { TileModel } from "./model/TileModel";

/**
 * 棋子表演
 */
export abstract class TilePlay {
    // 行動種類
    public abstract get type(): TileAct;

    // 開始時間
    public start: number = 0;
}

/**
 * 棋子命令
 */
export class TileCmd {
    // 棋子來源
    public base: TileModel = new TileModel(-1);

    // 行動隊列
    public seq: TilePlay[] = [];

    /**
     * 
     * @param base 棋子來源
     */
    constructor(base: TileModel) {
        Object.assign(this.base, base);
    }

    /**
     * 清空
     */
    public clear(): void {
        this.seq.forEach(elm => elm = null);
        this.seq = [];
        
        this.base = null;
    }

    /**
     * 新增行動
     * @param play 
     */
    public add(play: TilePlay): void {
        this.seq.push(play);
    }
}

/**
 * 棋盤命令
 */
export class GridCmd {
    // 各棋行為
    public deed = new Map<number, TileCmd>();

    // 命令觸發時間軸
    private _timeline: number = 0;

    // 不同命令間的顯示斷點
    public slack: number = 0;

    /**
     * 清除
     */
    public clear(): void {
        this.deed.forEach(elm => {
            elm.clear();
            elm = null;
        });

        this.deed.clear();
    }

    /**
     * 新增某棋表演
     * @param tile 
     * @param play 
     */
    public add(tile: TileModel, play: TilePlay): this {
        let id = tile.id;
        let cmd = this.deed.get(id) ?? new TileCmd(tile);
        this.deed.set(id, cmd);

        play.start = this._timeline;
        cmd.add(play);

        return this;
    }

    /**
     * 時間軸推進
     * @param sec
     * @summary 相同命令間的顯示斷點
     */
    public pass(sec: number): void {
        this._timeline += sec;
    }
}
