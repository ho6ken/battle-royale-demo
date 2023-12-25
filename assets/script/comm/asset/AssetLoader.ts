/**
 * 資源加載
 */
export abstract class AssetLoader {
    /**
     * 解析url
     * @param url 路徑/?bundle=包名
     * @returns { 路徑, 包名 }
     */
    public static parse(url: string): { path: string, bundle?: string } {
        let slices = url.split("/?");

        if (slices.length > 1) {
            let pair = slices[1].split("=");
            return { path: slices[0], bundle: pair[1] };
        }

        return { path: slices[0] };
    }

    /**
     * 組合url
     * @param path 路徑
     * @param bundle 包名
     * @returns 路徑/?bundle=包名
     */
    public static combine(path: string, bundle?: string): string {
        return path + (bundle ? `/?bundle=${bundle}` : "");
    }

    /**
     * 執行
     * @param url 路徑/?bundle=包名
     * @param params 
     */
    public abstract execute<T extends cc.Asset>(url: string, ...params: any): Promise<any>;
}

/**
 * 單檔加載
 */
export class SingleLoader extends AssetLoader {
    /**
     * 執行
     * @param url 路徑/?bundle=包名
     * @param type 資源類型
     * @summary 非bundle則從resources載入
     */
    public execute<T extends cc.Asset>(url: string, type: { prototype: T }): Promise<T> {
        return new Promise((resolve, reject) => {
            let { path, bundle } = AssetLoader.parse(url);
            let loader = bundle ? cc.assetManager.getBundle(bundle) : cc.resources;

            loader.load(path, type, (err, asset) => err ? reject(err) : resolve(<T>asset));
        });
    }
}

/**
 * bundle加載
 */
export class BundleLoader extends AssetLoader {
    /**
     * 執行
     * @param bundle 包名
     */
    public execute(bundle: string): Promise<cc.AssetManager.Bundle> {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(bundle, (err, asset) => err ? reject(err) : resolve(asset));
        });
    }
}

/**
 * 資料夾加載
 */
export class FolderLoader extends AssetLoader {
    /**
     * 執行
     * @param url 路徑/?bundle=包名
     * @param type 資源類型
     * @returns { 路徑, 資源 }[]
     */
    public execute<T extends cc.Asset>(url: string, type: typeof cc.Asset): Promise<{ url: string, asset: T }[]> {
        return new Promise((resolve, reject) => {
            let { path, bundle } = AssetLoader.parse(url);
            let loader = bundle ? cc.assetManager.getBundle(bundle) : cc.resources;

            loader.loadDir(path, type, (err, assets) => {
                if (err) {
                    reject(err);
                }

                let info = loader.getDirWithPath(path, type);
                let res = [];

                assets.forEach((asset, idx) => {
                    res.push({ url: AssetLoader.combine(info[idx].path, bundle), asset: <T>asset });
                });

                resolve(res);
            });
        });
    }
}
