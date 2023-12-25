import { WorkChain } from "../../../comm/util/WorkChain";
import { FOUR_DIR } from "../../../define/GridDefine";
import { TileGroup } from "../../../define/TileDefine";
import { TileDie } from "../../act/TileDie";
import { TileHit } from "../../act/TileHit";
import { GridCmd } from "../../mvc/GridCmd";
import { TileModel } from "../../mvc/model/TileModel";
import { SelectParam } from "../SelectHandler";

/**
 * 玩家普攻
 * @summary 利用盤面一般棋子攻擊敵人
 */
export class NormAtk extends WorkChain {
    //
    private _param: SelectParam = null;

    //
    private _cmd: GridCmd = null;

    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        this._param = param;
        this._cmd = new GridCmd();

        // 四向攻擊
        param.atkers.forEach(atker => Object.values(FOUR_DIR).forEach(dir => this.attack(atker, dir)));

        if (this._cmd.deed.size > 0) {
            param.load.push(this._cmd);
        }

        return true;
    }

    /**
     * 進攻
     * @param atker 攻擊發起者
     * @param offset 攻擊位置偏移
     */
    private attack(atker: TileModel, offset: IVec2Like): void {
        let x = atker.pos.x + offset.x;
        let y = atker.pos.y + offset.y;
        let defer = this._param.model.getTile({ x: x, y: y });

        if (defer && defer.group == TileGroup.Enemy) {
            let damage = atker.atk - defer.def;
            damage = damage.limit(1, atker.atk);

            defer.decHp(damage);
            this._cmd.add(defer, new TileHit(damage));

            cc.log(`${atker.id}普攻${defer.id}, 傷害${damage}, 剩血${defer.currHp}`, atker.pos, atker.type, defer.pos, defer.type);
            
            this.dead(defer);
        }
    }

    /**
     * 死亡
     * @param defer 
     */
    private dead(defer: TileModel): void {
        if (defer.currHp <= 0) {
            this._cmd.add(defer, new TileDie());
            this._param.model.setTile(defer.pos, null);

            cc.log(`${defer.id}死亡`, defer.pos);
        }
    }
}
