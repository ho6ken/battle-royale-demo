import { TilePos } from "../../../define/GridDefine";
import { TILE_GROUP_IS, TileGroup, TileType } from "../../../define/TileDefine";

/**
 * 棋子
 */
export class TileModelBase {
    // 計數器
    private static _counter: number = 0;
    public static get counter(): number { return this._counter++; }

    // 編號
    public id: number = -1;

    // 種類
    protected _type: TileType = TileType.None;
    public get type(): TileType { return this._type; }
    public set type(value: TileType) { this.setType(value); }

    // 群組
    public group: TileGroup = TileGroup.Norm;

    // 棋盤位置
    private _pos: TilePos = { x: -1, y: -1 };
    public get pos(): TilePos { return this._pos; }
    public set pos(value: TilePos) { this.setPos(value); }

    // 進場位置
    public entry: TilePos = { x: -1, y: -1 };

    /**
     * 
     * @param id 
     */
    constructor(id: number = TileModelBase.counter) {
        this.id = id;
    }

    /**
     * 設定種類
     * @param type 
     */
    protected setType(type: TileType): void {
        this._type = type;
        this.group = TILE_GROUP_IS(this._type);
    }

    /**
     * 設定位置
     * @param pos 
     */
    protected setPos(pos: TilePos): void {
        this._pos = pos;
        this.entry = pos;
    }

    /**
     * 
     */
    public toString(): string {
        let id = (Array(3).join(" ") + this.id).slice(-3);
        let type = (Array(3).join(" ") + this.type).slice(-3);

        return this.type != TileType.None ? `${id}(${type})` : "xxx(xxx)";
    }
}
