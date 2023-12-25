import { FALL_SPEED } from "../../define/GridDefine";
import { TILE_H, TILE_W, TileAct, TileGroup, TileType } from "../../define/TileDefine";
import { TileAtk } from "../act/TileAtk";
import { TileCd } from "../act/TileCd";
import { TileCrush } from "../act/TileCrush";
import { TileDie } from "../act/TileDie";
import { TileFall } from "../act/TileFall";
import { TileHit } from "../act/TileHit";
import { TileMove } from "../act/TileMove";
import { TileNext } from "../act/TileNext";
import { TileSelect } from "../act/TileSelect";
import { TileSkill } from "../act/TileSkill";
import { TileSlip } from "../act/TileSlip";
import { TileSpawn } from "../act/TileSpawn";
import { TileSwap } from "../act/TileSwap";
import { TileTrans } from "../act/TileTrans";
import { TileWait } from "../act/TileWait";
import { TilePlay } from "./GridCmd";
import { GridView } from "./view/GridView";
import { SfxView } from "./view/SfxView";
import { TileView } from "./view/TileView";

/**
 * 棋盤表演控制
 */
export class GridDirector {
    // 棋盤
    private _host: GridView = null;

    // 表演
    private _perform = new Map<TileAct, Function>();

    // 
    private _tween: cc.Tween = null;

    /**
     * 
     * @param host 棋盤
     */
    constructor(host: GridView) {
        this._host = host;

        this._perform.set(TileAct.Spawn, this.spawn);
        this._perform.set(TileAct.Fall, this.fall);
        this._perform.set(TileAct.Select, this.select);
        this._perform.set(TileAct.Swap, this.swap);
        this._perform.set(TileAct.Crush, this.crush);
        this._perform.set(TileAct.Trans, this.trans);
        this._perform.set(TileAct.Wait, this.wait);
        this._perform.set(TileAct.Move, this.move);
        this._perform.set(TileAct.Slip, this.slip);
        this._perform.set(TileAct.Hit, this.hit);
        this._perform.set(TileAct.Die, this.die);
        this._perform.set(TileAct.Next, this.next);
        this._perform.set(TileAct.Skill, this.skill);
        this._perform.set(TileAct.Atk, this.atk);
        this._perform.set(TileAct.Cd, this.cooldown);
    }

