import { RandUtil } from "../../../comm/util/RandUtil";
import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup, TileType } from "../../../define/TileDefine";
import { TileDie } from "../../act/TileDie";
import { TileHit } from "../../act/TileHit";
import { GridCmd } from "../../mvc/GridCmd";
import { TileModel } from "../../mvc/model/TileModel";
import { SelectParam } from "../SelectHandler";

/**
 * 技能攻擊
 */
export class SkillAtk extends WorkChain {
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

        param.atkers.forEach(atker => {
            switch (atker.type) {
                case TileType.Cross  : this.cross(atker);   break;
                case TileType.Thunder: this.thunder(atker); break;
                case TileType.Cyclone: this.cyclone(atker); break;
            }
        });

        if (this._cmd.deed.size > 0) {
            param.load.push(this._cmd);
        }

        return true;
    }

    /**
     * 十字斬
     * @param atker 
     */
    private cross(atker: TileModel): void {
        for (let i = -3; i <= 3; i++) {
            this.attack(atker, { x: 0, y: i });
            this.attack(atker, { x: i, y: 0 });
        }
    }

    /**
     * 雷電招喚
     * @param atker 
     */
    private thunder(atker: TileModel): void {
        let ay = RandUtil.shuffle(this._param.model.enemies);
        let max = ay.length.limit(0, 3);
        
        // 亂數取3
        for (let i = 0; i < max; i++) {
            let defer = ay.shift();
            this.attack(atker, { x: defer.pos.x - atker.pos.x, y: defer.pos.y - atker.pos.y });
        }
    }

    /**
     * 旋風斬
     * @param atker 
     */
    private cyclone(atker: TileModel): void {
        for (let x = -2; x <= 2; x++) {
            for (let y = -2; y <= 2; y++) {
                this.attack(atker, { x: x, y: y });
            }
        }
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

        if (defer) {
            let damage = 0;

            switch (defer.group) {
                // 一般與敵人扣血是以攻防計算
                case TileGroup.Norm:
                case TileGroup.Enemy:
                    damage = atker.atk - defer.def;
                    damage = damage.limit(1, atker.atk);

                    break;

                // 障礙物扣血是以受擊數計算
                case TileGroup.Block:
                    damage = 1;
                    break;
            }

            // 防呆
            if (damage > 0 && defer.id >= 0) {
                defer.decHp(damage);
                this._cmd.add(defer, new TileHit(damage));

                cc.log(`${atker.id}特攻${defer.id}, 傷害${damage}, 剩血${defer.currHp}`, atker.pos, atker.type, defer.pos, defer.type);

                this.dead(defer);
            }
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
