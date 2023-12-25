import { Singleton } from "../util/Singleton";
import { AssetLoader, BundleLoader, FolderLoader, SingleLoader } from "./AssetLoader";

/**
 * 資源數據
 */
interface Data {
    // 資源
    asset: cc.Asset;

    // 釋放時間
    time: number;

    // 不因閒置而釋放
    reserve: boolean
}

/**
 * 資源管理
 */
export class AssetMgr extends Singleton {
    // 已加載bundle
    private _bundles = new Map<string, cc.AssetManager.Bundle>();

    // 資源
    private _assets = new Map<string, Data>();

    // 當前s
    private get _now(): number { return Date.now() / 1000; };

    // 閒置s
    private static readonly IDLE = 5 * 60;

    // 到期時間
    private get _dateline(): number { return this._now + AssetMgr.IDLE; };

    // 加載器
    private _loaders: { single?: AssetLoader, bundle?: AssetLoader, folder?: AssetLoader } = {};

    /**
     * 
     */
    constructor() {
        super();

        this._loaders.single = new SingleLoader();
        this._loaders.bundle = new BundleLoader();
        this._loaders.folder = new FolderLoader();
    }

    /**
     * 銷毀
     */
    protected onDestroy(): void {
        this._loaders.single = null;
        this._loaders.bundle = null;
        this._loaders.folder = null;

        this._assets.forEach(data => data.asset.decRef());
        this._assets.clear();

        this._bundles.forEach(bundle => {
            bundle.releaseAll();
            cc.assetManager.removeBundle(bundle);
        });

        this._bundles.clear();
    }

    /**
     * 取得
     * @param url 
     */
    private get<T extends cc.Asset>(url: string): T {
        let data = this._assets.get(url);

        if (data) {
            data.time = this._dateline;
            return <T>data.asset;
        }

        return null;
    }

    /**
     * 新增
     * @param url 
     * @param asset 
     * @param reserve 不因閒置而釋放
     */
    private add(url: string, asset: cc.Asset, reserve: boolean): boolean {
        if (asset && this._assets.has(url) == false) {
            this._assets.set(url, { asset: asset, time: this._dateline, reserve: reserve });
            asset.addRef();

            return true;
        }

        return false;
    }

    /**
     * 釋放閒置資源
     */
    public clear(): void {
        let wait = [];

        this._assets.forEach((data, url) => {
            if (data.time < this._now && data.reserve == false) {
                wait.push(url);
                data.asset.decRef();
            }
        }, this);

        wait.forEach(url => this._assets.delete(url), this);
    }

    /**
     * 加載資源
     * @param url 
     * @param type 
     * @param reserve 不因閒置而釋放
     */
    public async loadAsset<T extends cc.Asset>(url: string, type: { prototype: T }, reserve: boolean): Promise<T> {
        if (this._assets.has(url) == false) {
            await this.loadBundle(url);
            this.add(url, await this._loaders.single.execute(url, type), reserve);
        }

        return this.get<T>(url);
    }

    /**
     * 加載資料夾
     * @param url 
     * @param type 
     * @param reserve 不因閒置而釋放
     */
    public async loadFolder<T extends cc.Asset>(url: string, type: { prototype: T }, reserve: boolean): Promise<void> {
        await this.loadBundle(url);

        let list = await this._loaders.folder.execute(url, type);
        list.forEach(src => this.add(src.url, src.asset, reserve), this);
    }

    /**
     * 加載bundle
     * @param url 
     */
    private async loadBundle(url: string): Promise<void> {
        if (this._bundles.has(url) == false) {
            let { path, bundle } = AssetLoader.parse(url);

            if (bundle) {
                this._bundles.set(url, await this._loaders.bundle.execute(bundle));
            }
        }
    }
}