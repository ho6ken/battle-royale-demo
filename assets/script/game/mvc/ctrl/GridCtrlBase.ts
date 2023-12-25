import { GRID_H, GRID_W, SAME_POS, TilePos } from "../../../define/GridDefine";
import { TILE_H, TILE_W } from "../../../define/TileDefine";
import { SelectHandler } from "../../select/SelectHandler";
import { GridModel } from "../model/GridModel";
import { GridView } from "../view/GridView";

const { ccclass, property } = cc._decorator;

/**
 * 盤面控制
 */
@ccclass
export abstract class GridCtrlBase extends cc.Component {
    // 數據
    protected _model: GridModel = null;

    // 顯示
    protected _view: GridView = null;

    // 顯示視窗物件
    @property(cc.Node)
    private window: cc.Node = null;

    /**
     * 
     */
    protected onLoad(): void {
        if (this.window) {
            this.window.width = GRID_W;
            this.window.height = GRID_H;
        }
    }

    /**
     * 
     */
    protected onEnable(): void {
        this._model = new GridModel();
        this._view = this.getComponentInChildren(GridView);
    }

    /**
     * 
     */
    protected start(): void {
        let target = this._view.node;
        target.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        target.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    /**
     * 
     */
    protected onDestroy(): void {
        SelectHandler.destroy();

        this._model.clear();
        this._model = null;
    }

    /**
     * 
     * @param event 
     */
    private onTouchStart(event: cc.Event.EventTouch): void {
        this.select(this.convertPos(event));
    }

    /**
     * 
     * @param event 
     */
    private onTouchMove(event: cc.Event.EventTouch): void {
        let from = SelectHandler.inst().selected;
        let to = this.convertPos(event);

        if (from && SAME_POS(from, to) == false) {
            this.select(this.convertPos(event));
        }
    }

    /**
     * 座標轉換
     * @param src 
     */
    private convertPos(src: cc.Event.EventTouch): TilePos {
        let pos = this._view.node.convertToNodeSpaceAR(src.getLocation());
        return { x: Math.floor(pos.x / TILE_W), y: Math.floor(pos.y / TILE_H) };
    }

    /**
     * 實作選擇
     * @param pos 
     */
    protected abstract select(pos: TilePos): Promise<void>;
}
