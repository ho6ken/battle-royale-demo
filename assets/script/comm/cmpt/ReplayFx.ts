const { ccclass, property, menu } = cc._decorator;

/**
 * 特效重播
 */
@ccclass
@menu("replay fx")
export class ReplayFx extends cc.Component {
    // 重整
    @property(cc.Boolean)
    private get refresh(): boolean { return false; }
    private set refresh(value: boolean) { this.search(); }

    // 3d粒子
    @property([cc.ParticleSystem3D])
    private p3d: cc.ParticleSystem3D[] = [];

    // 2d粒子
    @property([cc.ParticleSystem])
    private p2d: cc.ParticleSystem[] = [];

    // spines
    @property([sp.Skeleton])
    private spines: sp.Skeleton[] = [];

    // animations
    @property([cc.Animation])
    private anim: cc.Animation[] = [];

    /**
     * 清空
     */
    private clear(): void {
        this.p3d = [];
        this.p2d = [];
        this.spines = [];
        this.anim = [];
    }

    /**
     * 搜尋特效子物件
     * @summary 會略過隱藏物件
     */
    private search(): void {
        this.clear();

        // 通用搜尋
        let find = function<T extends cc.Component>(type: T): T[] {
            return this.getComponentsInChildren(type).filter(cmpt => cmpt.enabled);
        }.bind(this);

        // 可在各自搜尋時加入客製條件
        this.p3d = find(cc.ParticleSystem3D);
        this.p2d = find(cc.ParticleSystem);
        this.spines = find(sp.Skeleton);
        this.anim = find(cc.Animation);
    }

    /**
     * 播放
     * @summary this.node.active的active會變true
     */
    public play(): void {
        this.stop();

        this.p3d.forEach(item => item.play());
        this.p2d.forEach(item => item.resetSystem());
        this.anim.forEach(item => item.play());

        this.spines.forEach(item => {
            item.setAnimation(0, item.defaultAnimation, item.loop);
            item.node.active = true;
        });

        this.node.active = true;
    }

    /**
     * 停止
     * @summary this.node.active會變false
     */
    public stop(): void {
        this.node.active = false;

        //
        this.p3d.forEach(item => item.stop());
        this.p2d.forEach(item => item.stopSystem());
        this.spines.forEach(item => item.node.active = false);
        this.anim.forEach(item => item.stop());
    }
}
