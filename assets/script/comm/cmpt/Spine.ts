import { SpineSrc } from "../../cfg/SpinCfg";
import { AssetMgr } from "../asset/AssetMgr";
import { WaitUtil } from "../util/WaitUtil";

const { ccclass, property, requireComponent, menu } = cc._decorator;

/**
 * 動畫事件
 */
type Event = (name: string) => void;

/**
 * spine控制
 */
@ccclass
@requireComponent(sp.Skeleton)
@menu("spine")
export class Spine extends cc.Component {
    // track
    public static readonly TRACK = 99;

    // spine
    private _spine: sp.Skeleton = null;
    public get spine(): sp.Skeleton { return this._spine ??= this.getComponent(sp.Skeleton); }

    /**
     * 
     */
    protected onLoad(): void {
        this._spine = this.getComponent(sp.Skeleton); 
    }

    /**
     * 初始化
     * @param data 骨骼資料
     */
    public async init(data: sp.SkeletonData | SpineSrc): Promise<void> {
        let src = data instanceof sp.SkeletonData ? data : await AssetMgr.inst().loadAsset(data, sp.SkeletonData, true);
        this.spine.skeletonData = src;
    }

    /**
     * 播放速率
     * @param scale 
     */
    public scale(scale: number): void {
        this.spine.timeScale = scale;
    }

    /**
     * 停止
     */
    public stop(): void {
        this.spine.clearTrack(Spine.TRACK);
        this.spine.setToSetupPose();

        this.resume();
    }

    /**
     * 暫停
     */
    public pause(): void {
        this.spine.paused = true;
    }

    /**
     * 恢復
     */
    public resume(): void {
        this.spine.paused = false;
    }

    /**
     * 監聽事件
     * @param entry 
     * @param action 
     */
    private listen(entry: sp.spine.TrackEntry, action: Event): void {
        if (entry && action) {
            this.spine.setTrackEventListener(entry, (entry, event) => action(event.data.name));
        }
    }

    /**
     * 單次播放
     * @param key 動畫名稱
     * @param event 動畫事件
     */
    public async playOnce(key: string = this.spine.defaultAnimation, event?: Event): Promise<void> {
        this.stop();

        let entry = this.spine.setAnimation(Spine.TRACK, key, false);
        this.listen(entry, event);

        return new Promise(async resolve => {
            await WaitUtil.waitSec(entry.animation.duration / this.spine.timeScale, this.spine);
            resolve();
        });
    }

    /**
     * 循環播放
     * @param key 動畫名稱
     * @param event 動畫事件
     */
    public playLoop(key: string = this.spine.defaultAnimation, event?: Event): void {
        this.stop();
        this.listen(this.spine.setAnimation(Spine.TRACK, key, true), event);
    }

    /**
     * 步進播放
     * @param keys 動畫名稱
     * @param event 動畫事件
     * @summary 依序播放動畫
     */
    public async playSteps(keys: string[], event?: Event): Promise<void> {
        this.stop();
        let time = 0;

        keys.forEach(key => {
            let entry = this.spine.setAnimation(Spine.TRACK, key, false);
            this.listen(entry, event);

            time += entry.animation.duration;
        }, this);

        if (time > 0) {
            return new Promise(async resolve => {
                await WaitUtil.waitSec(time, this.spine);
                resolve();
            });
        }
    }

    /**
     * 綁定骨骼
     * @param bone 骨骼名稱
     * @param node 綁定物件
     * @summary 將物件設定成該骨骼的子物件
     */
    public contain(bone: string, node: cc.Node): void {
        // @ts-ignore
        let nodes = this.spine.attachUtil.generateAttachedNodes(bone);

        if (nodes && nodes.length > 0) {
            node.parent = nodes[0];
        }
    }
}
