import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup } from "../../../define/TileDefine";
import { SelectParam } from "../SelectHandler";
import { SkillAtk } from "../battle/SkillAtk";

/**
 * 技能棋種接口
 */
export class SkillPort extends WorkChain {
    // 行動流程
    private _process: WorkChain = null;

    /**
     * 
     */
    constructor() {
        super();
        this._process = new SkillAtk();
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
        [param.first, param.second].forEach(elm => {
            // 只有初選是玩家時視作使用技能
            if (param.first.group == TileGroup.Player) {
                elm && elm.group == TileGroup.Skill && param.atkers.push(elm);
            }
        });

        if (param.atkers.length > 0) {
            await this._process.execute(param);
        }

        return true;
    }
}
