import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup } from "../../../define/TileDefine";
import { SelectParam } from "../SelectHandler";
import { EnemyAtk } from "../battle/EnemyAtk";
import { EnemyWalk } from "../battle/EnemyWalk";

/**
 * 敵人棋種接口
 */
export class EnemyPort extends WorkChain {
    // 行動流程
    private _process: WorkChain = null;

    /**
     * 
     */
    constructor() {
        super();

        this._process = new EnemyWalk();
        this._process.push(new EnemyAtk());
    }

    /**
     * 清除
     * @param param 
     */
    private clear(param: SelectParam): void {
        param.changes = [];
        param.finished = false;
        param.atkers = [];
    }

    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        this.clear(param);

        // 將初複選對象加入作用域中
        param.model.enemies.forEach(elm => {
            elm && elm.group == TileGroup.Enemy && elm.cd <= 0 && param.atkers.push(elm);
        });

        if (param.atkers.length > 0) {
            await this._process.execute(param);

            // 開始冷卻
            param.atkers.forEach(tile => {
                tile.cooldown();
                cc.log("冷卻", tile.id, tile.cd);
            });
        }

        return true;
    }
}
