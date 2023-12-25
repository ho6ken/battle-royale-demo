import { PLAYER_START } from "../../../define/GameDefine";
import { FOR_COL_ROW, GRID_COL, GRID_ROW, TilePos } from "../../../define/GridDefine";
import { NORM_TILE, TileGroup, TileType } from "../../../define/TileDefine";
import { TileSpawn } from "../../act/TileSpawn";
import { StageCtrl } from "./StageCtrl";
import { GridCmd } from "../GridCmd";
import { GridView } from "../view/GridView";
import { RandUtil } from "../../../comm/util/RandUtil";
import { GridModel } from "../model/GridModel";
import { GridCtrlBase } from "./GridCtrlBase";
import { SelectHandler } from "../../select/SelectHandler";
import { onEnable, onEvent } from "../../../comm/event/EventDecor";
import { EventSrc } from "../../../cfg/EventCfg";
import { TileTrans } from "../../act/TileTrans";

const { ccclass, property } = cc._decorator;

/**
 * 盤面控制
 */
@ccclass
@onEnable()
export class GridCtrl extends GridCtrlBase {
    // 單例
    private static _inst: GridCtrl = null;
    public static get inst(): GridCtrl { return this._inst; }

    // 數據
    protected _model: GridModel = null;

    // 操作播放中
    private _playing: boolean = false;

    /**
     * 
     */
    protected onLoad(): void {
        super.onLoad();
        GridCtrl._inst = this;
    }

    /**
     * 
     */
    protected onEnable(): void {
        this._model = new GridModel();
        this._view = this.getComponentInChildren(GridView);
    }

    /**
     * 播放顯示
     * @param cmd 
     */
    private async play(cmd: GridCmd | GridCmd[]): Promise<void> {
        if (await this._view.accept(cmd)) {
            this._model.print();
        }
    }

    /**
     * 開始回合
     */
    public async fight(): Promise<void> {
        this.genNorm();
        this.genPlayer();
        this.genBlocks();
        this.genEnemies();

        await this.expose();
    }

    /**
     * 生成一般盤面
     */
    private genNorm(): void {
        const min = NORM_TILE.min;
        const max = NORM_TILE.max;

        FOR_COL_ROW(pos => {
            let tile = this._model.getTile(pos);
            tile.type = this._model.getRandNorm();

            // 不連線盤面
            for (let i = min; i < max; i++) {
                if (this._model.isCrush(pos)) {
                    let type = tile.type;
                    tile.type = ++type >= max ? min : type;

                    continue;
                }

                return;
            }

            cc.warn("重複", tile.id, pos);
        });
    }

    /**
     * 生成玩家
     */
    private genPlayer(): void {
        let tile = this._model.getTile(PLAYER_START);
        tile.type = TileType.Hero;
        //tile.cd = 0;
    }

    /**
     * 生成障礙物
     */
    private genBlocks(): void {
        let data = StageCtrl.inst.data.block;
        let size = RandUtil.randInt(data.max + 1, data.min);
        let count = 0;

        do {
            let tile = this._model.getTile(this.randPos());

            if (tile.group == TileGroup.Norm) {
                tile.type = RandUtil.randTypes([TileType.Stone, TileType.Rock]);
                count++;
            }
        }
        while (count < size)
    }

    /**
     * 生成敵人
     */
    private genEnemies(): void {
        let data = StageCtrl.inst.data.enemy;
        let size = data.min;
        let count = 0;

        do {
            let tile = this._model.getTile(this.randPos());
            
            if (tile.group == TileGroup.Norm) {
                let idx = RandUtil.randWeights(data.weights);
                tile.type = <TileType>data.types[idx];        
                count++;
            }
        }
        while (count < size)
    }

    /**
     * 隨機位置
     */
    private randPos(): TilePos {
        return { x: RandUtil.randInt(GRID_COL), y: RandUtil.randInt(GRID_ROW) };
    }

    /**
     * 顯示盤面
     */
    private async expose(): Promise<void> {
        let cmd = new GridCmd();

        FOR_COL_ROW(pos => {
            let tile = this._model.getTile(pos);

            cmd.add(tile, new TileTrans(tile.type));
            cmd.add(tile, new TileSpawn());

            cmd.pass(0.01);
        });

        await this.play(cmd);
    }

    /**
     * 實作選擇
     * @param pos 
     */
    protected async select(pos: TilePos): Promise<void> {
        if (this._model.checkPos(pos) == false || this._playing) {
            return;
        }

        this._playing = true;

        let cmd = await SelectHandler.inst().execute(this._model, pos);
        cmd && await this.play(cmd);

        this._playing = false;
    }

    /**
     * 大招
     */
    @onEvent(EventSrc.Ultimate)
    private async ultimate(): Promise<void> {
        await this.play(await SelectHandler.inst().executeUlt(this._model));
    }

    /**
     * 變更棋種
     * @param pos 
     * @param type 
     */
    @onEvent(EventSrc.DebugType)
    private onDebugType(pos: TilePos, type: TileType): void {
        let tile = this._model.getTile(pos);

        if (tile) {
            tile.type = type;
            this._view.accept(new GridCmd().add(tile, new TileTrans(type)));

            this._model.print();
        }
    }

    /**
     * 清玩家冷卻
     * @param pos 
     * @param type 
     */
    @onEvent(EventSrc.DebugCd)
    private onDebugCd(): void {
        this._model.player.cd = 0;
    }
}