    /**
     * 執行
     * @param tween 
     * @param type
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    public execute(tween: cc.Tween, type: TileAct, act: TilePlay, tile: TileView): number {
        this._tween = tween;
        return this._perform.has(type) ? this._perform.get(type).call(this, act, tile) : 0;
    }

    /**
     * 生成
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private spawn(act: TileSpawn, tile: TileView): number {
        let time = act.skip ? 0 : 0.1;

        if (time <= 0) {
            tile.node.active = true;
            tile.node.scale = 1;
        }
        else {
            this._tween.call(() => {
                tile.node.scale = 0;
                tile.node.active = true;
            });
    
            this._tween.to(time, { scale: 1 });
        }

        return time;
    }

    /**
     * 落下
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private fall(act: TileFall, tile: TileView): number {
        let begin = tile.node.position;
        let end = cc.v3((act.target.x + 0.5) * TILE_W, (act.target.y + 0.5) * TILE_H, 0);
        let dist = end.sub(begin).mag();
        let time = dist * FALL_SPEED;

        this._tween.to(time, { position: end }, { easing: cc.easing.quadIn });

        return time;
    }

    /**
     * 選擇
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private select(act: TileSelect, tile: TileView): number {
        let time = 0.1;
        this._tween.call(() => tile.select(act.selected));
        this._tween.call(() => tile.node.zIndex = act.selected ? TileGroup.Max : tile.group );
        this._tween.to(time, { scale: act.selected ? 1.3 : 1 });

        return time;
    }

    /**
     * 互換
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private swap(act: TileSwap, tile: TileView): number {
        let time = 0.3;

        let x = (act.target.x + 0.5) * TILE_W;
        let y = (act.target.y + 0.5) * TILE_H;

        this._tween.call(() => {
            tile.node.zIndex = TileGroup.Max;
            tile.walk();
        });

        this._tween.to(time, { position: cc.v3(x, y, 0) });
        this._tween.call(() => tile.node.zIndex = tile.group);

        return time;
    }

    /**
     * 消除
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private crush(act: TileCrush, tile: TileView): number {
        let time = tile.group == TileGroup.Norm ? 0.8 : 0.2;

        this._tween.call(() => {
            tile.crushed();
            tile.node.scale = 1;
        });

        if (tile.group == TileGroup.Norm) {
            this._tween.delay(time); 
            this._tween.call(() => tile.clear());
        }
        else {
            this._tween.to(time, { scale: 0 });
        }
        
        this._tween.call(() => tile.die().then(() => this._host.recycle(tile)), this);

        return time;
    }

    /**
     * 變化
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private trans(act: TileTrans, tile: TileView): number {
        let time = act.skip ? 0 : 0.2;

        if (time <= 0) {
            tile.node.scale = 1;
            tile.setType(act.target);
        }
        else {
            this._tween.call(() => tile.node.scale = 1);
            this._tween.to(time, { scale: 0 });
            
            this._tween.call(() => {
                tile.node.scale = 1;
                tile.setType(act.target);
            });
        }

        return time;
    }

    /**
     * 等待
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private wait(act: TileWait, tile: TileView): number {
        this._tween.delay(act.time);
        return act.time;
    }

    /**
     * 位移
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private move(act: TileMove, tile: TileView): number {
        let time = act.skip ? 0 : (tile.group == TileGroup.Enemy ? 0.8 : 0.3);
        let x = (act.target.x + 0.5) * TILE_W;
        let y = (act.target.y + 0.5) * TILE_H;

        if (time <= 0) {
            tile.node.setPosition(x, y);
        }
        else {
            this._tween.call(() => {
                tile.node.zIndex = TileGroup.Max;
                tile.walk();
            });

            this._tween.to(time, { position: cc.v3(x, y, 0) }, { easing: cc.easing.quadIn });
            this._tween.call(() => tile.node.zIndex = tile.group);
        }

        return time;
    }

    /**
     * 側滑
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private slip(act: TileSlip, tile: TileView): number {
        let total = 0;
        let begin = tile.node.position;
        
        // 可任意方向側滑
        act.path.forEach(pos => {
            let end = cc.v3((pos.x + 0.5) * TILE_W, (pos.y + 0.5) * TILE_H, 0);
            let dist = end.sub(begin).mag();
            let time = dist * FALL_SPEED;

            this._tween.call(() => tile.node.zIndex = TileGroup.Max);
            this._tween.to(time, { position: end }, { easing: cc.easing.quadIn });
            this._tween.call(() => tile.node.zIndex = tile.group);

            // 本階段的終點為下階段的起點
            begin = end;
            total += time;
        });

        return total;
    }

    /**
     * 受擊
     * @param act 
     * @param tile  
     * @returns 表演時間
     */
    private hit(act: TileHit, tile: TileView): number {
        let time = tile.group == TileGroup.Enemy ? 0.8 : 0.2;
        let half = time / 2;

        this._tween.call(() => {
            tile.node.scale = 1;
            tile.hit();
        });

        this._tween.to(half, { scale: 0.8 });
        this._tween.to(half, { scale: 1 });
        
        this._tween.call(() => tile.decHp(act.damage));

        return time;
    }

    /**
     * 死亡
     * @param act 
     * @param tile 
     * @returns 表演時間
     */
    private die(act: TileDie, tile: TileView): number {
        let time = 0.2;

        this._tween.call(() => tile.node.scale = 1);
        this._tween.to(time, { scale: 0 });
        this._tween.call(() => tile.die().then(() => this._host.recycle(tile)), this);

        return time;
    }

    /**
     * 次回
     * @param act 
     * @param tile  
     * @returns 表演時間
     */
    private next(act: TileNext, tile: TileView): number {
        let time = 0.5;

        this._tween.call(() => tile.node.angle = 0);
        this._tween.to(time, { angle: 360 });
        this._tween.call(() =>  tile.nextRound(act.dec));

        return time;
    }

    /**
     * 技能
     * @param act 
     * @param tile  
     * @returns 表演時間
     */
    private skill(act: TileSkill, tile: TileView): number {
        let time = 0.1;
        let pos = tile.node.position;

        // 發招表演
        this._tween.call(() => {
            switch (act.eff) {
                case TileType.Cross  : SfxView.inst.showCross(pos); break;
                case TileType.Thunder: SfxView.inst.showThunder(pos); break;
                case TileType.Cyclone: SfxView.inst.showCyclone(pos); break;
            }
        });

        this._tween.delay(time);
        this._tween.call(() => this._host.recycle(tile), this);

        return time;
    }

    /**
     * 攻擊
     * @param act 
     * @param tile  
     * @returns 表演時間
     */
    private atk(act: TileAtk, tile: TileView): number {
        let time = 2.1;
        let pos = tile.node.position;

         // 發招表演
         this._tween.call(() => {
            tile.atk().then(() => {
                switch (tile.type) {
                    case TileType.Warrior: SfxView.inst.showWarriorAtk(pos); break;
                    case TileType.Archer : SfxView.inst.showArcherAtk(pos);  break;
                    case TileType.Armor  : SfxView.inst.showArmorAtk(pos);   break;
                }
            });
        });

        this._tween.delay(time);

        return time;
    }

    /**
     * 冷卻
     * @param act 
     * @param tile 
     */
    private cooldown(act: TileCd, tile: TileView): number {
        this._tween.call(() => tile.doCooldown());
        return 0;
    }
}
