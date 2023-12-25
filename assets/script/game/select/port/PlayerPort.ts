import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup } from "../../../define/TileDefine";
import { SelectParam } from "../SelectHandler";

/**
 * 玩家棋種接口
 */
export class PlayerPort extends WorkChain {
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
            if (elm && elm.group == TileGroup.Player) {
                elm.cooldown();
                cc.log("冷卻", elm.id, elm.cd);
            }
        });

        return true;
    }
}
