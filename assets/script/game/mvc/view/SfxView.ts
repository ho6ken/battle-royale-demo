import { PrefabSrc } from "../../../cfg/PrefabCfg";
import { AssetMgr } from "../../../comm/asset/AssetMgr";
import { ReplayFx } from "../../../comm/cmpt/ReplayFx";
import { ObjPool } from "../../../comm/pool/ObjPool";
import { WaitUtil } from "../../../comm/util/WaitUtil";
import { GRID_H, GRID_W } from "../../../define/GridDefine";

const { ccclass, property } = cc._decorator;

/**
 * 特效
 */
@ccclass
export class SfxView extends cc.Component {
    // 單例
    private static _inst: SfxView = null;
    static get inst(): SfxView { return this._inst; }

    // 池
    private _pool = new ObjPool<PrefabSrc, cc.Node>();

    // 顯示區父物件
    @property(cc.Node)
    private host: cc.Node = null;

    /**
     * 
     */
    protected onLoad(): void {
        SfxView._inst = this; 

        // 範圍同grid view
        this.host.anchorX = 0;
        this.host.anchorY = 0;

        this.host.x = (-GRID_W / 2);
        this.host.y = (-GRID_H / 2);

        this.host.width = GRID_W;
        this.host.height = GRID_H;
    }

    /**
     * 播放特效
     * @param key PrefabSrc
     * @param pos 
     * @param time ms
     */
    private async playSfx(key: PrefabSrc, pos: cc.Vec3, time: number): Promise<void> {
        let obj = await this._pool.fetch(key);

        // 新創
        if (obj == null) {
            obj = cc.instantiate(await AssetMgr.inst().loadAsset(key, cc.Prefab, true));
        }

        let sfx = obj.getComponent(ReplayFx);

        obj.setParent(this.host);
        obj.active = false;
        obj.setPosition(pos);

        sfx.play();

        await WaitUtil.waitMs(time, sfx);

        // 回收
        this._pool.recycle(key, obj);
    }

    /**
     * 橫向消除特效
     * @param pos 
     * @summary Particle_12
     */
    public async showCrushH(pos: cc.Vec3): Promise<void> {
        await this.playSfx(PrefabSrc.CrushH, pos, 500);
    }

     /**
     * 直向消除特效
     * @param pos 
     * @summary Particle_13
     */
     public async showCrushV(pos: cc.Vec3): Promise<void> {
        await this.playSfx(PrefabSrc.CrushV, pos, 500);
    }

    /**
     * 十字斬特效
     * @param pos 
     * @summary Particle_14
     */
    public async showCross(pos: cc.Vec3): Promise<void> {
        await this.playSfx(PrefabSrc.Cross, pos, 500);
    }

    /**
     * 雷電召喚特效
     * @param pos 
     * @summary Particle_15
     */
    public async showThunder(pos: cc.Vec3): Promise<void> {
        await this.playSfx(PrefabSrc.Thunder, pos, 500);
    }

    /**
     * 旋風斬特效
     * @param pos 
     * @summary Particle_16
     */
    public async showCyclone(pos: cc.Vec3): Promise<void> {
        await this.playSfx(PrefabSrc.Cyclone, pos, 500);
    }

    /**
     * 近戰攻擊特效
     * @param pos 
     * @summary Particle_1
     */
    public async showWarriorAtk(pos: cc.Vec3): Promise<void> {
        await this.playSfx(PrefabSrc.WarriorAtk, pos, 500);
    }

    /**
     * 遠程攻擊特效
     * @param pos 
     * @summary Particle_2
     */
    public async showArcherAtk(pos: cc.Vec3): Promise<void> {
        await this.playSfx(PrefabSrc.ArcherAtk, pos, 500);
    }

    /**
     * 重甲攻擊特效
     * @param pos 
     * @summary Particle_3
     */
    public async showArmorAtk(pos: cc.Vec3): Promise<void> {
        await this.playSfx(PrefabSrc.ArmorAtk, pos, 500);
    }
}
