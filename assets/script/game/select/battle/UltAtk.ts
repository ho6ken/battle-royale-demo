import { WorkChain } from "../../../comm/util/WorkChain";
import { ULT_DAMAGE } from "../../../define/GameDefine";
import { TileDie } from "../../act/TileDie";
import { TileHit } from "../../act/TileHit";
import { GridCmd } from "../../mvc/GridCmd";
import { SelectParam } from "../SelectHandler";

/**
 * 大招攻擊
 */
export class UltAtk extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        let cmd = new GridCmd();
        let count = 0;

        param.model.enemies.forEach(elm => {
            // 防呆
            if (elm.id < 0 || param.model.getTile(elm.pos).id != elm.id) {
                return;
            }

            let damage = (ULT_DAMAGE - elm.def).limit(1, ULT_DAMAGE);
            cmd.add(elm, new TileHit(damage));

            elm.decHp(damage);
            cc.log(`$大招${elm.id}, 傷害${damage}, 剩血${elm.currHp}`, elm.pos, elm.type);

            if (elm.decHp(damage) <= 0) {
                elm.currHp <= 0 && (cmd.add(elm, new TileDie()));
                param.model.setTile(elm.pos, null);

                cc.log(`${elm.id}死亡`, elm.pos);
                count++;
            }
        });

        if (cmd.deed.size > 0) {
            param.load.push(cmd);
        }

        return true;
    }
}
