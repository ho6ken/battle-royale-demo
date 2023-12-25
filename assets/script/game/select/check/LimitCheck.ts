import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup } from "../../../define/TileDefine";
import { TileSelect } from "../../act/TileSelect";
import { GridCmd } from "../../mvc/GridCmd";
import { CheckParam } from "../SelectHandler";

/**
 * 限制檢查
 */
export class LimitCheck extends WorkChain {
    // 檢查流程
    private _process: WorkChain = null;

    /**
     * 
     */
    constructor() {
        super();

        this._process = new LimitNorm();
        this._process.push(new LimitBlock());
        this._process.push(new LimitItem());
        this._process.push(new LimitSkill());
        this._process.push(new LimitEnemy());
        this._process.push(new LimitPlayer());
    }

    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        return await this._process.execute(param);
    }
}

/**
 * 一般限制
 */
class LimitNorm extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        // 初複選相同時當作取消
        if (param.from) {
            let id = param.to.tile.id;

            if (id == param.from.tile.id) {
                cc.log("取消", id);

                param.load.push(new GridCmd().add(param.from.tile, new TileSelect(false)));

                param.from = null;
                param.to = null;

                return false;
            }
        }

        return true;
    }
}


/**
 * 障礙物限制
 */
class LimitBlock extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        // 障礙物不可選
        if (param.to.tile.group == TileGroup.Block) {
            param.to = null;
            return false;
        }

        return true;
    }
}

/**
 * 物品限制
 */
class LimitItem extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        // 物品不能初選
        // 複選物品時的初選必須為玩家
        if (param.to.tile.group == TileGroup.Item) {
            if (param.from == null || param.from.tile.group != TileGroup.Player) {
                param.to = null;
                return false;
            }        
        }

        return true;
    }
}

/**
 * 技能限制
 */
class LimitSkill extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        return true;
    }
}

/**
 * 敵人限制
 */
class LimitEnemy extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        // 敵人不可選
        if (param.to.tile.group == TileGroup.Enemy) {
            param.to = null;
            return false;
        }

        return true;
    }
}

/**
 * 玩家限制
 */
class LimitPlayer extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        let tile = param.to.tile;

        // 玩家冷卻時間未結束
        if (tile.group == TileGroup.Player && tile.cd > 0) {
            return false;
        }

        // 玩家必須初選, 如複選則把玩家改成初選
        if (param.from) {
            if (tile.group == TileGroup.Player) {
                let cmd = new GridCmd();
                cmd.add(param.from.tile, new TileSelect(false));
                cmd.add(tile, new TileSelect(true));

                param.load.push(cmd);
                
                param.from = param.to;
                param.to = null;

                return false;
            }
        }

        return true;
    }
}


