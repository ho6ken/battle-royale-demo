import { PrefabSrc } from "../../../cfg/PrefabCfg";
import { AssetMgr } from "../../../comm/asset/AssetMgr";
import { CmptPool } from "../../../comm/pool/CmptPool";
import { WaitUtil } from "../../../comm/util/WaitUtil";
import { GRID_H, GRID_W } from "../../../define/GridDefine";
import { TileView } from "./TileView";
import { GridCmd, TileCmd } from "../GridCmd";
import { GridDirector } from "../GridDirector";

const { ccclass, property } = cc._decorator;

/**
 * 棋盤
 */
@ccclass
export class GridView extends cc.Component {
    // 棋子
    private _tiles = new Map<number, TileView>();

    // 命令佇列
    private _cmd: GridCmd[] = [];

    // 表演
    private _director: GridDirector = null;

    /**
     * 
     */
    protected onLoad(): void {
        this.node.anchorX = 0;
        this.node.anchorY = 0;

        this.node.x = (-GRID_W / 2);
        this.node.y = (-GRID_H / 2);

        this.node.width = GRID_W;
        this.node.height = GRID_H;
    }

    /**
     * 
     */
    protected onEnable(): void {
        this._director = new GridDirector(this);
    }

    /**
     * 
     */
    protected onDestroy(): void {
        this._cmd.forEach(elm => elm.clear());
        this._cmd = [];

        this._tiles.clear();
    }

    /**
     * 取得棋子
     */
    private async fetch(): Promise<TileView> {
        let tile = await CmptPool.inst().fetch(TileView) ?? cc.instantiate(await AssetMgr.inst().loadAsset(PrefabSrc.Tile, cc.Prefab, true));
        tile.setParent(this.node);
        tile.active = false;

        return tile.getComponent(TileView);
    }

    /**
     * 回收棋子
     * @param tile 
     */
    public recycle(tile: TileView): void {
        if (this._tiles.delete(tile.id)) {
            CmptPool.inst().recycle(TileView, tile.node);
        }
    }

    /**
     * 接收盤面命令
     * @param cmd 
     */
    public async accept(cmd: GridCmd | GridCmd[]): Promise<boolean> {
        if (cmd == null || (cmd instanceof Array && cmd.length <= 0)) {
            return false;
        }

        this._cmd = this._cmd.concat(cmd);

        do {
            let cmd = this._cmd.shift();
            await this.process(cmd);
            
            // 讓各連鎖顯示間頓點一下
            cmd.slack && cmd.slack > 0 && await WaitUtil.waitMs(cmd.slack);
        }
        while (this._cmd.length > 0)

        return true;
    }

    /**
     * 處理盤面命令
     * @param cmd 
     */
    private async process(cmd: GridCmd): Promise<void> {
        if (cmd == null || cmd.deed == null || cmd.deed.size <= 0) {
            return;
        }

        let jobs = [];
        let values = Array.from(cmd.deed.values());
        let len = values.length;

        // 各棋行為
        for (let i = 0; i < len; i++) {
            let elm = values[i];
            let id = elm.base.id;
            let tile = this._tiles.get(id);

            // 新入場的棋子
            if (tile == null) {
                tile = await this.fetch();
                tile.init(elm.base);
                this._tiles.set(id, tile);
            }

            jobs.push(this.execute(elm));
        };

        // 各棋行動
        await Promise.all(jobs);

        cmd.clear();
        cmd = null;
    }

    /**
     * 執行棋子命令
     * @param cmd 
     */
    private async execute(cmd: TileCmd): Promise<void> {
        let tile = this._tiles.get(cmd.base.id);

        return new Promise(resolve => {
            let tween = cc.tween(tile.node);
            let timeline = 0;

            // 該棋所有行動
            for (let act of cmd.seq) {
                // 比時間軸更晚開始的行動, 則推進時間軸
                if (act.start > timeline) {
                    let space = act.start - timeline;
                    tween.delay(space);
                    timeline += space;
                }

                // 依表演時間推進時間軸
                timeline += this._director.execute(tween, act.type, act, tile);
            }

            // 開始表演
            tween.call(() => resolve());
            tween.start();
        });
    }
}
